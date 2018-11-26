<template>
  <div class="footer">
    <div class="action">
      <span><i class="iconfont vuejs-shangyige jiantou"></i></span>
      <span class="control"><i class="iconfont vuejs-zanting1" @click="action"></i></span>
      <span><i class="iconfont vuejs-xiayige jiantou"></i></span>
    </div>
    <div class="music_control">
      <div class="music_time">
        <span id="tou">00:00</span>
        <input type="range"  id="time" value="">
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
    startTime(arg = {})
    {
      let audio = document.getElementById('audio');
      if (arg.currentTime) {
        audio.currentTime = arg.currentTime;
      }
      //range控制audio
      let a = setInterval(()=>{
        let time = audio.currentTime;
        let minutes = parseInt(time/60);
        if (minutes < 10) {
          minutes = `0${minutes}`
        }
        $('#time').val(parseInt(time))
        let seconds = parseInt(time % 60);
        if (seconds < 10) {
          seconds = `0${seconds}`
        }
        $("#tou").html(`${minutes}:${seconds}`)
      },1000)
      if (arg.clear) { //清除计时
        clearInterval(a);
      }
    },
    endTime(){
      let audio = document.getElementById('audio');
      audio.addEventListener('canplay',()=>{
        let time =audio.duration;
        $(".control i").addClass('vuejs-zanting')
         $(".control i").removeClass('vuejs-zanting1')
         this.startTime()
         audio.play() //初始化开始
        $('#time').RangeSlider({ min: 0,   max: parseInt(time),  step: 1})
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

    document.getElementById('time').onmouseup = function() { //range滑动
      that.startTime({currentTime:this.value,clear:true})
    }
    document.getElementById('time').onmousedown = function() { //range滑动
      that.startTime({currentTime:this.value,clear:true})
    }
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
</style>
