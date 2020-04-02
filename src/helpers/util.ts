const toString = Object.prototype.toString

export function isDate(val: any): val is Date {
  // is 是类型保护
  return toString.call(val) === '[object Date]'
}

// 这个函数对FormData、ArrayBuffer 这些类型，isObject 判断也为 true。通用性不是很好，所以有了 isPlainObject函数
export function isObject(val: any): val is Object {
  return val !== null && typeof val === 'object'
}

export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
  // FormData 会是 [object FormData]
}
