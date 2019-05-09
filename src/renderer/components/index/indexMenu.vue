<template>
  <div class="menu">
    <span>推荐</span>
    <ul>
      <li><i class="iconfont vuejs-account"></i>发现音乐</li>
      <li><i class="iconfont vuejs-account"></i>私人FM</li>
      <li><i class="iconfont vuejs-account"></i>视频</li>
      <li><i class="iconfont vuejs-account"></i>朋友</li>
    </ul>
    <span>我的音乐</span>
    <ul>
      <li><i class="iconfont vuejs-account"></i>本地音乐</li>
      <li><i class="iconfont vuejs-account"></i>下载管理</li>
      <li><i class="iconfont vuejs-account"></i>我的音乐云盘</li>
      <li><i class="iconfont vuejs-account"></i>我的收藏</li>
    </ul>
    <span>创建的歌单</span>
    <ul>
      <li class="active"><i class="iconfont vuejs-account"></i>我喜欢的音乐</li>
      <li><i class="iconfont vuejs-account"></i>...</li>
      <li><i class="iconfont vuejs-account"></i>...</li>
      <li><i class="iconfont vuejs-account"></i>...</li>
    </ul>
    <span>收藏的歌单</span>
    <ul>
      <li><i class="iconfont vuejs-account"></i>...</li>
      <li><i class="iconfont vuejs-account"></i>...</li>
      <li><i class="iconfont vuejs-account"></i>...</li>
      <li><i class="iconfont vuejs-account"></i>...</li>
    </ul>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.menu
{
  width: 20vw;
  height: 100%;
  overflow-y: scroll;
  padding-bottom: 1rem;
  float: left;
  border-right:1px solid #2f2e2e;
}
.menu::-webkit-scrollbar
{
  width: 0.6rem;
  height: 6rem;
}
.menu::-webkit-scrollbar-thumb
{
  background-color: rgb(47, 49, 52);
  border-radius: 10px;
}
.menu::-webkit-scrollbar-thumb:hover
{
  background-color: rgb(78, 81, 84);
}
.menu *
{
  width: 100%;
  float: left;
  overflow-y:hidden;
}
.menu span
{
  color:#757576;
  padding-left: 1rem;
  margin-top: 1rem;
  cursor:default;
}
.menu ul
{
  margin-top: 1rem;
}
.menu ul li
{
  color:#919396;
  padding-left: 2rem;
  height: 2rem;
  cursor: pointer;
  font-size: 14px;
  line-height: 2rem;
}
.menu ul li:hover
{
  color:#fff;
}
.menu ul li.active
{
  background: rgba(255,255,255,0.08);
  color:#bfbdbd;
  border-left: 0.2rem solid #f00;
}

.menu ul li i
{
  margin-right: 0.4rem;
  float: none;
}


</style>
