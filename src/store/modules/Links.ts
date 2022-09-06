import { getStatistics, squeeze } from '@/services/links.service'

const Links = {
  namespaced: true,
  state: {
    links: []
  },
  getters: {
    links: (state: any) => state.links
  },
  mutations: {
    setLinks (state: any, payload: any) {
      state.links = payload
    }
  },
  actions: {
    async getStatistics ({ commit }: any, { order = 'asc_short', offset = 0, limit = 0 }) {
      try {
        const res = await getStatistics(order, offset, limit)
        commit('setLinks', res.data)
      } catch (e) {
        console.log(e)
      }
    },
    async createLink (_a: any, link: string) {
      try {
        await squeeze(link)
      } catch (e) {
        console.log(e)
      }
    }
  }
}

export default Links
