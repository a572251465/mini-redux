import { remove } from "redux-saga/internal/utils.js";

export function channel() {
  // 保存 take的数组
  let takers = [];

  /**
   * 类似 dispatch 派发（消费者）
   *
   * @author lihh
   * @param input 类似 dispatch type
   */
  function put(input) {
    if (takers.length === 0) return;

    for (let i = 0; i < takers.length; i++) {
      // 其实此时拿到的是 next函数
      const takerNext = takers[i];
      if (takerNext["MATCH"](input)) {
        // 从栈中删除
        takerNext.cancel();
        // 执行下一个next
        takerNext(input);
      }
    }
  }

  /**
   * 监听 action的动作（产生者）
   *
   * @author lihh
   * @param cb 回调函数
   * @param matcher 匹配的matcher
   */
  function take(cb, matcher) {
    // 在方法上 设置matcher
    cb["MATCH"] = matcher;

    // 将 take 的回调/ 添加到栈中
    // 将next 添加到taker栈中
    takers.push(cb);
    // 通过 cancel 函数，从栈中删除
    cb.cancel = function () {
      remove(takers, cb);
    };
  }

  return {
    put,
    take,
  };
}
