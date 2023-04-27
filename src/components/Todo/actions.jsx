import {
    SET_TASK,
    ADD_TASK,
    DEL_TASK,
    EDIT_TASK,
    CLEAR_LIST
}
from './constants'

// convert actions to functions
export const setTask = payload => {
    return {
      type: SET_TASK,
      payload
    }
  }

 export const addTask = payload => {
    return {
      type: ADD_TASK,
      payload
    }
  }

 export const delTask = payload => {
    return {
      type: DEL_TASK,
      payload
    }
  }

 export const editTask = payload => {
    return {
      type: EDIT_TASK,
      payload
    }
  }
  
 export const clearList = payload => {
    return {
      type: CLEAR_LIST,
      payload
    }
  }