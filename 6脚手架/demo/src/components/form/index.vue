<template>
  <div>
    <KForm :model="userInfo" :rules="rules" ref="loginForm">
      <!--用户名-->
      <KFormItem label='用户名' prop="username">
        <Kinput v-model="userInfo.username" type='text' placeholder="请输入用户名"></Kinput>
      </KFormItem>
      <!--密码-->
      <KFormItem label='密码' prop="password">
        <Kinput v-model="userInfo.password" type='password' placeholder="请输入密码"></Kinput>
      </KFormItem>
      <!--提交表单-->
      <KFormItem>
        <button @click="login">登录</button>
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
  methods: {
    login(){
      this.$refs['loginForm'].validate(valid=>{
        if(valid){
          alert('submit')
        }else{
          alert('error')
          return false
        }
      })
    }
  },
}
</script>
<style scoped>
  
</style>