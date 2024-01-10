import { Types } from "@/store/action-types.js";

export default function reducer(state, action) {
  switch (action.type) {
    case Types.ADD1:
      return { number: state.number + 1 };
    case Types.MINUS1:
      return { number: state.number - 1 };
    default:
      return state;
  }
}
