// 判断是否是函数
export const func = (f) => typeof f === "function";
// 是否是生成器函数
export const iterator = (it) => it && func(it.next) && func(it.throw);
// 判断是否是 promise
export const promise = (p) => p && func(p.then);
// 是否是null || undefined
export const undef = (v) => v === null || v === undefined;
