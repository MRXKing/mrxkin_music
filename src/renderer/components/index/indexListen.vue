<template>
  <div class="footer">
    <div class="action">
      <span><i class="iconfont vuejs-shangyige jiantou" @click="previous"></i></span>
      <span class="control"><i class="iconfont vuejs-zanting1" @click="action"></i></span>
      <span><i class="iconfont vuejs-xiayige jiantou" @click="next"></i></span>
    </div>
    <div class="music_control">
      <div class="music_time">
        <span id="tou">00:00</span>
        <div  id="audioControls">
  			     <div id="progress"></div>
  			     <p id="button"></p>
		    </div>
        <span id="wei">00:00</span>
      </div>
      <div class="music_voice">
        <i class="iconfont vuejs-account"></i>
        <input type="range"  id="voice" value="1">
      </div>
      <div class="music_mode">
        <i class="iconfont vuejs-account"></i>
      </div>
    </div>
      <audio id="audio" src="" type="audio/mpeg"></audio>
  </div>
</template>

<script>
export default {
  methods:{
    previous(){
      if(this.$store.state.music > 0){
        let musicIndex = this.$store.state.music -1
        let musicData = this.$store.state.musicData
        document.getElementById('audio').src = this.$api.music + `?music_singger=${$.trim(musicData[musicIndex].singger)}&music_name=${$.trim(musicData[musicIndex].title)}`
        this.$store.commit("setMusic",musicIndex)
      }
    },
    next(){
      if (this.$store.state.music != this.$store.state.musicData.length-1) {
        let musicIndex = this.$store.state.music +1
        let musicData = this.$store.state.musicData
        document.getElementById('audio').src = this.$api.music + `?music_singger=${$.trim(musicData[musicIndex].singger)}&music_name=${$.trim(musicData[musicIndex].title)}`
        this.$store.commit("setMusic",musicIndex)
      }
    },
    action(start = true){
      let audio = document.getElementById('audio');
      if ($(".control i").attr('class').indexOf('vuejs-zanting1') == -1 && start) {
       $(".control i").removeClass('vuejs-zanting')
        $(".control i").addClass('vuejs-zanting1')
        audio.pause()
        this.startTime({clear:true})
      }else {
        $(".control i").addClass('vuejs-zanting')
         $(".control i").removeClass('vuejs-zanting1')
         this.startTime()
         audio.play()
      }
    },
    voice(arg){
      let audio = document.getElementById('audio');
      audio.volume = arg.volume
    },
    updateTime(event){
      let audio = document.getElementById('audio')
      let time =audio.duration
      let ball = document.getElementById('button')
      let progress = document.getElementById('progress')
      let button = document.getElementById('audioControls')
       this.setTime()
       if((audio.currentTime/time)*button.offsetWidth  == 0){
         ball.style.left = `0px`
       }else if ((audio.currentTime/time)*button.offsetWidth  == button.offsetWidth) {
         ball.style.left = `${button.offsetWidth-15}px`
       }else {
         ball.style.left = `${(audio.currentTime/time)*button.offsetWidth}px`
       }
       progress.style.width = `${(audio.currentTime/time)*button.offsetWidth}px`
   button.onmousedown = (event)=>{
           let x = event.pageX - button.offsetLeft;
           ball.style.left = ` ${x}px`
           progress.style.width = `${x > button.offsetWidth ? button.offsetWidth : x}px`
           audio.currentTime = (progress.offsetWidth / button.offsetWidth)*time
           this.setTime()
       }
    },
    setTime(){
      let progress = document.getElementById('progress')
      let button = document.getElementById('audioControls')
      let audio = document.getElementById('audio')
      let time =audio.duration
      let jindu = (progress.offsetWidth / button.offsetWidth)*time
      let sec = Math.floor(jindu%60)
      let min = parseInt(jindu/60)
      if (`${min < 10 ? "0"+min : min}:${sec < 10 ? "0"+sec : sec}` == "NaN:NaN") {
        document.getElementById('tou').innerHTML = `00:00`
      }else {
        document.getElementById('tou').innerHTML = `${min < 10 ? "0"+min : min}:${sec < 10 ? "0"+sec : sec}`
      }
    },
    startTime(arg = {})
    {
      let audio = document.getElementById('audio');
      let button = document.getElementById('audioControls')
      let ball = document.getElementById('button')
      let progress = document.getElementById('progress')
      let time =audio.duration;
      let that = this
      ball.onmousedown = function(event) {
        event.stopPropagation();
        audio.ontimeupdate = null
     document.onmousemove=(event)=>{

      let x = event.pageX - button.offsetLeft;
      if (x> button.offsetWidth) {
        this.style.left = `${button.offsetWidth-15}px`
        progress.style.width = `${button.offsetWidth }px`
      }else if (x <= 0) {
        this.style.left = `0px`
        progress.style.width = `0px`
      }else {
        this.style.left = `${x-15}px`
        progress.style.width = `${x}px`
      }
       that.setTime()
     }
     document.onmouseup = (event) => {
       audio.currentTime = (progress.offsetWidth / button.offsetWidth)*time
       document.onmousemove=null
       document.onmouseup=null
     }
  }
      audio.ontimeupdate =this.updateTime

    },
    endTime(){
      let audio = document.getElementById('audio');
      audio.addEventListener('ended',()=>{
        this.action()
      })
      audio.addEventListener('canplay',()=>{
        let time =audio.duration;
        $(".control i").addClass('vuejs-zanting')
         $(".control i").removeClass('vuejs-zanting1')
         this.startTime()
         audio.play() //初始化开始
        let minutes = parseInt(time/60);
        if (minutes < 10) {
          minutes = `0${minutes}`
        }
        let seconds = parseInt(time % 60);
        if (seconds < 10) {
          seconds = `0${seconds}`
        }
        $("#wei").html(`${minutes}:${seconds}`)
      })
      audio.addEventListener('error',() => {
        $(".control i").removeClass('vuejs-zanting')
         $(".control i").addClass('vuejs-zanting1')
         $('#wei').html('00:00')
         this.startTime({clear:true})    //初始化暂停
         audio.pause()
      })
    }
  },
  mounted(){
    $.fn.RangeSlider = function(cfg){
        var $input = $(this);

        $input.attr('min', cfg.min)
            .attr('max', cfg.max)
            .attr('step', cfg.step);
        $input.bind("input", function(e){
            $input.attr('value', this.value);
            if (this.value == 0) {
              $input.css( 'background', '#454546' );
            }else {
              $input.css( 'background', 'linear-gradient(to right, #f00 ' + this.value + '%, #454546)' );
            }
        })
    }
    let that = this;
    document.getElementById('voice').onmouseup = function() { //range滑动
      that.voice({volume:this.value})
    }
    $('#voice').RangeSlider({ min: 0,   max: 1,  step: 0.1})
    this.endTime()
  }
}
</script>

