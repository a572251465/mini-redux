import { applyMiddleware, createStore } from "redux";
import reducer from "./reducer";
import { sagaMiddlewareFactory } from "redux-saga";
import { rootSaga } from "./sagas";

// 创建saga 的中间件
const sagaMiddleware = sagaMiddlewareFactory();
const store = applyMiddleware(sagaMiddleware)(createStore)(reducer);
sagaMiddleware.run(rootSaga);
export default store;
