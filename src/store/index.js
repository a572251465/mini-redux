import { createStore, applyMiddleware } from '../redux'
import reducers from './reducers'
import logger from './middleware/logger'
import thunk from './middleware/thunk'

const store = applyMiddleware(thunk)(createStore)(reducers)

// redux中间件的基本原理 就是通过劫持dispatch 来执行自己的中间件
// const dispatch = store.dispatch
// store.dispatch = function (...args) {
//   console.log('pre', store.getState())
//   dispatch(...args)
//   console.log('next', store.getState())
// }

export default store
