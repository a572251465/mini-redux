import effectRunnerMap from "redux-saga/internal/effectRunnerMap.js";
import * as is from "./is.js";
import { TASK_CANCEL } from "redux-saga/internal/symbols.js";

/**
 * 解析promise
 *
 * @author lihh
 * @param promise 传递过来的promise
 * @param cb 回调函数
 */
function resolvePromise(promise, cb) {
  promise.then(cb, function (error) {
    cb(error, true);
  });
}

/**
 * 执行 next的函数
 *
 * @author lihh
 * @param env {channel: {take | put}, getState, dispatch} 的合集
 * @param iterator 生成器函数
 * @param cont 回调函数
 */
export default function proc(env, iterator, cont) {
  let task = { cancel: () => next(TASK_CANCEL) };
  // 开始执行next函数
  next();

  /**
   * 表示 next 函数
   *
   * @author lihh
   * @param arg 传递给next函数的 参数
   * @param isErr 表示是否错误
   */
  function next(arg, isErr) {
    let result;

    // 判断错误信息等
    if (isErr) {
      result = iterator.throw(arg);
    } else if (arg === TASK_CANCEL) {
      result = iterator.return(arg);
    } else {
      // 执行一次 next。 yield 会向前执行一步 && 返回类型 done: false value: {type: take, payload: ASYNC_ADD}
      result = iterator.next(arg);
    }

    // 判断生成器函数是否执行结束
    // 如果执行了 if，表示是一个false的场合
    if (!result.done) {
      // 此时next 执行权保存起来
      runEffect(result.value, next);
    } else {
      is.func(cont) && cont(result.value);
    }
  }

  /**
   * 执行 effect的函数
   *
   * @author lihh
   * @param effect effect函数 其实就是field 返回的内容
   * @param next next函数
   */
  function runEffect(effect, next) {
    // 解析判断 返回的effect 是否是promise
    if (is.promise(effect)) {
      resolvePromise(effect, next);

      // 解析是否是 iterator
    } else if (is.iterator(effect)) {
      proc(env, effect, next);

      // 啥都不是 && 但是存在
    } else if (effect) {
      // 此时的type 有可能是TAKE， 那么此时从Map中拿到的是take run effect
      const effectRunner = effectRunnerMap[effect.type];
      effectRunner(env, effect.payload, next, { runEffect });
    } else next();
  }

  return task;
}
