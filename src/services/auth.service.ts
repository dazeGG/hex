import api from '@/services/api'

export const register = async (username: string, password: string) => {
  return await api.post('/register', {}, { params: { username, password } })
}

export const login = async (data: URLSearchParams) => {
  return await api.post('/login', data)
}
