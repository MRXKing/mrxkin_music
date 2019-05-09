<template>
  <div class="ilove">
    <div class="ilove_top">
      <div class="ilove_top_left">
        <img src="~@/assets/pic.png" alt="">
      </div>
      <div class="ilove_top_right">
        <div class="ilove_top_right_first">
          <div class="ilove_top_right_first_left">
            <p>歌单</p>
            <span>我喜欢的音乐</span>
          </div>
          <div class="ilove_top_right_first_right">
            <span>
              歌曲数<br>2
            </span>
            <p style="display:inline"></p>
            <span>
              播放数<br>0
            </span>
          </div>
        </div>
        <div class="ilove_top_right_second">
          <img src="~@/assets/logo.jpg" alt="">
          <span>{{name}}</span>
        </div>
        <div class="ilove_top_right_third">
          <button type="button" name="button"><i class="iconfont vuejs-account"></i>播放全部</button>
          <button type="button" name="button"><i class="iconfont vuejs-account"></i>收藏(0)</button>
          <button type="button" name="button"><i class="iconfont vuejs-account"></i>分享(0)</button>
          <button type="button" name="button"><i class="iconfont vuejs-account"></i>下载全部</button>
        </div>
      </div>
    </div>
    <div class="ilove_middle">
      <ul>
        <li><span class="actived">歌曲列表</span></li>
        <li><span>评论(0)</span></li>
        <li><span>收藏者</span></li>
      </ul>
      <input type="text" placeholder="搜索歌单音乐">
    </div>
    <div class="ilove_content">
      <table>
        <tr>
          <td style="width:8%;color:transparent" class="border">编号</td>
          <td style="width:8%" class="border">操作</td>
          <td style="width:30%" class="border">音乐标题</td>
          <td style="width:26%;" class="border">歌手</td>
          <td style="width:14%;" class="border">专辑</td>
          <td style="width:14%;" class="border">时长</td>
        </tr>
        <tr v-for="value,index in $store.state.musicData" @click="active($event,index)" @dblclick="getMusic(value.singger,value.title)">
          <td style="width:8%;" >{{value.id}}</td>
          <td style="width:8%" ><i class="iconfont vuejs-account"></i><i class="iconfont vuejs-account"></i></td>
          <td style="width:30%" class="bline">{{value.title}}</td>
          <td style="width:26%;" >{{value.singger}}</td>
          <td style="width:14%;" >{{value.name}}</td>
          <td style="width:14%;" >{{value.time}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      name:''
    }
  },
  methods:{
    active(e,index){
      $('table  tr').removeClass('actives')
      e.currentTarget.className = 'actives';
      this.$store.commit("setMusic",index)
    },
    getMusic(singger,title){
      let audio = document.getElementById('audio')
      audio.src = this.$api.music + `?music_singger=${$.trim(singger)}&music_name=${$.trim(title)}`
      audio.play()
    }
  },
  mounted(){
     this.name = localStorage.user_name;
     this.$http({
       method:'get',
       url:this.$api.list
     }).then(res => {
        this.$store.commit("setMusicData",res.data)
        this.$store.commit("setMusic",0)
        document.getElementById('audio').src =
        this.$api.music + `?music_singger=${$.trim(res.data[0].singger)}&music_name=${$.trim(res.data[0].title)}`
     }).catch(err => {
       console.log(err);
     })
  }
}
</script>

<style  scoped>
.ilove
{
  width: 80vw;
  height:90%;
}
.ilove::-webkit-scrollbar
{
  width: 0.6rem;
  height: 6rem;
}
.ilove::-webkit-scrollbar-thumb
{
  background-color: rgb(47, 49, 52);
  border-radius: 10px;
}
.ilove::-webkit-scrollbar-thumb:hover
{
  background-color: rgb(78, 81, 84);
}

.ilove_top
{
  width: 100%;
  padding: 2rem;
  height: 45vh;
}
.ilove_top_left
{
  margin-right: 1rem;
  float: left;
}
.ilove_top_right_first
{
  width: 100%;
  height: 2.5rem;
  display: flex;
  justify-content: space-between;
}
.ilove_top_right_first_left,.ilove_top_right_first_right
{
  display: flex;
  justify-content: flex-start;
}
.ilove_top_right_first_left span
{
  font-size: 25px;
  color:#fff;
}
.ilove_top_right_first_left p
{
  border: 1px solid #f00;
  color:#f00;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  transform: scale(0.8);
  height: 2rem;
  border-radius: 4px;
}
.ilove_top_right_first_right {
  color:#4e4e4e;
}
.ilove_top_right_first_right *
{
  transform: scale(0.8);
}
.ilove_top_right_first_right p {
   border-right: 1px solid #4e4e4e;
   margin:0 2rem;
}
.ilove_top_right_second img
{
  float: left;
  transform: scale(0.8);
  width: 40px;
  height: 40px;
  margin-right: 0.5rem;
  border-radius: 20px;
}
.ilove_top_right_second span
{
  color:#c5c0c0;
  padding-top: 0.7rem;
  float: left;
}
.ilove_top_right_third
{
  height: 4rem;
  padding: 1rem 0;
}
.ilove_top_right_third button
{
  height: 2rem;
  cursor: pointer;
  outline: none;
  width: 10vw;
  border: none;
  margin-right: 1rem;
  background: #25272b;
  color:#fff;
  border-radius: 5px;
}
.ilove_top_right_third button i
{
  margin-right: 0.5rem;
}
.ilove_top_right_third button:first-child
{
  background-color: #b82525;
}
.ilove_middle
{
  display: flex;
  width: 100%;
  padding: 0 2rem 0 4em;
  margin-bottom: 0.5rem;
  justify-content: space-between;
}
.ilove_middle ul
{
  display: flex;
}
.ilove_middle ul li
{
  height: 1.5rem;
  width: 10vw;
  color:#fff;
  cursor: pointer;
  font-size: 14px;
}
.ilove_middle ul li span.actived
{
  border-bottom: 4px solid #9a0b0b;
  color:#af1414;
  padding-bottom: 0.2rem;
}
.ilove_middle  input[type='text']
{
  background: #202226;
  border: none;
  color:#fff;
  padding-left:1rem;
  border-radius:10px;
  outline: inherit;
}
.ilove_content table
{
  width: 100%;
  color:#8e8e8e;
}
.ilove_content tr
{
  display: flex;
}
.ilove_content tr td
{
  display: flex;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 14px;
  height: 1.5rem;
  padding-left: 0.5rem;
}
.border
{
  border-top: 1px solid #2b2a2a;
  border-bottom: 1px solid #2b2a2a;
  border-left: 1px solid #2b2a2a;
}
.ilove_content tr:nth-child(2n+3)
{
  background: #1a1c20;
}
.ilove_content tr:nth-child(n+2)
{
  cursor: pointer;
}
.ilove_content tr:nth-child(n+2) td:first-child
{
  display: flex;
  justify-content: center;
  align-items: center;
}
.ilove_content tr:nth-child(n+2):hover
{
  background:rgba(255,255,255,0.1);
  color: #fff;
}
.bline
{
  color:#fff;
}
.actives
{
  background-color:#2c2e32!important;
  color:#fff;
}
</style>
