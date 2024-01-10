import * as types from "@/store/action-types.js";

const actions = {
  add1() {
    return { type: types.ADD1 };
  },
  minus1() {
    return { type: types.MINUS1 };
  },
};
export default actions;
