/**
 * @author lihh
 * @description 实现logger中间件 中间件固定格式 高阶函数/ 返回三个函数 参数分别是store/ next/ actions
 * @param {*} param0
 * @returns
 */
function loggerMiddleware({ getState }) {
  return function (next) {
    return function (actions) {
      console.log(`before`, getState())
      next(actions)
      console.log(`after`, getState())
      return actions
    }
  }
}

export default loggerMiddleware
