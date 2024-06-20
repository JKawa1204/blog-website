import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, verify, sign } from 'hono/jwt'
import { userrouter } from './routes/user'
import { blogrouter } from './routes/blogs'
import { cors } from 'hono/cors'


const app = new Hono<{
  Bindings:{
      DATABASE_URL: string;
      JWT_SECRET:string;
  }
  }>()

  app.use('/*',cors())

  app.route('/api/v1/user',userrouter)
  app.route('/api/v1/blogs',blogrouter)



export default app
