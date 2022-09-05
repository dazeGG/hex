import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Routes from '@/router/Routes'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/links'
  },
  {
    path: Routes.home,
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: Routes.registration,
    name: 'registration',
    component: () => import('../views/RegistrationView.vue')
  },
  {
    path: Routes.authorization,
    name: 'authorization',
    component: () => import('../views/AuthorizationView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
