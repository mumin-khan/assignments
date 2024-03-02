import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {sign} from 'hono/jwt'
import { Bindings } from '.'
const userRouter = new Hono<{Bindings:Bindings}>()



userRouter.post('/signup',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      
      }).$extends(withAccelerate())
    const body = await c.req.json()

    if (body.username && body.email && body.password)
    {
        if( await prisma.user.findUnique({
            where:{
                username:body.username
            },
            select:{
                username:true,
            }
        }))
        {
            return c.json({ message: 'Username already exists' })
        }
        else {
           const user =  await prisma.user.create({
            data:{
                username:body.username,
                password: body.password,
                email:body.email
            },
            select:{
                username:true,
                password:true,
                email:true,
                id:true
            }
             
        })
        const token = await sign({userId:user.id}, 'secret')
        return c.json({"token":token})
        }
    }
    else{
       return  c.json({message:"Missing Information"})
    }

})

userRouter.post('/signin',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      
      }).$extends(withAccelerate())
    const body = await c.req.json()
    console.log(body)
    const user = await prisma.user.findUnique({
        where:{
            username:body.username
        },
        select:{
            username:true,
            password:true,
            id:true
        }
    })
    if( user && user.password === body.password)
    {
        const token = await sign({userId:user.id}, c.env.SECRET )
        return c.json({"token":token})
    }
    else {
        return c.json({message:"Invalid Credentials"})
    }

})
export default userRouter