/**
 * 支持方法的中间件
 *
 * @author lihh
 * @param store 传递的store 仓库
 * @constructor
 */
function ReduxThunk(store) {
  const { getState, dispatch } = store;
  // next 表示调用下一个中间件
  return function (next) {
    // 改造后的dispatch
    return function (action) {
      if (typeof action === "function") {
        return action(getState, dispatch);
      }
      return next(action);
    };
  };
}

export default ReduxThunk;
