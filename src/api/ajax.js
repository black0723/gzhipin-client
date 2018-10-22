/*
发送Ajax请求，返回promise对象
 */

import axios from 'axios'

export default function ajax(url, data = {}, type = 'GET') {
  if (type === 'GET') {
    let params = '?'
    Object.keys(data).forEach(key => {
      params += key + '=' + data[key] + '&'
    })
    if (params.length > 1) {
      params = params.substring(0, params.length - 1)
    }
    return axios.get(url + params)
  } else {
    return axios.post(url, data)
  }
}

