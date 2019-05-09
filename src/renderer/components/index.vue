<template>
  <div id="wrapper">
    <indexHeader />
    <div class="content">
      <indexMenu />
      <router-view />
      <indexListen />
    </div>
  </div>
</template>

<script>
import indexHeader from './index/indexHeader'
import indexMenu from './index/indexMenu'
import indexListen from './index/indexListen'
  export default {
    data() {
      return{

      }
    },
    components:{
      indexHeader,indexMenu,indexListen
    },
    mounted(){
      this.$router.push({path:'/index/ilove'})
    }
  }
</script>

<style scoped>
  #wrapper {
    height: 100%;
    width: 100%;
    overflow-y: hidden;
  }
  .content {
    width: 100%;
    height: 100%;
    border-top: 2px solid #6b1313;
    background: #16181c;
  }
</style>
