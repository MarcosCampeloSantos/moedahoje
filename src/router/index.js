import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/bitcoinhoje',
    name: 'BTC Hoje | MoedaHoje',
    component: () => import('../views/bitcoin.vue'),
  },
  {
    path: '/',
    name: 'MoedaHoje',
    component: () => import('../views/home.vue'),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.name
  next()
})

export default router
