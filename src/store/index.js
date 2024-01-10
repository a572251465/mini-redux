import { createStore } from "redux/createStore.js";
import reducers from "@/store/reducers/index.js";

const store = createStore(reducers, {
  counter1: { number: 1 },
  counter2: { number: 1 },
});

export default store;
