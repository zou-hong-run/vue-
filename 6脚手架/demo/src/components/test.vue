<template>
  <div>
    <h1 :class="$style.red">{{data}}</h1>
    
    {{$attrs.foo}}
  </div>
</template>
<script>
export default {
  data () {
    return {
      data:'123'
    }
  }
}
</script>
<style scoped>
h1{
 color:yellow;
}
</style>
<style module>
  .red{
   color: red !important;
  }
</style>