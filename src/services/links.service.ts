import api from '@/services/api'

export const getStatistics = async (order: string, offset: number, limit: number): Promise<any> => {
  return await api.get('/statistics', { params: { order, offset, limit } })
}

export const squeeze = async (link: string): Promise<any> => {
  return await api.post('/squeeze', {}, { params: { link } })
}
