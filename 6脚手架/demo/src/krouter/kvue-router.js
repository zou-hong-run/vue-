let Vue;

//1实现一个插件，挂载$router
class KVueRouter{
  constructor(options){
    this.$options = options
    //需要创建响应式的current属性
    //利用vue提供的defineReactive做相应
    //这样将来current变化的时候，依赖的组件会重新render
    Vue.util.defineReactive(this,'current','/')
    // this.current = '/'
    //监控url变化
    window.addEventListener('hashchange',this.onHashChange.bind(this))
    window.addEventListener('load',this.onHashChange.bind(this))
    //创建一个路由映射表
    // this.routeMap ={}
    // options.routes.forEach(route=>{
    //   this.routeMap[route.path] = route
    // })
  }
  onHashChange(){
      this.current = window.location.hash.slice(1)
  }
}
KVueRouter.install = function(_Vue){
  //保存构造函数，在KVueRouter里面使用
  Vue = _Vue
  //挂载$router

  //怎么获取根实例中的router选项
  Vue.mixin({//页面beforeCreate时候才创建
    beforeCreate(){
      //这里可以拿到所有组件实例
      //确保根实例的时候才创建
      if(this.$options.router){
        Vue.prototype.$router = this.$options.router
      }
    }
  })
  //实现两个全局组件
  Vue.component('router-link',{
    props:{
      to:{
        type:String,
        required:true
      }
    },
    render(h){
      return h('a',{attrs:{href:'#'+this.to}},this.$slots.default)
    }
  })
  Vue.component('router-view',{
    render(h){
      // 获取path对应的component
      let component = null
      this.$router.$options.routes.forEach((route)=>{
        if(route.path === this.$router.current){
          component = route.component
        }
      })
      // const {routeMap,current} = this.$router
      // // let component = null || null
      // let component = routeMap[current].component
      // console.log(component)
      // if(typeof component == 'function'){
      //   console.log('object')
      // }
      return h(component)
    }
  })
}
export default KVueRouter