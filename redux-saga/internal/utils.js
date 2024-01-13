/**
 * 从 数组栈中删除元素
 *
 * @author lihh
 * @param array 元素栈
 * @param item 个别元素
 */
export function remove(array, item) {
  const index = array.indexOf(item);
  if (index >= 0) array.splice(index, 1);
}

/**
 * 一次订阅的方法
 *
 * @author lihh
 * @param fn 执行函数
 */
export function once(fn) {
  let called = false;

  return function () {
    if (called) return;
    called = true;
    fn();
  };
}

export function createAllStyleChildCallbacks(shape, parentCallback) {
  const keys = Object.keys(shape);
  const totalCount = keys.length;

  let completedCount = 0;
  // 构建一个空数组
  const results = new Array(totalCount);
  const childCallbacks = {};

  function checkEnd() {
    if (completedCount === totalCount) parentCallback(results);
  }

  keys.forEach((key) => {
    childCallbacks[key] = (res) => {
      results[key] = res;
      completedCount++;
      checkEnd();
    };
  });
  return childCallbacks;
}
