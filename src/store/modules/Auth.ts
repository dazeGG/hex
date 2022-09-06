import { register, login } from '@/services/auth.service'
import router from '@/router'
import Routes from '@/router/Routes'

const Auth = {
  namespaced: true,
  state: {
    isAuth: false
  },
  getters: {
    isAuth: (state: any) => state.isAuth
  },
  mutations: {
    setIsAuth (state: any, payload: boolean) {
      state.isAuth = payload
    }
  },
  actions: {
    initAuth ({ commit }: any) {
      if (localStorage.access_token) {
        commit('setIsAuth', true)
      }
    },
    async register ({ commit }: any, {
      username,
      password
    }: { username: string, password: string }) {
      try {
        await register(username, password)
        await router.push({ path: Routes.authorization })
      } catch (e: any) {
        commit('setErrors', [e.response.data.detail], { root: true })
      }
    },
    async login ({ commit }: any, payload: { username: string, password: string }) {
      try {
        const res = await login(new URLSearchParams(payload))
        commit('setIsAuth', true)
        localStorage.access_token = res.data.access_token
        await router.push({ path: Routes.links })
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

export default Auth
