import { Add1, Del1 } from '../action-types'

function reducer(state = { count: 0 }, action) {
  switch (action.type) {
    case Add1:
      return { count: state.count + 2 }
    case Del1:
      return { count: state.count - 2 }
    default:
      return state
  }
}

export default reducer
