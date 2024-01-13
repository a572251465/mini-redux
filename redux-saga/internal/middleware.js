import { channel as channelFactory } from "redux-saga/internal/channel.js";
import { runSaga } from "redux-saga/internal/runSaga.js";

/**
 * saga 中间件 工厂
 *
 * @author lihh
 */
function sagaMiddlewareFactory() {
  // 创建{put, take} 频道
  const channel = channelFactory();

  let boundRunSaga;

  /**
   * saga 中间件
   *
   * @author lihh
   * @param getState 可以拿到状态的函数
   * @param dispatch 派发函数
   */
  function sagaMiddleware({ getState, dispatch }) {
    boundRunSaga = runSaga.bind(null, { channel, getState, dispatch });
    return function (next) {
      return function (action) {
        const result = next(action);
        // 派发
        channel.put(action);
        return result;
      };
    };
  }

  // 此处定义run函数 目的是为了获取 getState/ dispatch
  sagaMiddleware.run = function (...args) {
    boundRunSaga(...args);
  };

  return sagaMiddleware;
}

export default sagaMiddlewareFactory;
