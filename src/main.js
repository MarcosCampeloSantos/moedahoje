import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueMask from 'v-mask'
import VueGoogleCharts from 'vue-google-charts'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueGoogleCharts)
Vue.use(VueMask)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
