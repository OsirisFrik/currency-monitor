import Vue from 'vue'
import AsyncComputed from 'vue-async-computed'
import Vuelidate from 'vuelidate'
import Buefy from 'buefy'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import 'buefy/dist/buefy.css'
import 'remixicon/fonts/remixicon.css'
import '@mdi/font/css/materialdesignicons.css'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(Buefy)
Vue.use(AsyncComputed)
Vue.use(Vuelidate)

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
