<template>
  <div>
    <label :style="{fontSize:20+'px',color:'blue'}" v-if="label">{{label}}</label>
    <slot></slot>
    <p v-if="error">{{error}}</p>
    <p>{{form.rules}}</p>
  </div>
</template>

<script>
export default {
  inject:['form'],
  props:{
    label:{
      type:String,
      default:''
    }
  },
  data () {
    return {
      error:''//说明校验没通过
    }
  },
  methods: {
  }
}
</script>
<style scoped>
  
</style>