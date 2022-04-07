import React from 'react'
import { bindActionCreators } from '../redux'
import ReactReduxContext from './ReactReduxContext'

function Connect(mapStateToProps, mapDispatchToProps) {
  return function (OldComponent) {
    return class extends React.Component {
      static contextType = ReactReduxContext
      constructor(props, context) {
        super(props)

        const { store } = context
        const { getState, subscribe, dispatch } = store
        this.state = mapStateToProps(getState())
        this.unsubscribe = subscribe(() => {
          this.setState(mapStateToProps(getState()))
        })
        let dispatchProps

        if (typeof mapDispatchToProps === 'function') {
          dispatchProps = mapDispatchToProps(dispatch)
        } else if (typeof mapDispatchToProps === 'object') {
          dispatchProps = bindActionCreators(mapDispatchToProps, dispatch)
        } else {
          dispatchProps = { dispatch }
        }
        this.dispatchProps = dispatchProps
      }

      componentWillUnmount() {
        this.unsubscribe()
      }

      render() {
        return (
          <OldComponent
            {...this.props}
            {...this.state}
            {...this.dispatchProps}
          />
        )
      }
    }
  }
}
export default Connect
