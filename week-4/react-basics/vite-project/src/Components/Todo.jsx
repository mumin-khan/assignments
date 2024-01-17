// import React from 'react'
import PropTypes from 'prop-types';

const Todo = ({todos,setTodos}) => {
    const handleDoneTodo = (index)=>
    {
        const oldTodos = todos.filter((todo,oldIndex)=>
        {
            return oldIndex !=index
        })

        const todo = todos[index]
        todo.status = true

        setTodos([...oldTodos,todo])
    }
  return (
    <>
    {todos.map((todo,index)=>
    {
        return <div key={index}>
            <p>{todo.title}</p>
            <p>{todo.description}</p>
            {!todo?.status ? <button onClick={()=>handleDoneTodo(index)}>Mark as done</button>
            :<p>Done!</p>
    }
        </div>
    })}
    </>
  )
}
Todo.propTypes =
{
    todos:PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string.isRequired,
          description: PropTypes.string.isRequired,
          status:PropTypes.bool
        })
      ).isRequired,

    setTodos:PropTypes.func.isRequired
}
export default Todo