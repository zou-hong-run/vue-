//手写vue
/**
 * KVue:框架函数
 * Observer:执行数据响应化（分辨数据是对象还是数组）
 * Compile:编译模板，初始化视图，收集依赖（更新函数，watcher创建）
 * Watcher:执行更新函数（更新dom）
 * Dep:管理多个Watcher,批量更新
 */

//将单个数据变为响应式
function defineReactive(obj,key,val){
  //做一个递归（如果传递过来的val是一个对象，那么还需要进行遍历，
  //把val对象里面的值也变成响应式的
  observe(val)
  //创建一个Dep和当前key一一对应
  const dep = new Dep()
  //对传入obj进行拦截访问
  Object.defineProperty(obj,key,{
    get(){
      console.log('获取 :'+key)
      //依赖收集发生地
      Dep.target && dep.addDep(Dep.target)
      return val
    },
    set(newVal){
      if(newVal !== val){
        console.log('设置:'+key+'='+newVal)
        // 如果设置的值是一个对象，那么也要将调用该函数将他变为响应式数据
        observe(newVal)
        val = newVal
        //执行更新函数
        // watcher.forEach((w)=>{w.update()})
        dep.notify()
      }
    }
  })
}
//遍历对象中的所有属性，然后都转变为响应式数据
function observe(obj){
  if(typeof obj !== 'object' || obj == null){
    //希望传入的是对象
    return
  }
  //创建Observer实例
  new Observer(obj)
}
//在已经定义好的对象基础上，追加响应式数据
function set(obj,key,val){
  defineReactive(obj,key,val)
}

//代理函数，方便用户直接访问$data中的数据
function porxy(vm,sourceKey){
  Object.keys(vm[sourceKey]).forEach(key=>{
    //往kvue对象身上添加一个新属性，可以修改
    Object.defineProperty(vm,key,{
      get(){
        return vm[sourceKey][key]
      },
      set(newVal){
        //将kvue.$data对象身上的值覆盖，重新做数据响应化
        vm[sourceKey][key] = newVal
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
    //将data里面的数据做响应化处理
    observe(this.$data)
    //做一个代理（将$data值放到kvue身上）
    porxy(this,"$data")
    //创建编译器 解析编译{{}} k-html..........
    new Compile(options.el,this)
  }
}

//根据对象类型，决定如何做何种类型的 响应化
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

//创建观察者(保存更新函数)，值发生变化调用更新函数
// let watcher = []
class Watcher{
  constructor(vm,key,updateFn){
    this.vm = vm 
    this.key = key
    this.updateFn = updateFn
    // watcher.push(this)
    //Dep.target静态属性上设置为当前watcher实例
    Dep.target = this
    this.vm[this.key] //读取触发了getter
    Dep.target = null //收集完就置空 
  }
  update(){
    //改变this
    this.updateFn.call(this.vm,this.vm[this.key])
  }
}

//Dep:依赖，管理某个key相关所有Watcher实例
class Dep{
  constructor(){
    this.deps = []
  }
  addDep(dep){
    this.deps.push(dep)
  }
  notify(){
    this.deps.forEach(dep=>dep.update())
  }
}