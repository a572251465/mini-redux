import { Types } from "@/store/action-types.js";

export const actions = {
  add2() {
    return { type: Types.ADD2 };
  },
  minus2() {
    return { type: Types.MINUS2 };
  },
};
