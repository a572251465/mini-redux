import { put, take } from "redux-saga/effects";
import * as actionTypes from "./action-types";

export function* rootSaga() {
  for (let i = 0; i < 3; i++) {
    yield take(actionTypes.ASYNC_ADD);
    console.log("执行了---", i);
    yield put({ type: actionTypes.ADD });
    console.log("执行了----", i);
  }
  console.log("已经达到最大值");
}
