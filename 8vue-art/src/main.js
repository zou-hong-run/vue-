import Vue from "vue";
import "./icons/index.js";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
// 全局的守卫
import "./permission.js";
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
