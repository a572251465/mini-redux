/**
 * 表示日志中间件
 *
 * @author lihh
 * @param store 传递的store 仓库
 * @constructor
 */
function ReduxLogger(store) {
  const { getState } = store;
  // next 表示调用下一个中间件
  return function (next) {
    // 改造后的dispatch
    return function (action) {
      console.log("prev state", getState());
      next(action);
      console.log("next state", getState());
      return action;
    };
  };
}

export default ReduxLogger;
