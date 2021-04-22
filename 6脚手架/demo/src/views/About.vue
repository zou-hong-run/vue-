<template>
  <div class="about">
    <test :foo='a'></test>
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
  data () {
    return {
      a:123
    }
  },
  methods: {
    changeLogin(){
      this.$store.commit('isLogin')
    }
  },
}
</script>