import { Types } from "@/store/action-types.js";

export default function reducer(state, action) {
  switch (action.type) {
    case Types.ADD2:
      return { number: state.number + 1 };
    case Types.MINUS2:
      return { number: state.number - 1 };
    default:
      return state;
  }
}
