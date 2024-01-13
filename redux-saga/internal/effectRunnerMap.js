import * as effectTypes from "./effectTypes.js";
import proc from "redux-saga/internal/proc.js";
import * as is from "./is.js";
import { createAllStyleChildCallbacks } from "redux-saga/internal/utils.js";

/**
 * take 的effect
 *
 * @author lihh
 * @param env getState, dispatch, channel 的集合
 * @param pattern 匹配的pattern 其实就是take的类型 例如：ASYNC_ADD
 * @param cb 回调函数 此时的cb其实就是next
 */
function runTakeEffect(env, { pattern }, cb) {
  const matcher = (input) => input.type === pattern;
  env.channel.take(cb, matcher);
}

/**
 * put effect
 *
 * @author lihh
 * @param env getState, dispatch, channel 的集合
 * @param action action 动作
 * @param cb 回调函数 next函数
 */
function runPutEffect(env, { action }, cb) {
  // 开始派发 action
  const result = env.dispatch(action);
  cb(result);
}

/**
 * 执行 fork effect
 *
 * @author lihh
 * @param env 实例
 * @param fn fork 函数 sgaa 函数/ iterator函数
 * @param cb 回调
 */
function runForkEffect(env, { fn }, cb) {
  // 执行拿到iterator
  const taskIterator = fn();
  // 执行next 拿到值
  const cancelTask = proc(env, taskIterator);
  cb(cancelTask);
}

/**
 * 执行 call effect
 *
 * @author lihh
 * @param env 实例
 * @param fn 执行函数
 * @param args
 * @param cb 回调 其实就是next函数
 */
function runCallEffect(env, { fn, args }, cb) {
  // 执行函数
  const result = fn.apply(null, args);

  if (is.promise(result)) {
    return result.then(cb).catch((error) => cb(error, true));
  } else cb(result);
}

/**
 * 执行 cps effect
 *
 * @author lihh
 * @param env 实例
 * @param context 上下文
 * @param fn 执行函数
 * @param args 剩余参数
 * @param cb 回调
 */
function runCPSEffect(env, { context, fn, args }, cb) {
  const cpsCb = (err, res) => {
    if (is.undef(err)) {
      cb(res);
    } else {
      cb(err, true);
    }
  };

  fn.apply(context, args.concat(cpsCb));
}

/**
 * run all effect
 *
 * @author lihh
 * @param env 实例 包含（instance）
 * @param effects effect数组
 * @param cb 回调
 * @param runEffect 执行 effect
 */
function runAllEffect(env, effects, cb, { runEffect }) {
  const keys = Object.keys(effects);
  if (keys.length === 0) return cb([]);

  const childCallbacks = createAllStyleChildCallbacks(effects, cb);
  keys.forEach((key) => {
    runEffect(effects[key], childCallbacks[key]);
  });
}

/**
 * 取消 effect
 *
 * @author lihh
 * @param env 实例
 * @param task 任务
 * @param cb 回调
 */
function runCancelEffect(env, task, cb) {
  task.cancel();
  cb();
}

// effect 执行 map
const effectRunnerMap = {
  [effectTypes.TAKE]: runTakeEffect,
  [effectTypes.PUT]: runPutEffect,
  [effectTypes.FORK]: runForkEffect,
  [effectTypes.CALL]: runCallEffect,
  [effectTypes.CPS]: runCPSEffect,
  [effectTypes.ALL]: runAllEffect,
  [effectTypes.CANCEL]: runCancelEffect,
};

export default effectRunnerMap;
