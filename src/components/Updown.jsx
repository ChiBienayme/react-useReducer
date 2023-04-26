import { useReducer } from 'react'

//1. Init state: 0
//2. Actions: Up (state + 1) / Down (state - 1)
//3. Reducer
//4. Dispatch (kích hoạt 1 action)

// Init state
const initState = 0

// Actions
const UP_ACTION = 'up'
const DOWN_ACTION = 'down'

// Reducer
const reducer = (state, action) => {
  console.log('reducer running...')
  switch(action) {
    case UP_ACTION:
      return state + 1
    case DOWN_ACTION:
      return state - 1
    default:
      throw new Error('Invalid action')
  }

}

function Updown() {
    const [count, dispatch] = useReducer(reducer, initState)
    //useReducer lần đầu chạy không gọi reducer mà gán giá trị initState cho count
    
    return(
        <>
            <h1>{count}</h1>

            <button
            onClick={() => dispatch(DOWN_ACTION)}
            >
            Down
            </button>

            <button
            onClick={() => dispatch(UP_ACTION)}
            >
            Up
            </button>
        </>
    )
}
export default Updown