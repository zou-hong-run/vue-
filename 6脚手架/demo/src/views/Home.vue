<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Form></Form>
    {{$store.state.isLogin+"0"+123}}
    <button @click="$store.commit('isLogin')">change</button>
    <button @click="$store.dispatch('add')">change1</button>
  </div>
</template>

<script>
// @ is an alias to /src
import Form from '../components/form'
export default {
  name: 'Home',
  components: {
    Form
  },
  created() {
    this.$store.state = {}//修改就报错
  },
}
</script>
