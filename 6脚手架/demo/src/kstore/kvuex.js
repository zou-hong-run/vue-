let Vue
class Store{
  constructor(options){
    this._mutations = options.mutations
    this._action = options.actions
    //响应处理state
    // this.state = new Vue({
    //   data(){
    //     return options.state
    //   }
    // })
    this._vm = new Vue({
      data:{
        //加两个$,Vue不做代理
        $$state:options.state
      }
    })

    //绑定commit，dispatch的上下文范文store的实例
    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)
  }
  //存取器
  get state(){
    return this._vm._data.$$state
  }
  set state(v){
    console.log("你有点嚣张"+v)
  }
  //store.commit('add',1)
  //type：mutation的类型
  //payload参数
  commit(type,payload){
    //！！！注意这里是外面调用this的上下文可能会改变，所以需要bindthis
    const entry = this._mutations[type]
    if(entry){
      // console.log(this.state)//this.state是vue对象
      entry(this.state,payload)
    }
  }
  //同上
  dispatch(type,payload){
    const entry = this._action[type]
    if(entry){
      //this是他自己
      entry(this,payload)
    }
  }
}
function install(_Vue){
  Vue = _Vue
  Vue.mixin({
    beforeCreate(){
      if(this.$options.store){
        Vue.prototype.$store = this.$options.store
      }
    }
  });
}
export default{
  Store,
  install
} 