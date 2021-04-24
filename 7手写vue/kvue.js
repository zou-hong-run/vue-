//手写vue
/**
 * KVue:框架函数
 * Observer:执行数据响应化（分辨数据是对象还是数组）
 * Compile:编译模板，初始化视图，收集依赖（更新函数，watcher创建）
 * Watcher:执行更新函数（更新dom）
 * Dep:管理多个Watcher,批量更新
 */
 function defineReactive(obj,key,val){
  //做一个递归
  observe(val)
  //对传入obj进行拦截访问
  Object.defineProperty(obj,key,{
    get(){
      console.log('get:'+key)
      return val
    },
    set(newVal){
      if(newVal !== val){
        console.log('set:'+key+'='+newVal)
        // 如果传递过来的新值，是一个对象那么也要将它作为响应式数据
        observe(newVal)
        val = newVal
      }
    }
  })
}
//把对象中所有属性都设置为响应式
function observe(obj){
  if(typeof obj !== 'object' || obj == null){
    //希望传入的是对象
    return
  }
  //创建Observer实例
  new Observer(obj)
}
function set(obj,key,val){
  defineReactive(obj,key,val)
}

//代理函数，方便用户直接访问$data中的数据
function porxy(vm,sourceKey){
  Object.keys(vm[sourceKey]).forEach(key=>{
    //往kvue对象身上添加定义一个新属性，可以修改
    Object.defineProperty(vm,key,{
      get(){
        return vm[sourceKey][key]
      },
      set(newVal){
        //将kvue.$data对象身上的值覆盖，重新做数据响应化
        vm.sourceKey[key] = newVal
      }
    })
  })
}

//创建kvue的构造函数
class KVue{
  constructor(options){
    //保存选项
    this.$options = options
    this.$data = options.data
    //响应化处理
    // console.log(this)
    observe(this.$data)
    // //做一个代理（将$data值放到kvue身上）
    porxy(this,"$data")
  }
}
//根据对象类型觉得如何做响应化
class Observer{
  constructor(value){
    this.value = value
    //判断其类型
    if(typeof value === 'object'){
      this.walk(value)
    }
  }
  //对象数据的响应化
  walk(obj){
    // Object.keys返回一个所有元素为字符串的数组，
    // 其元素来源于从给定的object上面可以直接枚举的属性
    Object.keys(obj).forEach(key=>{
      defineReactive(obj,key,obj[key])
    })
  }
  //数组数据响应化，。。。

}

