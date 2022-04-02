import React from 'react'
import store from '../store'
import { bindActionCreators } from '../redux'
import { Add1, Del1 } from '../store/action-types'

function Counter() {
  const { dispatch } = store
  const [state, setState] = React.useState(store.getState().counter1)

  const boundActions = bindActionCreators(
    { add1: () => ({ type: Add1 }), del1: () => ({ type: Del1 }) },
    dispatch
  )

  React.useEffect(() => {
    return store.subscribe(() => {
      setState(store.getState().counter1)
    })
  }, [])

  return (
    <div>
      <h1>{state.count}</h1>
      <button onClick={boundActions.add1}>+</button>
      <button onClick={boundActions.del1}>-</button>
    </div>
  )
}

export default Counter
