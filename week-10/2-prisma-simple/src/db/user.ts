import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


/*
 * Should insert into the users table
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function createUser(username: string, password: string, name: string) {

    const obj = await prisma.user.create({
        data:{
            username,
            password,
            name
        },
        select:{
            username:true,
            password:true,
            name:true
        }
    })

    return {
        username:obj.username,
        password:obj.password,
        name:obj.name
    }
}

/*
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function getUser(userId: number) {
    const obj = await prisma.user.findUnique({
        where:{id:userId},
        select:{
            username:true,
            password:true,
            name:true
        }
    })

    return {
        username:obj?.username,
        name:obj?.name,
        password:obj?.password

    }
}
