import { Add, Del } from '../action-types'

function reducer(state = { count: 0 }, action) {
  switch (action.type) {
    case Add:
      return { count: state.count + 1 }
    case Del:
      return { count: state.count - 1 }
    default:
      return state
  }
}

export default reducer
