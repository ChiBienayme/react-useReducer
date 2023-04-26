import { useReducer, useRef, useState } from "react";

// import Updown from "./components/Updown"

//1. Init state: 0
const initState = {
  job: '',
  jobs: [],
}

//2. Actions
const SET_JOB = 'set_job'
const ADD_JOB = 'add_job'
const DELETE_JOB = 'delete_job'
const EDIT_JOB = 'edit_job'
const DELETE_ALL_JOBS = 'delete_all_jobs'

//payload: dữ liệu mang theo đi (tương ứng với dữ liệu user gõ vào input) 
const setJob = payload => {
  return {
      type: SET_JOB,
      payload
  }
}

const addJob = payload => {
  return {
      type: ADD_JOB,
      payload
  }
}

const deleteJob = payload => {
  return {
      type: DELETE_JOB,
      payload
  }
}

const editJob = payload => {
  return {
      type: EDIT_JOB,
      payload
  }
}

const deleteAllJobs = payload => {
  return {
      type: DELETE_ALL_JOBS,
      payload
  }
}

//3. Reducer
const reducer = (state, action) => {
  console.log('Action: ', action)
  console.log('Prev State: ', state)

  let newState 

  switch(action.type) {
    case SET_JOB:
      newState = {
        ...state,
        job: action.payload
      }
      break

    case ADD_JOB:
      newState = {
        ...state,
        jobs: [...state.jobs, action.payload]
      }
      break

    case DELETE_JOB: {
      const newJobs = [...state.jobs]
      newJobs.splice(action.payload, 1)
      newState = {
        ...state,
        jobs: newJobs
      }
    }
    break

    case EDIT_JOB: {
      const updatedJob = [...state.jobs]
      updatedJob[action.payload.index] = action.payload.value
      newState = {
        ...state,
        jobs: updatedJob
      }
    }
    break

    case DELETE_ALL_JOBS:
      newState = {
        ...state,
        jobs: []
      }
    break

    default: 
      throw new Error('Invalid action')
  }

  console.log('New State: ', newState)

  return newState
}

//4. Dispatch (kích hoạt 1 action)


function App() {
  
  const [state, dispatch] = useReducer(reducer, initState)

  const {job, jobs} = state

  const [editIndex, setEditIndex] = useState(null)
  const [editValue, setEditValue] = useState('')

  const inputRef = useRef()

  const handleSubmit = () => {
    dispatch(addJob(job))
    dispatch(setJob('')) //return empty input

    inputRef.current.focus() //focus again into input
  }

  const handleEdit = (index, value) => {
    dispatch(editJob({index, value}))
    setEditIndex(null)
    setEditValue('')
  }

  return (
    <div style={{ padding: 50 }}>

      <h1> Todo App </h1>

      <input 
          ref={inputRef}
          value={job}
          placeholder="Enter a task..." 
          onChange={e => {
              dispatch(setJob(e.target.value))
          }}
      />
      <button onClick={handleSubmit}>Add</button>
      
      <ul>
        {jobs.map((job, index) => (
          <li key={index}>
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  defaultValue={job}
                  onChange={(e) => {
                    setEditValue(e.target.value);
                  }}
                />

                <button 
                  onClick={() => handleEdit(index, editValue)}
                >
                  Done
                </button>
              </>
            ) : (
              <>
                {job}

                <button
                  onClick={() => {
                    dispatch(deleteJob(index));
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

      {jobs.length > 1 && (
        <button onClick={() => dispatch(deleteAllJobs())}> Clear </button>
      )}
    </div>
  )
}

export default App
