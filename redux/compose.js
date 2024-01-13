/**
 * 表示 compose 函数
 *
 * @author lihh
 * @param fns 传递的多个函数
 */
function compose(...fns) {
  if (fns.length === 0) return (x) => x;
  if (fns.length === 1) return fns[0];

  /**
   * 其实就是多个函数 包裹着运行
   * 例如：
   * fns = [a, b, c]
   * (...args) => a(b(c(...args)));
   *
   * 1. 先执行c函数，其中会传递一个参数，c函数执行结束后将结束给b函数
   * 2. 执行b函数，接受c函数的返回值 && 运行，b函数执行结束后将返回值给a函数
   * 3. 执行a函数，接受b函数的返回值 && 运行，然后将最后的值返回
   */
  return fns.reduce(
    (outer, inner) =>
      (...args) =>
        outer(inner(...args)),
  );
}

export default compose;
