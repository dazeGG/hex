import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/links'
  },
  {
    path: '/links',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  // {
  //   path: '/register',
  //   name: 'registration',
  //   component: () => import('../views/AuthorizationView/RegistrationView.vue')
  // },
  {
    path: '/auth',
    name: 'authorization',
    component: () => import('../views/AuthorizationView/AuthorizationView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
