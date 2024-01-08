/**
 *
 * 绑定 action的方法
 *
 * @author lihh
 * @param actionCreator action 创建器
 * @param dispatch 派发器
 * @return function(*, ...[*]): *
 */
function bindActionCreator(actionCreator, dispatch) {
  // 因为返回的函数 其实是在dom event中执行，所以此时的_this是事件 event
  return function (_this, ...args) {
    // 通过高阶函数 来调用dispatch
    // 事件【actionCreator】 执行结果就是类似{type: "add"}
    return dispatch(actionCreator.apply(_this, args));
  };
}

/**
 * 绑定action 的创建器
 *
 * @author lihh
 * @param actionCreators action 创建器
 * @param dispatch 派发事件
 */
export function bindActionCreators(actionCreators, dispatch) {
  const boundActionCreators = {};
  for (const key in actionCreators) {
    const actionCreator = actionCreators[key];
    if (typeof actionCreator === "function")
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
  }

  return boundActionCreators;
}
