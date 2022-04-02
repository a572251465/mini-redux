function bindActionCreators(bindCreates, dispatch) {
  const boundActionCreators = {}

  for (const key in bindCreates) {
    const actionCreators = bindCreates[key]
    boundActionCreators[key] = bindActionCreator(actionCreators, dispatch)
  }
  return boundActionCreators
}

function bindActionCreator(actionCreators, dispatch) {
  return (...args) => {
    return dispatch(actionCreators(...args))
  }
}

export default bindActionCreators
