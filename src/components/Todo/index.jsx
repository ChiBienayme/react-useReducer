import { useReducer, useRef, useState } from "react";

import reducer, { initState } from './reducer'
import logger from  './logger'

import {
  setTask,
  addTask,
  delTask,
  editTask,
  clearList
} from './actions'

//4. Dispatch (kích hoạt 1 action)

function TodoApp() {
  const [state, dispatch] = useReducer(logger(reducer), initState)
  const {task, todoList} = state

  const [editIndex, setEditIndex] = useState(null)
  const [editValue, setEditValue] = useState('')

  const inputRef = useRef()

  const handleSubmit = () => {
    if(task !== '') { 
      dispatch(addTask(task))
      dispatch(setTask(''))
  
      inputRef.current.focus()
    }
  }
  
  const handleEdit = (index, value) => {
    dispatch(editTask({index, value}))
    setEditIndex(null)
    setEditValue('')
  }
  
  
  return (
    <div style={{ padding: 50 }}>

      <h1> Todo App </h1>

      <input 
          ref={inputRef}
          value={task}
          placeholder="Enter a task..." 
          onChange={e => {
            dispatch(setTask(e.target.value))
          }}
          onKeyUp={e => e.code === "Enter" && handleSubmit()}
      />

      <button onClick={handleSubmit}> Add </button>
      
      <ul>
        {todoList.map((task, index) => (
          <li key={index}>
            {editIndex === index ? (
              <>
                <input 
                  type="text"
                  defaultValue={task}
                  onChange={e => {
                    setEditValue(e.target.value)
                  }} 
                />

                <button 
                  onClick={() => handleEdit(index, editValue)}
                >
                  Save
                </button>

                <button 
                  onClick={() => handleEdit(index, task)}
                >
                  Cancel
                </button>

              </>
            ) : (
              <>
                {task}

                <button onClick={() => {
                    dispatch(delTask(index))
                  }}
                >
                  X
                </button>

                <button 
                  onClick={() => setEditIndex(index)}
                > 
                  Edit 
                </button>

              </>
            )}
          </li>
        ))}
         
      </ul>

        {todoList.length >= 1 && (
          <button 
            onClick={() => dispatch(clearList())}
          >
            Clear all
          </button>
        )}
      
    </div>
  )
}

export default TodoApp
