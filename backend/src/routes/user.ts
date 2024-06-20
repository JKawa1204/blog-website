import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, verify, sign } from 'hono/jwt'
import { SigninInput, SignupInput } from '@jkawa/common'


export const userrouter = new Hono<{
  Bindings:{
      DATABASE_URL: string;
      JWT_SECRET:string;
  }
  }>()


userrouter.post('/signup', async (c) =>  {

    const body = await c.req.json();
    const { success } = SignupInput.safeParse(body);
    if (!success)
        {
            c.status(403);
            return c.text("Invalid Inputs or password smaller than 6 letters.")
        }
   
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    try {
      const user = await prisma.user.create({
        data:{
          username: body.username,
          password: body.password,
          name: body.name
  
        }
      })
  
      const jwt = await sign({
        id : user.id
        },c.env.JWT_SECRET)
  
      return c.text(jwt)
  
    }
  
  catch (e)
  {
    console.log(e);
    c.status(403);
    return c.text("Invalid")
  }
  
  })
  
  userrouter.post('/signin', async (c) =>  {
  
    const body = await c.req.json();
    const { success } = SigninInput.safeParse(body)
    if (!success)
        {
            c.status(403);
            return c.text("Invalid Inputs or password smaller than 6 letters.")
        }
   
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
  try {
    const user = await prisma.user.findFirst({
      where:{
        username: body.username,
        password: body.password
      }
    })
  
    if(!user)
      {
        c.status(403);
        return c.text("Invalid User")
      }
  
    const jwt = await sign({
      id : user.id
    },c.env.JWT_SECRET)
  
    return c.text(jwt)
  
  }
  catch (e)
  {
    console.log(e);
    c.status(403);
    return c.text("Invalid")
  }
  
  })


export default userrouter;