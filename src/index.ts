import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'
import { bulidURL } from './helpers/url'
import { transformRequest, transformResponse } from './helpers/data'
import { processHeaders } from './helpers/headers'
import xhr from './xhr'

const axios = function(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}
const processConfig = function(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

const transformUrl = function(config: AxiosRequestConfig): string {
  const { url, params } = config
  return bulidURL(url, params)
}
const transformHeaders = function(config: AxiosRequestConfig): void {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}
const transformRequestData = function(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}
const transformResponseData = function(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}

export default axios
