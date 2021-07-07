import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import store from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://localhost:3000/'

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
