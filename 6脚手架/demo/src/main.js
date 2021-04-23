import Vue from 'vue'
import App from './App.vue'
// import router from './router'
//引入自己写的krouter
import router from './krouter'
import store from './store'
//提示组件
import create from './utils/create'
Vue.config.productionTip = false
//事件总线
Vue.prototype.$bus = new Vue()
// Vue.prototype.$create = create
//弹窗组件
Vue.use(create)
//3挂载router实例
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')