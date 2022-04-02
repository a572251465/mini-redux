function combineReducers(reducers) {
  return function (oldState = {}, action) {
    const newState = {}

    for (const key in reducers) {
      const oldValue = oldState[key]
      const reducer = reducers[key]

      newState[key] = reducer(oldValue, action)
    }
    return newState
  }
}

export default combineReducers
