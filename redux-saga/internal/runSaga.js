import proc from "redux-saga/internal/proc.js";

/**
 * 执行 saga 的函数
 *
 * @author lihh
 * @param channel {take, put} 的函数
 * @param dispatch 派发函数
 * @param getState 可以拿到状态的函数
 * @param saga saga本身 就是生成器函数
 * @param args 剩余参数
 */
export function runSaga({ channel, dispatch, getState }, saga, ...args) {
  // 此时的saga 就是生成器函数，所以执行后拿到iterator，顺便可以给rootSaga 传递多个参数
  // 从而拿到iterator 迭代器
  const iterator = saga(...args);

  // 总的实例
  const env = { channel, dispatch, getState };
  proc(env, iterator);
}
