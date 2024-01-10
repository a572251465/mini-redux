import { ReactReduxContext } from "react-redux/components/Context.js";

/**
 * 拿到 redux context 上下文
 *
 * @author lihh
 * @return {React.Context<null>}
 */
export default function useReduxContext() {
  return ReactReduxContext;
}
