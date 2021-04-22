<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  provide(){//让其他组件能够使用，index.vue传递过来的props
    return{
      form:this
    }
  },
  props:{
    model:{//父组件给的数据
      type:Object,
      required:true
    },
    rules:{
      type:Object
    }
  },
  methods: {
    //统一验证
    validate(cb){
      //获取所有的孩子KFormItem
      const tasks = this.$children
      .filter(item=>item.prop)
      .map(item=>item.validate())
      //统一处理错误
      Promise.all(tasks)
      .then(()=>{
        cb(true)
      })
      .catch(()=>{
        cb(false)
      })
    }
  },
}
</script>
<style scoped>
  
</style>