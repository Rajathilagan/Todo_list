import React, { useReducer, useState,useEffect } from 'react'
import './todo.css'
import TodoItem from '../TodoItem/TodoItem'

const updateData = {
  addTask: 'ADD_TASK',
  deletetask: 'DELETE_TASK',
  updateTask: 'UPDATE_TASK'
}

const initialState = JSON.parse(localStorage.getItem('todos'))

function reducer(state,action){
  switch (action.type){
    case updateData.addTask:
      return [...state,action.payload]
    case updateData.deletetask:
      return state.filter(item=>item.id!== action.payload)
    case updateData.updateTask:
        return state.map(item => item.id===action.payload ? {...item,isComplete:!item.isComplete}:item)  
    default:
      return state
  }
}

const Todo = () => {
  const [todos, dispatch] = useReducer(reducer, initialState);
  const [userInput,setUserInput] = useState('')

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos)); // Store updated todos in localStorage
  }, [todos]);

  const handleChangeInput = (event)=>{
      setUserInput(event.target.value)
  }
  
  const addTask = ()=>{
    dispatch({type:updateData.addTask,payload:{id:Date.now(),text:userInput,isComplete:false}})
    setUserInput('')
  }

  const onDeleteTask = (id) =>{
      dispatch({type:updateData.deletetask,payload:id})
  }

  const onUpdateTask = (id) =>{
    dispatch({type:updateData.updateTask,payload:id})
  }


  return (
    <div className='bg-container'>
      <h1 className='todo-heading'>To-Do List</h1>
      <div className='input-card'>
        <input type='text' value={userInput} className='add-task-input' placeholder='Add your task' onChange={handleChangeInput} />
        <button type="button" className='add-task-btn' onClick={addTask}>Add Task</button>
      </div>
      <p className='descrition'>Fill task details</p>
      <div className='todo-item-container'>
        <fieldset>
          <legend className='legend-heading'>List of Tasks</legend>
          <ul className='todo-list-container'>
            {todos.map(todo=>(
              <TodoItem key={todo.id} todoItem={todo} onDeleteTask ={onDeleteTask} onUpdateTask = {onUpdateTask} />
            ))}          
          </ul>          
        </fieldset>
      </div>
    </div>
  )
}

export default Todo
