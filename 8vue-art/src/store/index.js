import Vue from "vue";
import Vuex from "vuex";
import permission from "./modules/permission";
import user from "./modules/user";
Vue.use(Vuex);

export default new Vuex.Store({
  // state: {},
  // mutations: {},
  // actions: {},
  modules: {
    permission,
    user,
  },
  // 定义全局的getters
  getters: {
    roles: (state) => state.user.roles,
    permission_routes: (state) => state.permission.routes,
  },
});
