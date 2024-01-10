import { Types } from "@/store/action-types.js";

const actions = {
  add2() {
    return { type: Types.ADD2 };
  },
  minus2() {
    return { type: Types.MINUS2 };
  },
};
export default actions;
