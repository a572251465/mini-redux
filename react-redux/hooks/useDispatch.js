import React from "react";
import { ReactReduxContext } from "react-redux/components/Context.js";

/**
 * 结合context上下文 && 从store中拿到dispatch
 *
 * @author lihh
 * @return {(function(*): *)|*}
 */
export default function useDispatch() {
  const { store } = React.useContext(ReactReduxContext);
  return store.dispatch;
}
