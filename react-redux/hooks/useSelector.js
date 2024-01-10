import { shallowEqual } from "react-redux/utils/index.js";
import React, { useRef } from "react";
import { ReactReduxContext } from "react-redux/components/Context.js";

/**
 * 选择的状态
 *
 * @author lihh
 * @param selector 选择器
 * @param equalityFn 比较方法
 */
export default function useSelector(selector, equalityFn = shallowEqual) {
  const { store } = React.useContext(ReactReduxContext);
  // 表示最后一个选择的状态
  let lastSelectedState = useRef(null);

  // 拿到store中最新的状态
  const state = store.getState();
  // 根据选择器 拿到最新的状态  有可能状态是：xx.counter1.number 其实我们需要剥离counter1
  const selectedState = selector(state);

  // 用来强制更新策略
  let [, forceUpdate] = React.useReducer((x) => x + 1, 0);
  React.useEffect(
    () =>
      store.subscribe(() => {
        // 拿到最新的状态
        const selectedState = selector(store.getState());
        // 判断是否需要重新渲染
        if (!equalityFn(lastSelectedState.current, selectedState)) {
          forceUpdate();
          lastSelectedState.current = selectedState;
        }
      }),
    [],
  );

  return selectedState;
}
