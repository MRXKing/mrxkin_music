<template>
  <div class="login">
    <img src="~@/assets/2.png" alt="">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/>
  </div>
</template>

<script>
export default {
  
}
</script>

<style >
.login
{
  width: 100%;
  height: auto;
  padding-top:2rem;
}
.login *
{
  margin: 0 auto;
  display: block;
  margin-top: 2rem;
}
.login img
{
  width: 45vw;
  height: 20vw;
}

</style>
