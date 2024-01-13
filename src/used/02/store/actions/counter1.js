import { Types } from "@/store/action-types.js";

export const actions = {
  add1() {
    return { type: Types.ADD1 };
  },
  minus1() {
    return { type: Types.MINUS1 };
  },
  thunkAdd1() {
    return function (dispatch) {
      setTimeout(function () {
        dispatch({ type: Types.ADD1 });
      }, 2000);
    };
  },
  promiseAdd1() {
    return {
      type: Types.ADD1,
      payload: new Promise((resolve, reject) => {
        setTimeout(() => {
          let result = Math.random();
          if (result > 0.5) {
            resolve(result);
          } else {
            reject(result);
          }
        }, 1000);
      }),
    };
  },
  promiseAdd2() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ type: Types.ADD1 });
      }, 1000);
    });
  },
};
