<template>
  <div class="about">
    <test></test>
    <hr>
    <h3>{{$store.state.isLogin}}</h3>
    <button @click="changeLogin">切换状态</button>
  </div>
</template>
<script>
import test from '@/components/test'
export default {
  name:'about',//keep alive使用
  components:{
    test
  },
  methods: {
    changeLogin(){
      this.$store.commit('isLogin')
    }
  },
}
</script>