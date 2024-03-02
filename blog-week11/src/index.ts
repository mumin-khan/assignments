import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import userRouter from './users'
import postRouter from './posts'
import { auth } from './middleware'
import { showRoutes } from 'hono/dev'

export type Bindings = {

  SECRET: string
}
const app = new Hono<{Bindings: Bindings}>()
const prisma = new PrismaClient({
  datasourceUrl: "prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiOTNhYmQwNTUtMmI1Ny00ODAwLTg5ZTQtOGZjNzRjNjZiZGM4IiwidGVuYW50X2lkIjoiZTYwZDMxMjYzOTI0Yzk2MzI5NjIxMTA1ZTg0NjhlMTYxNmMxMzgzMjUyMjFmMTNlY2E4YjNlYjgyOWI5MjBjMyIsImludGVybmFsX3NlY3JldCI6ImJiYmJjMTMyLWExOWItNDlkMi04NjRiLTJkNDAxNjkwMDM5MyJ9.hhmL5tjJ2QSfRfeQoszXN3WZ483l3QtFwikknzurYRE",

}).$extends(withAccelerate())

app.get('/', async(c) => {
  try{
    const users = await prisma.user.findUnique({
      where:{
          username:'abc'
      },
      select:{
          username:true,
      }
  })
    console.log(users)

  }
  catch(e)
  {
    console.log(e)
  }

  return c.text('Hello Hono!')
})
app.use('/posts/*',auth)
app.route('/users', userRouter)
app.route('/posts',postRouter)
showRoutes(app)

export default app
