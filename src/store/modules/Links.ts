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
