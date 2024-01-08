/**
 * 产生一个随机的字符串
 *
 * @author lihh
 * @return {string} 返回一个字符串
 */
const randomString = () =>
  Math.random().toString(36).substring(7).split("").join(".");

/**
 * 动作类型
 *
 * @author lihh
 * @type {{INIT: string}} 返回一个固定的字符串/ 表示特殊特殊业务意义的字符串
 */
export const ActionTypes = {
  INIT: `@@redux/INIT${randomString()}`,
  REPLACE: `@@redux/REPLACE${randomString()}`,
};
