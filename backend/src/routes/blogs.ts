import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, verify, sign } from 'hono/jwt'
import { CreateBlogInput,UpdateBlogInput } from '@jkawa/common'

export const blogrouter = new Hono<{
  Bindings:{
      DATABASE_URL: string;
      JWT_SECRET:string;
  },
  Variables:{
    userId:string,
  }

  }>()

  blogrouter.use('/*',async (c,next)=>{
    const authHeader = c.req.header("authorization") || "";
    const user = await verify(authHeader,c.env.JWT_SECRET);

    if(user)
        {
            //@ts-ignore
            c.set("userId",user.id)
            await next();
        }
        else{
            return c.json({
                message: "Kindly log in again."
            })
        }
  });

blogrouter.post('/',async (c) =>{
    const body = await c.req.json();
    const authorID = c.get("userId")
    const {success} = CreateBlogInput.safeParse(body);
    if (!success)
        {
            c.status(403);
            return c.text("Invalid Inputs")
        }


    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
    
  
        const blog = await prisma.blogs.create({
            data:{
                title: body.title,
                content:body.content,
                authorID:Number(authorID)
            }       
})

return c.json({
    id:blog.id
})

})

blogrouter.put('/',async (c) => {
    const body = await c.req.json();
    const { success } = UpdateBlogInput.safeParse(body);
    if (!success)
        {
            c.status(403);
            return c.text("Invalid Inputs or password smaller than 6 letters.")
        }
   
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
    
  
        const blog = await prisma.blogs.update({
            where:{
                id:body.id
            },
            data:{
                title: body.title,
                content:body.content,
            }       
        } )

        return c.json({
            id:blog.id
        })

})

blogrouter.get('/bulk', async (c)=>{

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

      const blogs = await prisma.blogs.findMany({
        select:{
            title:true,
            content:true,
            id:true,
            author:{
                select:{
                    name:true
                }
            }
        }
      });

      return c.json({
        blogs
      })

})

blogrouter.get(`/:id`,async (c)=>{

    const id = await c.req.param("id");

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
    
  try{
    const blog = await prisma.blogs.findFirst({
        where:{
            id: Number(id)
        },
        select:{
            id:true,
            title:true,
            content:true,
            author:{
                select:{
                    name:true
                }
            }
        }  
    } )

    return c.json({
        blog
    })
  }
  catch(e)
  {
    c.status(411);
    return c.json({
        message:"Error"
    })
  }
      

})


