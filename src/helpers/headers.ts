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
