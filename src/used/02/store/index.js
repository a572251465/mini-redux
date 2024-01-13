import { createStore } from "redux/createStore.js";
import reducers from "@/store/reducers/index.js";
import { applyMiddleware } from "redux/index.js";
import { ReduxLogger, ReduxPromise } from "redux/middleware/index.js";
import reduxThunk from "redux/middleware/ReduxThunk.js";

const store = applyMiddleware(
  ReduxPromise,
  reduxThunk,
  ReduxLogger,
)(createStore)(reducers, { counter1: { number: 1 }, counter2: { number: 1 } });

export default store;
