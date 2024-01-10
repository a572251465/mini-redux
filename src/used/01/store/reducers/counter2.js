import * as types from "@/store/action-types.js";

let initialState = { number: 0 };

export default function (state = initialState, action) {
  switch (action.type) {
    case types.ADD2:
      return { number: state.number + 1 };
    case types.MINUS2:
      return { number: state.number - 1 };
    default:
      return state;
  }
}
