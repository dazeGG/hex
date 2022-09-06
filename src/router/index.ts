import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Routes from '@/router/Routes'
import store from '@/store'

const routes: Array<RouteRecordRaw> = [
  {
    path: Routes.home,
    name: 'home',
    meta: {
      needAuth: false,
      disabledToAuth: true
    },
    component: () => import('../views/HomeView.vue')
  },
  {
    path: Routes.links,
    name: 'links',
    meta: {
      needAuth: true,
      disabledToAuth: false
    },
    component: () => import('../views/LinksView.vue')
  },
  {
    path: Routes.registration,
    name: 'registration',
    meta: {
      needAuth: false,
      disabledToAuth: true
    },
    component: () => import('../views/RegistrationView.vue')
  },
  {
    path: Routes.authorization,
    name: 'authorization',
    meta: {
      needAuth: false,
      disabledToAuth: true
    },
    component: () => import('../views/AuthorizationView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.VUE_APP_BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  await store.dispatch('Auth/initAuth', {}, { root: true })
    .then(() => {
      if (store.getters['Auth/isAuth']) {
        if (to.meta.disabledToAuth) {
          next({ path: Routes.links })
        }
        next()
      } else {
        if (to.meta.needAuth) {
          next({ path: Routes.home })
        } else next()
      }
    })
})

export default router
