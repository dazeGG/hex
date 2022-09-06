import { getStatistics, squeeze } from '@/services/links.service'

const Links = {
  namespaced: true,
  state: {
    links: [],
    linksCount: 0
  },
  getters: {
    links: (state: any) => state.links,
    linksCount: (state: any) => state.linksCount
  },
  mutations: {
    setLinks (state: any, payload: any) {
      state.links = payload
    },
    setLinksCount (state: any, payload: any) {
      state.linksCount = payload
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
    async getLinksCount ({ commit }: any) {
      try {
        const res = await getStatistics('asc_short', 0, 0)
        commit('setLinksCount', res.data.length)
      } catch (e) {
        console.log(e)
      }
    },
    async createLink ({ commit }: any, link: string) {
      try {
        await squeeze(link)
      } catch (e: any) {
        switch (e.response.status) {
          case 400:
            commit('setErrors', [e.response.data.detail], { root: true })
            break
          case 422:
            commit('setErrors', e.response.data.detail.map((item: any) => `${item.loc[1]}: ${item.msg}`), { root: true })
        }
      }
    }
  }
}

export default Links
