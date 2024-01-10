import React from "react";
import { ReactReduxContext } from "react-redux/components/Context.js";
import { bindActionCreators } from "redux/bindActionCreators.js";

/**
 * 绑定 action dispatch
 *
 * @author lihh
 * @param actions 表示action 动作
 */
export default function useBoundDispatch(actions) {
  const { store } = React.useContext(ReactReduxContext);
  return bindActionCreators(actions, store.dispatch);
}
