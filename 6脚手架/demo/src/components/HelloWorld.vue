<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <Form></Form>
  </div>
</template>

<script>
import Form from './form/index'
export default {
  name: 'HelloWorld',
  components:{
    Form
  },
  props: {
    msg: String
  }
}
</script>

<style scoped>


</style>
