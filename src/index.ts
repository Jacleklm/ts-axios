import { AxiosRequestConfig } from './types'
import xhr from './xhr'

const axios = function(config: AxiosRequestConfig) {
  xhr(config)
}

export default axios
