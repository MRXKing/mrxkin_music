<template>
  <div class="header">
    <div>
      <img src="~@/assets/logo.png" alt="">
      <span>Mrxkin_music</span>
    </div>
    <div>
      <span class="iconfont vuejs-heng"  @click="min" ></span>
      <span class="iconfont vuejs-juxing" @click="max"></span>
      <span class="iconfont vuejs-close" @click="close"></span>
    </div>
  </div>
</template>

<script>
import window from "@/commonJs/window"

export default {
  methods:{
    min(){
      window(this,'min')
    },
    max(){
      window(this,'max')
    },
    close(){
      window(this,'close')
    }
  }
}
</script>

<style  scoped>
.header
{
  width: 100%;
  height: 2rem;
  line-height: 2rem;
  display: flex;
  -webkit-app-region: drag;
  justify-content:space-between;
  background: rgba(0,0,0,0.5);
  color:#6f6d6d;
}
.header div:last-child span
{
  display: flex;
  width:3vw;
  justify-content: center;
  align-items: center;
  -webkit-app-region: no-drag;
  cursor: pointer;
}
.header div:first-child
{
  margin-left: 1rem;
  overflow-y:hidden;
}
.header div:first-child img
{
  float: left;
  transform:scale(0.8);
}
.header  div:first-child span
{
  font-size: 20px;
  color:#f31f1f;
  margin-left: 0.3rem;
  font-weight: bold;
  font-style: italic;
}
.header div:last-child
{
  display: flex;
}
.header div:last-child span:hover
{
  color:#ccc;
  background: rgba(255,255,255,.2);
}
.header div:last-child span:first-child
{
  margin-top: -0.4rem;
}
</style>
