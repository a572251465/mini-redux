import { createStore } from "redux/createStore.js";
import reducer from "./reducers";

const store = createStore(reducer, {
  counter1: { number: 0 },
  counter2: { number: 0 },
});
export default store;
