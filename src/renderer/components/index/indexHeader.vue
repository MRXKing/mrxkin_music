<template>
  <div class="header">
    <div class="first">
      <img src="~@/assets/logo.png" alt="">
      <span style="float:left">Mrxkin_music</span>
      <input type="text" placeholder="搜索音乐、视频、歌词、电台">
    </div>
    <div class="last">
      <div>
          <img src="~@/assets/logo.jpg" alt="">
          <span>{{name}}</span>
          <span style="cursor:pointer" @click="loginout"><i class="iconfont vuejs-account"></i></span>
      </div>
      <p style="width:0.1rem;height:100%;margin:0 1rem 0 1.5rem;">
        <span style="border-right:1px solid rgba(119, 119, 119, 0.7);"></span>
      </p>
      <div>
        <span class="iconfont vuejs-heng"  @click="min" ></span>
        <span class="iconfont vuejs-juxing" @click="max"></span>
        <span class="iconfont vuejs-close" @click="close"></span>
      </div>
    </div>
  </div>
</template>

<script>
import window from "@/commonJs/window"

export default {
  data(){
    return{
      name:''
    }
  },
  methods:{
    min(){
      window(this,'min')
    },
    max(){
      window(this,'max')
    },
    close(){
      window(this,'close')
    },
    loginout(){
       localStorage.clear();
       this.$router.push({path:'/'})
    }
  },
  created(){
     this.name = localStorage.user_name
  }
}
</script>

<style lang="css" scoped>
input[type='text']
{
    background: #161618;
    border: none;
    padding: 0.8rem;
    outline: inherit;
    color:#fff;
    height: 1.5rem;
    margin-left: 3rem;
    border-radius: 2rem;
}
.header
{
  width: 100%;
  height: 2.5rem;
  line-height: 2.5rem;
  display: flex;
  -webkit-app-region: drag;
  justify-content:space-between;
  background: #212124;
  color:#6f6d6d;
}
.header div.first
{
  margin-left: 1rem;
  overflow-y:hidden;
}
.header div.first img
{
  float: left;
  transform: scale(0.8);
}
.header  div.first span
{
  font-size: 20px;
  color:#f31f1f;
  margin-left: 0.3rem;
  cursor: default;
  font-weight: bold;
  font-style: italic;
}
.header div.last, .header div.last div
{
  display: flex;
  overflow-y: hidden;
}
.header div.last div:first-child {
  overflow-x:visible!important;
  color:#c1c1c1;
}
.header div.last div:first-child span:last-child
{
  margin-left: 1rem;
}
.header div.last div:first-child img {
  width: 40px;
  height: 40px;
  transform: scale(0.8);
  border-radius: 40px;
  margin-right: 0.5rem;
}
.header div.last div:first-child img , .header div.last div:first-child span{
  overflow-x:visible!important;
}
.header div.last div:last-child span:hover
{
  color:#ccc;
  background: rgba(255,255,255,.2);
}
.header div.last div:last-child span
{
  display: flex;
  width:3vw;
  justify-content: center;
  align-items: center;
  -webkit-app-region: no-drag;
  cursor: pointer;
}
.header div.last div:last-child span:first-child
{
  margin-top: -0.4rem;
}
</style>
