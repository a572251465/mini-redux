function compose(...funcs) {
  return funcs.reduce(
    (a, b) =>
      (...args) =>
        a(b(...args))
  )
}
let promise = (next) => (action) => {
  console.log('promise')
  next(action)
}
let thunk = (next) => (action) => {
  console.log('thunk')
  next(action)
}
let logger = (next) => (action) => {
  console.log('logger')
  next(action)
}

let chain = [promise, thunk, logger]
let composed = compose(...chain)
let dispatch = () => {
  console.log('原始的dispatch')
}
let newDispatch = composed(dispatch)
console.log(newDispatch)
newDispatch({ type: 'add' })
