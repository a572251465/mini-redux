/**
 * 表示promise 中间件
 *
 * @author lihh
 * @param dispatch 派发的事件
 * @return {function(*): function(*): void}
 * @constructor
 */
function ReduxPromise({ dispatch }) {
  return function (next) {
    return function (action) {
      if (action.then && typeof action.then === "function") {
        action.then(dispatch).catch(dispatch);
      } else if (action.payload && typeof action.payload === "function") {
        action.payload
          .then((result) => dispatch({ ...action, payload: result }))
          .catch((error) => {
            dispatch({ ...action, payload: error, error: true });
            return Promise.reject(error);
          });
      } else {
        return next(action);
      }
    };
  };
}

export default ReduxPromise;
