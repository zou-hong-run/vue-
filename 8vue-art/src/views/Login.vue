<template>
  <div>
    <h2>login</h2>
    <div>
      <input type="text" v-model="username" />
      <button @click="login">login</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: "admin",
    };
  },
  methods: {
    login() {
      // 派发一个登录的动作
      this.$store
      .dispatch("user/login", { username: this.username })
      .then(()=>{
        this.$router.push({
          path:this.$route.query.redirect || "/"
        })
      })
      .catch(error=>{
        alert(error)
      })
    },
  },
};
</script>