<style  scoped>
.footer
{
  width: 100%;
  height: 5vh;
  position: fixed;
  bottom: 0;
  display: flex;
  background: #222225;
}
.action
{
  width: 20vw;
  height: 100%;
  display: flex;
  justify-content: center;
}
.action span
{
  display: flex;
  justify-content: center;
  align-items: center;
}
.action span i
{
  font-size: 1.8rem;
  color:#ccc;
  margin: 0 0.5rem;
  cursor: pointer;
}
.footer .action .jiantou
{
  font-size: 1.5rem;
}
.music_control
{
  width: 80vw;
  height: 100%;
  display: flex;
  justify-content:flex-start;
}
.music_control > div
{
  height: 100%;
  display: flex;
  align-items: center;
}
.music_control .music_time
{
  width: 80%;
}
.music_control .music_time span
{
  color: #fff;
  font-size: 14px;
  margin: 0 5%;
  overflow: visible;
}
.music_control .music_voice
{
  width: 17%;
}
.music_control .music_voice i
{
  margin:0 5%;
  color:#75757b;
  cursor: pointer;
}
.music_control .music_voice i:hover,.music_control .music_mode i:hover
{
  color:#fff;
}
.music_control .music_voice input[type=range]::-webkit-slider-thumb
{
  visibility: hidden;
}
.music_control .music_mode
{
  width: 3%;
  justify-content: center;
}
.music_control .music_mode i
{
  color:#75757b;
  cursor: pointer;
}
input[type=range] {
    -webkit-appearance: none;
    width: 80%;
    height: 8px;
    border-radius: 10px;
    overflow: visible;
    cursor: pointer;
    background-color: #454546;
}
input[type=range]::after{
   background-color:#fff;
}
input[type=range]:focus {
    outline: none;
}
 input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 16px;
    width: 16px;
    background: #f00;
    border-radius: 50%;
    border: solid 5px #fff;
}
#audioControls
	{
		width: 500px;
		background-color: #ccc;
		height: 10px;
		margin:10px;
    overflow-x: visible;
		display: flex;
		position:relative;
		border-radius: 4px;
	}
#progress
	{
		width: 0px;
		border-radius: 4px;
		height: 100%;
		position: absolute;
		left: 0px;
		background-color: #f00;
	}
#button
	{
		width: 15px;
		height: 15px;
		margin-top: -3px;
		border-radius: 50%;
		background-color: #f00;
		cursor: pointer;
		position: absolute;
		left: 0px;
		border:4px solid #fff;
	}
</style>
