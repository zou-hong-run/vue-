<template>
  <div>
    <label :style="{fontSize:20+'px',color:'blue'}" v-if="label">{{label}}</label>
    <slot></slot>
    <p v-if="error">{{error}}</p>
  </div>
</template>

<script>
import Schema from 'async-validator'
export default {
  inject:['form'],//接收KForm拿到他身上的 rules 和 input的value
  props:{
    label:{
      type:String,
      default:''
    },
    prop:{
      type:String
    }
  },
  data () {
    return {
      error:''//说明校验没通过
    }
  },
  methods: {
    //验证Kinput输入内容
    validate(){
      //规则
      const rules = this.form.rules[this.prop]
      //当前值
      const value = this.form.model[this.prop]
      //校验描述对象
      const desc = {[this.prop]:rules}
      //创建Schema实例
      const schema = new Schema(desc)
      return schema.validate({[this.prop]:value},errors=>{
        if(errors){
          this.error = errors[0].message
        }else{
          //校验通过
          this.error =''
        }
      })
    }
  },
  mounted() {
    this.$on('validate',()=>{
      this.validate()
    })
  },
}
</script>
<style scoped>
  
</style>