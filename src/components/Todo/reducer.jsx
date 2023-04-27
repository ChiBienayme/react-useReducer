import {
    SET_TASK,
    ADD_TASK,
    DEL_TASK,
    EDIT_TASK,
    CLEAR_LIST
}
from './constants'

//1. Init state: 0
export const initState = {
    task: '',
    todoList: []
  }
  
  
  //3. Reducer (switch cases)
const reducer = (state, action) => {
  
    switch (action.type) {
      case SET_TASK:
        return {
            ...state, 
            task: action.payload
        }
  
      case ADD_TASK:
        return {
          ...state,
          todoList: [...state.todoList, action.payload]
        }
  
      case DEL_TASK: {
        const newTodoList = [...state.todoList]
        newTodoList.splice(action.payload, 1)
        return {
          ...state,
          todoList: newTodoList
        }
      }
  
      case EDIT_TASK: {
        const updatedTask = [...state.todoList]
        updatedTask[action.payload.index] = action.payload.value
        
        return {
          ...state,
          todoList: updatedTask
        }
      }
  
      case CLEAR_LIST:
        return {
          ...state,
          todoList: []
        }
  
      default:
        throw new Error ("Invalid action type")
    }
  
}

export default reducer