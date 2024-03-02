import { verify } from "hono/jwt"

export const auth = async (c:any, next:any) => {

    const authHeader = c.req.header('Authorization')
    if (authHeader.startsWith('Bearer '))
    {
        const token = authHeader.split(' ')[1]

        try {
            const decodedPayload = await verify(token, 'secret')
            console.log(decodedPayload)
            c.req.userId = decodedPayload.userId
            console.log(c.req.userId)
            await next()

        }
        catch{
            return c.json("No Permission")
        }
    }
}