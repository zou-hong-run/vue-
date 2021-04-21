<template>
  <div class="about">
    <test></test>
  </div>
</template>
<script>
import test from '@/components/test'
export default {
  name:'about',//keep alive使用
  components:{
    test
  }
}
</script>