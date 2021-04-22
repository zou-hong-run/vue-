<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Form></Form>
  </div>
</template>

<script>
// @ is an alias to /src
import Form from '../components/form'
export default {
  name: 'Home',
  components: {
    Form
  }
}
</script>
