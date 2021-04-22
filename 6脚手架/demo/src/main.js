import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import create from './utils/create'
Vue.config.productionTip = false
//事件总线
Vue.prototype.$bus = new Vue()
Vue.prototype.$create = create
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')