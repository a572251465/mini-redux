import { useSelector, useBoundDispatch } from '../react-redux'
import { Add, Del } from '../store/actions-type'
const actions = {
  [Add]: () => ({ type: Add }),
  [Del]: () => ({ type: Del }),
  thunk: () => {
    return function (dispatch, getState) {
      setTimeout(() => {
        dispatch({ type: Add })
      }, 1000)
    }
  }
}

function Counter() {
  const state = useSelector((state) => state.counter)
  const dispatch = useBoundDispatch(actions)

  return (
    <div>
      <h1>{state.count}</h1>
      <button onClick={dispatch.add}>+</button>
      <button onClick={dispatch.del}>-</button>
      <button onClick={dispatch.thunk}>异步+</button>
    </div>
  )
}

export default Counter
