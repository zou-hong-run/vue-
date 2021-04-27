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
  //创建一个Dep和当前key一一对应 Dep:管理多个Watcher,批量更新
  const dep = new Dep()
  //对传入obj进行拦截访问
  Object.defineProperty(obj,key,{
    get(){
      console.log('获取 :'+key)
      //依赖收集发生地 使用一个变量就加一个 Watcher到 Dep
      Dep.target && dep.addDep(Dep.target)
      return val
    },
    set(newVal){
      if(newVal !== val){
        console.log('设置:'+key+'='+newVal)
        // 如果设置的值是一个对象，那么也要将调用该函数将他变为响应式数据
        observe(newVal)
        val = newVal
        //执行更新函数 遍历所有watcher然后执行watcher里面的更新函数
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
//编译模板中vue模板特殊语法，初始化视图，更新视图

//递归遍历dom树
//判断节点类型，如果是文本，则判断是否是插值绑定
//如果是元素，则遍历其”属性“判断是否是指令或事件，然后递归子元素
class Compile{
  //el宿主元素 vm是KVue实例
  constructor(el,vm){
    this.$vm = vm 
    this.$el = document.querySelector(el)
    if(this.$el){
      //执行编译
      this.compile(this.$el)
    }
  } 
  compile(el){
    //遍历el树 拿到el里面的所有孩纸
    const childNodes = el.childNodes

    Array.from(childNodes).forEach(node=>{
      //判断是否是元素
      if(this.isElement(node)){
        // console.log('编译元素'+node.nodeName)
        this.compileElement(node)
      }else if(this.isInter(node)){
        // {{console.log('编译插值绑定'+node.textContent)}}
        this.compileText(node)
      }else{  
        console.log('编译其他元素start=======================')
        console.log(node)
        console.log('编译其他元素end=========================')
      }
      //递归子节点
      if(node.childNodes&&node.childNodes.length>0){
        this.compile(node)
      }
    })
  }
  //判断是否是元素
  isElement(node){
    return node.nodeType === 1
  }
  //判断元素或属性中的文本是否包含{{}}
  isInter(node){
    //代表nodeType=3代表元素或属性中的文本内容
    //首先是文本标签，其次内容是{{xxx}}
    return node.nodeType ===3 && /\{\{(.*)\}\}/.test(node.textContent)
  }
  //编译插值语法里面的变量
  compileText(node){
    // this.$vm[RegExp.$1]之所以可以获取是因为上有代理将数据绑定到Kvue身上了
    // node.textContent = this.$vm[RegExp.$1]
    this.update(node,RegExp.$1,'text')
  }
  //编译节点
  //当前节点是元素
  compileElement(node){
    //      遍历获取元素的所有属性
    const nodeAttrs = node.attributes
    Array.from(nodeAttrs).forEach(attr=>{
      //规定：指令以k-xx="00"定义
      const attrName = attr.name // k-xx
      const exp = attr.value // oo
      if(this.isDirective(attrName)){
        const dir = attrName.substring(2) //xx
        //执行指令
        this[dir] && this[dir](node,exp)
      }
    })
  }
  //判断是否是指令，去除其他的东西 比如value='123'
  isDirective(attr){
    return attr.indexOf('k-') === 0
  }
  // k-text
  text(node,exp){
    // node.textContent = this.$vm[exp]
    this.update(node,exp,'text')
  } 
  //k-html
  html(node,exp){
    // node.innerHTML = this.$vm[exp]
    this.update(node,exp,'html')
  }
  //指令对应函数
  textUpdater(node,value){
    node.textContent = value
  }
  htmlUpdater(node,value){
    node.innerHTML = value
  }
  //统一改变函数 改变就创建一个watcher
  update(node,exp,dir){
    //初始化
    //指令对应的更新函数xxUpdater
    const fn = this[dir+'Updater']
    //这里初次将{{变量}}转化为 视图上面的值
    fn && fn(node,this.$vm[exp])

    //更新 封装一个更新函数，可以更新对应dom
    new Watcher(this.$vm,exp,function(val){
      //将更新后的变量 更新到视图
      fn && fn(node,val)
    })
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
  //key 表示 {{key}} k-html="key"
  constructor(vm,key,updateFn){
    this.vm = vm 
    this.key = key
    //用于更新 key
    this.updateFn = updateFn
    // watcher.push(this)
    //Dep.target静态属性上设置为当前watcher实例
    Dep.target = this
    this.vm[this.key] //读取触发了getter 然后将watcher添加到Dep当中
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