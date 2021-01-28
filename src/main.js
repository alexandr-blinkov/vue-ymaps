import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from "./plugins/vuetify"
import '@mdi/font/css/materialdesignicons.css'
import dateFilter from './filters/date-filter'

Vue.config.productionTip = false

Vue.use(vuetify, {
  context: {
    vuetify,
  },
  iconfont: 'mdi'
});

Vue.filter('date', dateFilter)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
