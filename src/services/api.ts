import axios from 'axios'

const api = axios.create({ baseURL: process.env.VUE_APP_API_URI })

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
