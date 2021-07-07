import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from './components/auth/dashboard.vue'
import Login from './components/auth/login.vue'

Vue.use(VueRouter)

var accessToken = localStorage.getItem('token')

const routes = [{
    path: '/',
    component: Dashboard,
    beforeEnter(to, from, next) {
      if (accessToken) {
        next()
      } else {
        next('/signin')
      }
    }
  },
  {
    path: '/signin',
    component: Login
  },
  {
    path: '/dashboard',
    component: Dashboard
  }
]

export default new VueRouter({
  mode: 'history',
  routes
})