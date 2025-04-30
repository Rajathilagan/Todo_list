import React from 'react'
import './todoitem.css'

export default function TodoItem({todoItem,onDeleteTask,onUpdateTask}) {
    const {id,text,isComplete} = todoItem
    const labelClass = isComplete ? 'task-completed': 'task-pending'

    const onDelete = () =>{
        onDeleteTask(id)
    }

    const onUpdate = () =>{
        onUpdateTask(id)
    } 

  return (
    <li className='todo-list-card'>
        <label className={labelClass} onClick={onUpdate}>{text}</label>
        <button type='button' className='delete-btn' onClick={onDelete}>delete</button>
    </li>
  )
}
