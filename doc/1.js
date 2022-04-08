function add1(str) {
  return 1 + str
}

function add2(str) {
  return 2 + str
}

function add3(str) {
  return 3 + str
}

const fns = [add1, add2, add3]
function run(...args) {
  let i = fns.length - 1

  for (; i >= 0; i -= 1) {
    args = fns[i](args)
  }

  return args
}

console.log(run('test'))
