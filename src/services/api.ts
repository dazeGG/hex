import axios from 'axios'

const api = axios.create({ baseURL: 'http://79.143.31.216' })

api.interceptors.request.use(
  (config: any) => {
    if (localStorage.access_token) {
      config.headers.Authorization = `Bearer ${localStorage.access_token}`
    } else {
      config.headers = ''
    }
    return config
  }
)

export default api
