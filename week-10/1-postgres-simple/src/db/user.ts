import { client } from "..";

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
    const query = `INSERT INTO users (username,password,name) VALUES ($1,$2,$3)`
    const user = await client.query(query,[username,password,name]);
    console.log(user)
    return {
        username,
        password,
        name
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
    const query = `SELECT * from users WHERE id = $1 RETURNING *`
    const user = await client.query(query,[userId]);
    console.log(user)
    return {
        username:user.rows[0].username,
        password:user.rows[0].password,
        name:user.rows[0].name
}
}
