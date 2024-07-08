const _ = require('lodash')

const obj = { a: {b: {c: 1}} }

console.log(_.result(obj, 'a.b.c')) 

console.log(obj)