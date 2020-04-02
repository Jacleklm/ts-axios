import { AxiosRequestConfig } from './types'
import { bulidURL } from './helpers/url'
import { transformRequest } from './helpers/data'
import { processHeaders } from './helpers/headers'
import xhr from './xhr'

const axios = function(config: AxiosRequestConfig): void {
  processConfig(config)
  xhr(config)
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

export default axios
