<template>
  <div id="wrapper">
    <loginHeader />
    <loginContent/>
  </div>
</template>

<script>
import loginHeader from './login/loginHeader'
import loginContent from './login/loginContent'
  export default {
    components:{
      loginHeader,loginContent
    },
    mounted(){
      this.$router.push({path:'/login'})
    }
  }
</script>

<style scoped>
  #wrapper {
    height: 100%;
    width: 100%;
    background: url('~@/assets/bg.jpg') no-repeat;
    background-size: cover;
    background-attachment: fixed;
    background-position: center;
  }
</style>
