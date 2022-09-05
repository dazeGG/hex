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
    async register (_: any, { username, password }: { username: string, password: string }) {
      try {
        const res = await register(username, password)
        if (res.status === 200) {
          await router.push({ path: Routes.authorization })
        }
      } catch (e) {
        console.log(e)
      }
    },
    async login ({ commit }: any, payload: { username: string, password: string }) {
      try {
        const res = await login(new URLSearchParams(payload))
        if (res.status === 200) {
          commit('setIsAuth', true)
          localStorage.access_token = res.data.access_token
          await router.push({ path: Routes.links })
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}

export default Auth
