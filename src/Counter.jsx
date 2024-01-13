import { useSelector } from "react-redux";
import actions from "@/store/actions.js";
import useBoundDispatch from "../react-redux/hooks/useBoundDispatch.js";

function Counter() {
  const number = useSelector((state) => state.number);
  const boundDispatch = useBoundDispatch(actions);

  return (
    <div>
      <p>{number}</p>
      <button onClick={boundDispatch.add}>+</button>
    </div>
  );
}

export default Counter;
