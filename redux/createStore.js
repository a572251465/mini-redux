import { ActionTypes } from "redux/utils/actionTypes.js";

/**
 * 创建 store 的方法
 *
 * @author lih
 * @param reducer 执行的reducer 一定是一个函数
 * @param preloadedState 预加载的state
 */
export function createStore(reducer, preloadedState) {
  // 当前的reducer
  let currentReducer = reducer;
  // 当前的状态
  let currentState = preloadedState;

  // 表示当前的监听器
  let currentListeners = new Map();
  // 表示下一个监听器
  let nextListeners = currentListeners;
  // 监听的计数器
  let listenerIdCounter = 0;

  /**
   * 获取当前的store状态
   *
   * @author lihh
   * @return {*} 返回数据
   */
  function getState() {
    return currentState;
  }

  /**
   * 订阅的方法
   *
   * @author lihh
   * @param listener 监听的方法
   */
  function subscribe(listener) {
    let isSubscribed = true;

    // 设置监听器的方法
    const listenerId = listenerIdCounter++;
    nextListeners.set(listenerId, listener);

    return function () {
      // 避免重复取消订阅
      if (!isSubscribed) return;

      isSubscribed = false;
      // 删除订阅的方法
      nextListeners.delete(listenerId);
      currentListeners = null;
    };
  }

  /**
   * 派发的方法
   *
   * @author lihh
   * @param action 派发的动作 例如：{type: xxx, payload: yy} 原则上必须是对象
   */
  function dispatch(action) {
    // 执行 reducer 方法
    currentState = currentReducer(currentState, action);

    const listeners = (currentListeners = nextListeners);
    // forEach 可以遍历Map的value值
    listeners.forEach((listener) => {
      listener();
    });
    return action;
  }

  // 初期化执行/ 第一次执行的话 可以拿到初期化的state（假如没有初期值的话）
  dispatch({ type: ActionTypes.INIT });
  // 定义 store 集合
  return {
    dispatch,
    subscribe,
    getState,
  };
}
