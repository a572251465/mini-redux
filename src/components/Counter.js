import React from 'react'
import store from '../store'
import { addHandle, delHandle } from './action'
import { bindActionCreators } from '../redux'

function Counter() {
  const { dispatch } = store
  const [state, setState] = React.useState(store.getState())

  const boundActions = bindActionCreators(
    { add: addHandle, del: delHandle },
    dispatch
  )

  React.useEffect(() => {
    store.subscribe(() => {
      setState(store.getState())
    })
  }, [])

  return (
    <div>
      <h1>{state.count}</h1>
      <button onClick={boundActions.add}>+</button>
      <button onClick={boundActions.del}>-</button>
    </div>
  )
}

export default Counter
