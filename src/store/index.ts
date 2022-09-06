import { createStore } from 'vuex'
import Auth from '@/store/modules/Auth'
import Links from '@/store/modules/Links'

export default createStore({
  state: {
    errors: [],
    successes: [],
    infos: []
  },
  getters: {
    errors: (state: any): string[] => state.errors,
    infos: (state: any): string[] => state.infos,
    successes: (state: any): string[] => state.successes
  },
  mutations: {
    setErrors: (state: any, payload: string[]): void => {
      payload.forEach((error) => state.errors.push(error))
    },
    setSuccesses: (state: any, payload: string[]): void => {
      payload.forEach((success) => state.successes.push(success))
    },
    setInfos: (state: any, payload: string[]): void => {
      payload.forEach((info) => state.infos.push(info))
    }
  },
  actions: {
    removeError: (context: any, { index, timeout = 2000 }: { index: number, timeout: number }): void => {
      setTimeout(() => context.state.errors.splice(index, 1), timeout)
    },
    removeSuccess: (context: any, { index, timeout = 2000 }: { index: number, timeout: number }): void => {
      setTimeout(() => context.state.successes.splice(index, 1), timeout)
    },
    removeInfo: (context: any, { index, timeout = 2000 }: { index: number, timeout: number }): void => {
      setTimeout(() => context.state.infos.splice(index, 1), timeout)
    }
  },
  modules: {
    Auth,
    Links
  }
})
