import { isDate, isObject } from './util'

function encode(val: string): string {
  return (
    encodeURIComponent(val)
      // 下面是我们不希望被转的字符，我们把它们转回来
      .replace(/%40/g, '@')
      .replace(/%3A/gi, ':')
      .replace(/%24/g, '$')
      .replace(/%2C/gi, ',')
      .replace(/%20/g, '+')
      .replace(/%5B/gi, '[')
      .replace(/%5D/gi, ']')
  )
}

export function bulidURL(url: string, params?: any): string {
  if (!params) return url

  const parts: string[] = []

  Object.keys(params).forEach(key => {
    // 拿到 params 的各个值并判断类型
    const val = params[key]
    if (val === null || typeof val === 'undefined') {
      return // 这里的 return 是跳到下个循环
    }

    // 区分是数组和不是数组的情况，但是都得统一处理
    /* params: { foo: ['bar', 'baz'] } 的时候，
    url 是 /base/get?foo[]=bar&foo[]=baz'
    */
    let values: string[]
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }
    values.forEach(val => {
      if (isDate(val)) {
        // 如果是Date类型的话需要转换成字符串
        // 由于 isDate 有类型保护，所以这里这个 if 的分支可以用 Date 类型的 toISOString 方法
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  // 参数序列化完成，拼接到原来 url 后并 return
  let serializedParams = parts.join('&')

  if (serializedParams) {
    const markIndex = url.indexOf('#')
    // 如果有 hash 标志，把 hash 后面的部分去掉
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    // 原 url 是否本来就有 ? , 有的话就拼 &
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}
