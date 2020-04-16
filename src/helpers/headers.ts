import { isPlainObject } from './util'

function normalizeHeaderName(headers: any, normalizedName: string): void {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

export const processHeaders = function(headers: any, data: any): any {
  // Content-Type 有时候也可以写成 content-type，所以这里要对 header 做一次规范化
  normalizeHeaderName(headers, 'Content-Type')

  // 常规判断：如果 data 是对象并且 headers 存在并且无 Content-Type
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}

export function parseHeaders(headers: string): any {
  // 因为无法确定对象的数据结构，所以写成any
  // let parsed = {}
  let parsed = Object.create(null)
  /*
  用这种方式创建一个空对象，而不是直接赋值为 {}。因为下面有 parsed[key] = val 元素隐式具有 "any" 类型，因为类型为 "string" 的表达式不能用于索引类型 "{}"。
  在类型 "{}" 上找不到具有类型为 "string" 的参数的索引签名
  */
  if (!headers) {
    return parsed
  }

  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) {
      return
    }
    if (val) {
      val = val.trim()
    }
    parsed[key] = val
  })

  return parsed
}
