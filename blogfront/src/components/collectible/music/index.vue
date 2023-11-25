<script setup>
import {computed, defineProps, ref} from "vue";

let audio = ref();
// 是否在播放,默认不播放
let state = ref(false);
const props = defineProps({
  item: {}
});
const audioEnd = () => {
  console.log("audioEnd");
};

let totalTime = ref(0);

const getDuration = () => {
  totalTime.value = parseInt(audio.value.duration) || 0;
};
const changeState = () => {
  if (state.value) {
    audio.value.pause();
  } else {
    audio.value.play();
  }
  state.value = !state.value;
};
let currentTime = ref(0);
const updateTime = () => {
  currentTime.value = parseInt(audio.value.currentTime) || 0;
};

let progressBar = computed(() => {
  return (currentTime.value / totalTime.value) * 100;
});
</script>

<script>
export default {
  name: "collectibleMusic"
};
</script>

<template>
  <audio controls ref="audio" :src="item.url"
         @ended="audioEnd"
         class="video"
         controlslist="nodownload noplaybackrate"
         @timeupdate="updateTime"
         @canplay="getDuration"
         hidden=true
  ></audio>
  <div class="collectibleMusic" :style="{
    'background':'rgb('+''+')'
  }">
    <div class="backCover" :style="{
      'background':'url('+item.coverImg+')'
    }" :class="[
        state?'play':'posed'
    ]">

    </div>
    <div class="controllerContainer">
      <div class="playInfo">
        <div class="cover">
          <img :src="item.coverImg" alt="">
        </div>

      </div>

      <div class="start">
        <ice-tag noselect pointer @click="changeState">
          {{ state ? "「 || 」" : "「▶」" }}
        </ice-tag>
        <div class="bottomLine">
          <div class="timeLine" :style="{
          'width':progressBar+'%'
        }">
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.collectibleMusic{
  flex: 1;
  width: 100%;
  padding: @p-small;
  position: relative;
  overflow: hidden;
  border-radius: @radio-n;

  .backCover{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    background-repeat: no-repeat;
    background-size: contain;
    transition: @time-l;
    border-radius: @radio-n;
  }

  .play{
    width: 100%;
    height: 100%;
    filter: blur(10px);
    border-radius: @radio-n;
  }

  .posed{
    border-radius: 50%;
    height: 0;
    width: 0;
    filter: blur(0px);
  }

  .controllerContainer{
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    position: relative;

    .playInfo{
      .cover{
        width: 200px;
        max-height: 200px;
        overflow: hidden;
        border-radius: @radio-n;
        margin: 1.3rem auto auto;

        img{
          display: flex;
          width: 200px;
        }
      }
    }

    .start{
      position: absolute;
      bottom: .3rem;
      left: 0;
      width: 100%;
      padding-bottom: .9rem;

      .bottomLine{
        position: absolute;
        bottom: 0;
        left: 0;
        margin-top: @m-normal;
        display: flex;
        width: 100%;
        height: .3rem;
        border-radius: @radio-l;
        background: @themeColor-bleak;
        overflow: hidden;
        transition-duration: @time-n;

        &:hover{
          height: .6rem;
          border-radius: @radio-n;
        }

        .timeLine{
          background: @themeActiveColor;
          display: flex;
          height: 100%;
        }
      }
    }
  }
}
</style>