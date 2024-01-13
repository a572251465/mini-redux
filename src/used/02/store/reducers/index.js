import combineReducers from "redux/combineReducers.js";

import counter1Reducer from "./counter1";
import counter2Reducer from "./counter2";

export default combineReducers({
  counter1: counter1Reducer,
  counter2: counter2Reducer,
});
