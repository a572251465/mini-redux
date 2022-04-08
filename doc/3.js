class IsNumber {
  static [Symbol.hasInstance](x) {
    return typeof x === 'number'
  }
}

console.log(1 instanceof IsNumber)
