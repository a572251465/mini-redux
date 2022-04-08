/**
 * @author lihh
 * @description 中间件的实现原理
 * @param {*} middleware 传递的中间件
 * @returns
 */
function applyMiddleware(middleware) {
  return function (createStore) {
    return function (reducer, preState) {
      const store = createStore(reducer, preState)
      const dispatch = middleware(store)(store.dispatch)
      return {
        ...store,
        dispatch
      }
    }
  }
}

export default applyMiddleware
