import axios from "axios"

export default class Axios {
  static instance = axios.create({
    baseURL: '/',
    timeout: 15000
  })

  static get(url, data, config) {
    return new Promise((resolve, reject) => {
      this.instance.get(url,{params:data},config).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }

  static post (url, data, config) {
    return new Promise((resolve, reject) => {
      this.instance.post(url, data, config).then(res => {
        resolve(res.data)
      }).catch(err => {
      reject(err)
      })
    })
  }
}
