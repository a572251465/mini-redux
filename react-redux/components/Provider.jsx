import { ReactReduxContext } from "react-redux/components/Context.js";

/**
 * 定义 Provider 组件
 *
 * @author lihh
 * @constructor
 * @param props 传递的参数
 */
export default function Provider(props) {
  return (
    <ReactReduxContext.Provider value={{ store: props.store }}>
      {props.children}
    </ReactReduxContext.Provider>
  );
}
