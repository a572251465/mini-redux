import * as effectTypes from "./internal/effectTypes.js";
import { promise } from "redux-saga/internal/is.js";

/**
 * 构建 effect的工厂函数
 *
 * @author lihh
 * @param type 类型
 * @param payload 参数
 * @return {{payload, type}}
 */
function makeEffectFactory(type, payload) {
  return { type, payload };
}

/**
 * 通过 工厂函数 生成take
 *
 * @author lihh
 * @param pattern
 * @return {{payload, type}}
 */
export function take(pattern) {
  return makeEffectFactory(effectTypes.TAKE, { pattern });
}

/**
 * 通过 工厂函数 生成put
 *
 * @author lihh
 * @param action 动作
 * @return {{payload, type}}
 */
export function put(action) {
  return makeEffectFactory(effectTypes.PUT, { action });
}

/**
 * fork 子进程来进行运行
 *
 * @author lihh
 * @param fn fork 的函数
 * @return {{payload, type}}
 */
export function fork(fn) {
  return makeEffectFactory(effectTypes.FORK, { fn });
}

/**
 * 不断的监听 action = take + put
 *
 * @author lihh
 * @param pattern 匹配规则
 * @param saga saga 函数 表示每次都fork函数
 */
export function takeEvery(pattern, saga) {
  // 构建一个新的generator 函数
  function* takeEveryHelper() {
    // 死循环
    while (true) {
      yield take(pattern);
      yield fork(saga);
    }
  }

  return fork(takeEveryHelper);
}

/**
 * call effect
 *
 * @author lihh
 * @param fn 待执行的函数
 * @param args 参数
 */
export function call(fn, ...args) {
  return makeEffectFactory(effectTypes.CALL, { fn, args });
}

/**
 * 构建 cps的函数
 *
 * @param fn cps 中的函数
 * @param args 参数
 */
export function cps(fn, ...args) {
  return makeEffectFactory(effectTypes.CPS, { fn, args });
}

/**
 * 构建 all的函数
 *
 * @author lihh
 * @param effects 多个effect
 * @return {{payload, type}}
 */
export function all(effects) {
  return makeEffectFactory(effectTypes.ALL, effects);
}

/**
 * 构建 cancel 函数
 *
 * @author lihh
 * @param task 任务
 * @return {{payload, type}}
 */
export function cancel(task) {
  return makeEffectFactory(effectTypes.CANCEL, task);
}

/**
 * 休眠方法
 *
 * @author lihh
 * @type {any}
 */
export const delay = call.bind(null, function (ms, val = true) {
  return new promise((resolve) => {
    let timer = setTimeout(
      () => {
        resolve();
        clearTimeout(timer);
      },
      ms,
      val,
    );
  });
});
