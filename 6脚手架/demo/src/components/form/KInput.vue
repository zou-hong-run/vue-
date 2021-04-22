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
      this.$emit('input',e.target.value)//双向绑定的数据，发送给index.vue 然后传递到Kform  然后 传递 到 KFromItem(form)
      //同时通知父级执行校验
      this.$parent.$emit('validate')//触发验证事件
    }
  },
}
</script>
<style scoped>
  
</style>