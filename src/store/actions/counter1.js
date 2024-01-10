import { Types } from "@/store/action-types.js";

export const actions = {
  add1() {
    return { type: Types.ADD1 };
  },
  minus1() {
    return { type: Types.MINUS1 };
  },
};
