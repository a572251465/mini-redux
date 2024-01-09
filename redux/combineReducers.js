/**
 * 合并 reducer
 *
 * @author lihh
 * @param reducers 多个reducer 对象/ 其实就是将多个reducer合并
 */
export default function combineReducers(reducers = {}) {
  // 拿到reducer 所有的key
  const reducerKeys = Object.keys(reducers);
  // 表示最终的reducer
  const finalReducers = {};

  for (let i = 0; i < reducerKeys.length; i++) {
    const key = reducerKeys[i];

    // 判断是否是函数
    if (typeof reducers[key] === "function") finalReducers[key] = reducers[key];
  }

  const finalReducerKeys = Object.keys(finalReducers);

  return function combination(state, action) {
    let hasChanged = false;
    // 下一个最新的状态
    const nextState = {};
    for (let i = 0; i < finalReducerKeys.length; i++) {
      const key = finalReducerKeys[i];
      const reducer = finalReducers[key];

      // 拿到上一次的状态
      const previousStateForKey = state[key];
      // 通过执行reducer 拿到最新的状态
      const nextStateForKey = reducer(previousStateForKey, action);
      // 最新的状态不能是undefined
      if (typeof nextStateForKey === "undefined") {
        const actionType = action && action.type;
        throw new Error(
          `When called with an action of type ${
            actionType ? `"${String(actionType)}"` : "(unknown type)"
          }, the slice reducer for key "${key}" returned undefined. ` +
            `To ignore an action, you must explicitly return the previous state. ` +
            `If you want this reducer to hold no value, you can return null instead of undefined.`,
        );
      }

      // 更新最新的数据
      nextState[key] = nextStateForKey;
      // 判断是否更新（如果是true的话 就一直是true）
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }

    // 如果hasChanged 本身就是true || 传递的state不同的话
    hasChanged =
      hasChanged || finalReducerKeys.length !== Object.keys(state).length;

    return hasChanged ? nextState : state;
  };
}
