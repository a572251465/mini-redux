import React from 'react'
import { useBoundDispatch, useSelector } from '../react-redux'
import actions from './action1'

function Counter() {
  const state = useSelector((state) => state.counter1)
  const boundActions = useBoundDispatch(actions)

  return (
    <div>
      <h1>{state.count}</h1>
      <button onClick={boundActions.addHandle}>+</button>
      <button onClick={boundActions.delHandle}>-</button>
    </div>
  )
}

export default Counter
