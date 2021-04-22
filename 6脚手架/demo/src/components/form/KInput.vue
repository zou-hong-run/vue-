<template>
  <div>
    <!--自定义组件双向绑定： :value @input-->
    <!--v-bind="$attrs" 展开-->
    <input :type="type" :value='value' @input="onInput" v-bind="$attrs">
  </div>
</template>

<script>

export default {
  inheritAttrs: false,//集成所有父元素的attr
  props:{
    value:{
      type:String,
      default:''
    },
    type:{
      type:String,
      default:'text'
    }
  },
  methods: {
    onInput(e){
      //派发一个input事件
      this.$emit('input',e.target.value)
      //同时通知父级执行校验
      this.$parent.$emit('validate')
    }
  },
}
</script>
<style scoped>
  
</style>