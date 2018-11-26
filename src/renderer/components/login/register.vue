<template>
  <div>
    <p class="wel">Register!</p>
    <div class="line">
      <input type="text" v-model.trim="user_id" placeholder="请输入账号" @keyup.enter="register">
      <input type="password" v-model.trim="pwd" placeholder="请输入密码" class="pwd" @keyup.enter="register">
      <span class="first"></span>
      <span class="last"></span>
      <div>
        <button type="button" name="button" style="display:inline-block" @click="register">注册</button>
        <button type="button" name="button" style="display:inline-block" @click="goBack">返回</button>
      </div>
      <p>{{result}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      user_id:'',
      pwd:'',
      result:''
    }
  },
  methods:{
    goBack(){
      this.$router.push({path:'login'})
    },
    register(){
      if (!this.user_id || !this.pwd) {
         this.result = '账号或密码不能为空'
         return
      }
      this.$http({
        method:'post',
        url:this.$api.register,
        data:{
          user_id:this.user_id,
          pwd:this.pwd
        }
      }).then(res => {
         this.result = res.data.msg
         this.$route.meta.keepAlive = false;
      }).catch(err => {
         this.result = err.response.data.msg
      })
    }
  }
}
</script>

<style  scoped>
 div input[type='text']
{
  width: 100%;
  border:none;
  border-bottom:1px solid rgba(32, 255, 234, 0.5);
  outline: inherit;
  color:#fff;
  background-color: transparent;
}
 div input[type='text']::placeholder
{
  color:rgba(255,255,255,0.6);
}
 div input[type='text']:focus
{
  border-bottom: 1px solid rgba(32, 255, 234, 0);
}
 div input[type='text']:first-child:focus ~ .first
{
  width: 100%;
  background-color: rgba(32, 255, 234, 1);
  height: 0.05rem;
}
div input[type='password']
{
 width: 100%;
 border:none;
 border-bottom:1px solid rgba(32, 255, 234, 0.5);
 outline: inherit;
 color:#fff;
 background-color: transparent;
}
div input[type='password']::placeholder
{
 color:rgba(255,255,255,0.6);
}
div input[type='password']:focus
{
 border-bottom: 1px solid rgba(32, 255, 234, 0);
}
div input[type='password']:first-child:focus ~ .first
{
 width: 100%;
 background-color: rgba(32, 255, 234, 1);
 height: 0.05rem;
}
 div .pwd:focus ~ .last
{
  width: 100%;
  background-color:rgba(32, 255, 234, 1);
  height: 0.05rem;
}

.wel
{
  text-align: center;
  color:#34f4fd;
  font-size: 2rem;
}
 div
{
  width: 25vw;
  color:#fff;
  margin-top:0rem!important;
  position: relative;
}
 .line .first{
  position: absolute;
  top:1rem;
  transition: all 0.5s;
  width: 0%;
  left:50%;
  height: 0.05rem;
  transform: translateX(-50%);
  background-color: rgba(32, 255, 234, 1);
}
 .line .last{
  position: absolute;
  top:4rem;
  transition: all 0.5s;
  width: 0%;
  left: 50%;
  transform: translateX(-50%);
  height: 0.05rem;
  background-color:rgba(32, 255, 234, 1);
}
 .line div
{
  display: flex;
  justify-content: space-around;
}
 .line div button
{
  width: 40%;
  height: 2rem;
  border-radius: 1rem;
  border: none;
  color:#fff;
  background-color: #1baf9b;
  outline: none;
  cursor: pointer;
}


</style>
