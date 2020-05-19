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

// extend 的最终目的是把 from 里的属性都扩展到 to 中，包括原型上的属性
export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    // 原始版
    // to[key] = from[key]
    // 断言版
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}
