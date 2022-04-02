function createStore(reducer, initState) {
  let listeners = [],
    state = null

  /**
   * @author lihh
   * @description 表示dispatch 触发动作
   * @param action 动作类型 必须包含type
   */
  const dispatch = (action) => {
    state = reducer(state || initState, action)

    listeners.forEach((fn) => fn())
  }
  // 初期立马执行
  dispatch({ type: '@@@INIT' })

  /**
   * @author lihh
   * @description 获取数据状态
   * @returns {null}
   */
  const getState = () => {
    return state
  }

  /**
   * @author lihh
   * @description 直接发布订阅函数
   * @param listener
   * @returns {(function(): void)|*}
   */
  const subscribe = (listener) => {
    listeners.push(listener)
    return () => {
      listeners = listeners.filter((fn) => fn !== listener)
    }
  }

  return {
    subscribe,
    getState,
    dispatch
  }
}

export default createStore
