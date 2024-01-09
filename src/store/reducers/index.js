import counter1 from "./counter1";
import counter2 from "./counter2";
import combineReducers from "redux/combineReducers.js";
let rootReducer = combineReducers({
  counter1,
  counter2,
});
export default rootReducer;
