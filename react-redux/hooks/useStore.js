import React from "react";
import { ReactReduxContext } from "react-redux/components/Context.js";

/**
 * 通过context 拿到store 上下文
 *
 * @author lihh
 */
export default function useStore() {
  const { store } = React.useContext(ReactReduxContext);
  return store;
}
