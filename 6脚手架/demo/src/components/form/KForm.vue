<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  provide(){
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
  },
}
</script>
<style scoped>
  
</style>