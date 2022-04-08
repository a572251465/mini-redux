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

function compose(fns = []) {
  if (fns.length === 0) return (x) => x
  if (fns.length === 1) return (x) => fns[0](x)

  return fns.reduce(
    (a, b) =>
      (...args) =>
        a(b(...args))
  )
}

const run = compose(fns)
console.log(run('test'))
