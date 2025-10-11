import {http} from '../utils/request.js'

export const userApi = {
login: (data) => {
    return http.post('/auth/login', data, {
      loadingText: '登录中...'
    })
  }
}