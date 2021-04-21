import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin:"'false'"
  },
  mutations: {
    //变更状态state
    isLogin(state){
      state.isLogin ='true'
    }
  },
  actions: {
    //action类似于mutation，不同在于
    //action提交的是mutation，而不是直接变更状态
    //action可以包含任意异步操作
    
  },
  modules: {
  }
})
