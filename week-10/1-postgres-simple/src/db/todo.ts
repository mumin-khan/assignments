import { client } from "..";
/*
 * Function should insert a new todo for this user
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function createTodo(userId: number, title: string, description: string) {
    const query = `INSERT INTO todos(user_id,title,description,done) VALUES ($1,$2,$3.$4)`
    const user = await client.query(query,[userId,title,description]);
    return {
        title:user.rows[0].title,
        description:user.rows[0].description,
        done: user.rows[0].done,
        id:user.rows[0].id
    }
}
/*
 * mark done as true for this specific todo.
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function updateTodo(todoId: number) {
    const query = `UPDATE todos SET done = true WHERE id = $1 RETURNING *`
    const user = await client.query(query,[todoId]);
    const u = user.rows[0];
    return {
        title:u.title,
        description: u.description,
        done:u.done,
        id:u.id
    }
}

/*
 *  Get all the todos of a given user
 * Should return an array of todos
 * [{
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }]
 */
export async function getTodos(userId: number) {
    const query = `SELECT * from todos WHERE user_id = $1`
    const users = await client.query(query,[userId]);
    return users.rows.map((user)=>
    {
        return {
            title:user.title,
            description:user.description,
            done:user.done,
            id:user.id
        }
    })
}