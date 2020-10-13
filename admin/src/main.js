import './plugins/element.js'
import Vue from 'vue'
import App from './App.vue'

import router from './router'
import http from './http.js'


import './upload.css'
Vue.config.productionTip = false
Vue.prototype.$http = http


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')