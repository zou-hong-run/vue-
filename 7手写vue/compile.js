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
  //统一改变函数
  update(node,exp,dir){
    //初始化
    //指令对应的更新函数xxUpdater
    const fn = this[dir+'Updater']
    fn && fn(node,this.$vm[exp])
    //更新 封装一个更新函数，可以更新对应dom
    new Watcher(this.$vm,exp,function(val){
      fn && fn(node,val)
    })
  } 
}