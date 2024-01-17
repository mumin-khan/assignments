import { useState } from "react"
import Todo from "./Components/Todo"


function App() {

  const [title,setTitle]=useState('')
  const [description,setDescription]=useState('')
  const [todos,setTodos]=useState([])
  const handleAddTodo = ()=>
  {
    const todo = {
      title,
      description
    }
    setTodos([...todos,todo])
  }
  return (
    <>
      Title: <input value={title} onChange={(event)=> setTitle(event.target.value)} name="title"></input>
      <br></br>
      Description: <input value={description} onChange={(event)=>{setDescription(event.target.value)}} name ="description"></input>
      <br></br>
      <button onClick={handleAddTodo}>Add Todo</button>

      <Todo todos={todos} setTodos={setTodos}/>
    </>
  )
}

export default App
