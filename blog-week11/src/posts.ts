import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { timing } from 'hono/timing'

const postRouter = new Hono()

const prisma = new PrismaClient({
  datasourceUrl: "prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiOTNhYmQwNTUtMmI1Ny00ODAwLTg5ZTQtOGZjNzRjNjZiZGM4IiwidGVuYW50X2lkIjoiZTYwZDMxMjYzOTI0Yzk2MzI5NjIxMTA1ZTg0NjhlMTYxNmMxMzgzMjUyMjFmMTNlY2E4YjNlYjgyOWI5MjBjMyIsImludGVybmFsX3NlY3JldCI6ImJiYmJjMTMyLWExOWItNDlkMi04NjRiLTJkNDAxNjkwMDM5MyJ9.hhmL5tjJ2QSfRfeQoszXN3WZ483l3QtFwikknzurYRE"

}).$extends(withAccelerate())
postRouter.get('/test',async (c)=>{
    return c.json("lop")
})
postRouter.post('/tag',async(c)=>{
    const body = await c.req.json()
    if(body.name)
    {
        if( await prisma.tag.findUnique({
            where:{
                name:body.name
            },
            select:{
                name:true,
            }
        }))
        {
            return c.json({ message: 'Tag already exists' })
        }
        else {
           const tag =  await prisma.tag.create({
            data:{
                name:body.name,
            },
            select:{
                name:true,
            }
             
        })
        return c.json(tag)
        }
    }
    else{
        c.json({message:"Missing Information"})
    }
    }
)
postRouter.post('/create',async (c:any)=>{
    const body = await c.req.json()

    const userId = c.req.userId
    console.log(body)
    if (body.title && body.body && body.tags.length)
    {

        const tags = body.tags
        const post  =  await prisma.blog.create({
            data:{
                title:body.title,
                body: body.body,
                tags:{
                    connectOrCreate: tags.map( (name:string)=> {
                        return {where: {
                          name
                        },
                        create: {
                          name
                        },
                      }
                    }
                    )
                },
                userId
            },
            select:{
                title:true,
                body:true,
                tags:true
            }
             
        })
        return c.json(post)
    }

    return c.json({message:"Missing Information"})

})
postRouter.get('/',async(c)=>{
   const posts =  await prisma.blog.findMany({
        include: { tags: true }})

    return c.json(posts)
})
postRouter.get('/:id',async(c)=>{
    const postId = c.req.param('id')
   const posts =  await prisma.blog.findUnique({
        where:{id:parseInt(postId)},
        include: { tags: true }})

    return c.json(posts)
})

postRouter.delete('/:id',async(c)=>{
    const postId = c.req.param('id')
   const deletedPost = await prisma.blog.delete({
        where:{id:parseInt(postId)}
   })
    return c.json(deletedPost)
})

postRouter.put('/:id',async (c)=>{
    const body = await c.req.json()
    const postId = c.req.param('id')

    if (body.title || body.body || body.tags )
    {
        let updateData
        :{
            title?:string,
            body?:string,
            tags?:{}

        } 
         = {}
        if (body.title)
        {
            updateData["title"] = body.title
        }
        if (body.body)
        {
            updateData["body"] = body.body
        }
        if (body.tags)
        {
            updateData["tags"] = {
                set:[],
                connectOrCreate: body.tags.map( (name:string)=> {
                    return {where: {
                      name
                    },
                    create: {
                      name
                    },
                  }
                
        }
                )
    }
}

    console.log(updateData)
        const updatedPost = await prisma.blog.update({
            where: { id:parseInt(postId) },
            data: updateData,
            select:{
                title:true,
                body:true,
                tags:true
            }
          })
          return c.json(updatedPost)

        }
    return c.json({message:"Missing Information"})
    })    
export default postRouter
