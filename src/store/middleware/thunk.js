function thunkMiddleware({ getState, dispatch }) {
  return function (next) {
    return function (actions) {
      if (typeof actions === 'function') {
        return actions(dispatch, getState)
      }
      return next(actions)
    }
  }
}

export default thunkMiddleware
