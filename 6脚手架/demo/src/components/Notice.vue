<template>
  <div class="h" v-if="isShow">
    <h3>{{title}}</h3>
    <p>{{message}}</p>
  </div>
</template>
<script>
export default {
  props:{
    title:{
      type:String,
      default:''
    },
    message:{
      type:String,
      default:''
    },
    duration:{
      type:Number,
    }
  },
  data () {
    return {
      isShow:false
    }
  },
  methods: {
    show(){
      this.isShow = true
      setTimeout(this.hide,this.duration)
    },
    hide(){
      this.isShow = false
      //清除自己
      this.remove()
    }
  },
}
</script>
<style>
  .h{
    width: 200px;
    height: 200px;
    background: yellow;
    position: absolute;
    top:0;
  }
</style>