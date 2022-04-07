import React from 'react'
import actions from './action'
import { connect } from '../react-redux'

class Counter extends React.Component {
  constructor(props) {
    super(props)
    this.props = props
  }
  render() {
    const { count, add, del } = this.props

    return (
      <div>
        <h1>{count}</h1>
        <button onClick={() => add()}>+</button>
        <button onClick={() => del()}>-</button>
      </div>
    )
  }
}

const stateToPropsHandle = (state) => state.counter
export default connect(stateToPropsHandle, { add: actions.addHandle, del: actions.delHandle })(
  Counter
)
