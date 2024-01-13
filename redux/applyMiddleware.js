import compose from "redux/compose.js";

function applyMiddleware(...middlewares) {
  return function (createStore) {
    return function (reducer, preloadedState) {
      const store = createStore(reducer, preloadedState);

      let dispatch;
      // 构建的新的 state 以及dispatch 集合
      let middlewareAPI = {
        getState: store.getState,
        dispatch: (action) => dispatch(action),
      };
      const chain = middlewares.map((middleware) => middleware(middlewareAPI));
      // 这个就是将每个middleware 嵌套起来 最后一层才是执行dispatch
      /**
       * const Logger = (store) => (next) => (action) => {}
       *
       * const chain = [(next) => (action) => {}]
       *
       * 集合 compose 其实store.dispatch 就是args，输入啥返回啥
       */
      dispatch = compose(...chain)(store.dispatch);
      return {
        ...store,
        dispatch,
      };
    };
  };
}

export default applyMiddleware;
