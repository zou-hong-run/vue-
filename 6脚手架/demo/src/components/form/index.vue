<template>
  <div>
    <KForm :model="userInfo" :rules="rules">
      <!--用户名-->
      <KFormItem label='用户名'>
        <Kinput v-model="userInfo.username" type='text' placeholder="请输入用户名"></Kinput>
      </KFormItem>
      <!--密码-->
      <KFormItem label='密码'>
        <Kinput v-model="userInfo.password" type='password' placeholder="请输入密码"></Kinput>
      </KFormItem>
    </KForm>
  </div>
</template>

<script>
import KFormItem from '../form/KFormItem'
import Kinput from '../form/KInput'
import KForm from '../form/KForm'
export default {
  components:{
    Kinput,
    KFormItem,
    KForm 
  },
  data () {
    return {
      userInfo:{
        username:'',
        password:''
      },
      rules:{
        username:[{required:true,message:'请输入用户名'}],
        password:[{required:true,message:'请输入密码'}]
      }
    }
  },
}
</script>
<style scoped>
  
</style>