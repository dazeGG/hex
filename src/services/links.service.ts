import api from '@/services/api'

export const getStatistics = async (order: string, offset: number, limit: number) => {
  return await api.get('/statistics', { params: { order, offset, limit } })
}
