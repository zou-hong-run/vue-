//响应式

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
  // Object.keys返回一个所有元素为字符串的数组，
  // 其元素来源于从给定的object上面可以直接枚举的属性
  Object.keys(obj).forEach(key=>{
    defineReactive(obj,key,obj[key])
  })
}
function set(obj,key,val){
  defineReactive(obj,key,val)
}
const obj = {foo:'foo',bar:'bar',baz:{a:1}}
//遍历做响应化处理
observe(obj)
// obj.baz={b:2}
// console.log(obj.baz.b=3)
// obj.c = 'c'
set(obj,'c','c++')
obj.c='c--'