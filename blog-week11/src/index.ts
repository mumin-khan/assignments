import { Hono } from 'hono'
import userRouter from './users'
import postRouter from './posts'
import { auth } from './middleware'
import { showRoutes } from 'hono/dev'

export type Bindings = {
  DATABASE_URL: string
  SECRET: string
}
const app = new Hono<{Bindings: Bindings}>()

app.get('/', async(c) => {
  
  return c.text('Hello Hono!')
})
app.use('/posts/*',auth)
app.route('/users', userRouter)
app.route('/posts',postRouter)
showRoutes(app)

export default app
