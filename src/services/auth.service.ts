import api from '@/services/api'

export const register = async (username: string, password: string): Promise<any> => {
  return await api.post('/register', {}, { params: { username, password } })
}

export const login = async (data: URLSearchParams): Promise<any> => {
  return await api.post('/login', data)
}
