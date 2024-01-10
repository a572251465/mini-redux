import { useBoundDispatch, useSelector } from "react-redux/hooks/index.js";
import { actions } from "@/store/actions/counter1.js";

const Counter1Comp = function Counter1() {
  const state = useSelector((state) => state.counter1);
  const boundActions = useBoundDispatch(actions);

  return (
    <div>
      <h1>这是 counter1</h1>
      <span>{state.number}</span>
      <button onClick={boundActions.add1}> -- add -- </button>
      <button onClick={boundActions.minus1}> -- minus --</button>
    </div>
  );
};
export default Counter1Comp;
