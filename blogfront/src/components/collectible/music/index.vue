<script setup>
import {defineProps, ref} from "vue";

let audio = ref();
// 是否在播放,默认不播放
let state = ref(false);
const props = defineProps({
  item: {}
});
const audioEnd = () => {
  console.log("audioEnd");
};

const changeState = () => {
  console.log(audio);
  if (state.value) {
    audio.value.pause();
  } else {
    audio.value.play();
  }
  state.value = !state.value;
};
</script>

<script>
export default {
  name: "collectibleMusic"
};
</script>

<template>
  <div class="collectibleMusic" :style="{
    'background':'rgb('+''+')'
  }">
    <div class="controllerContainer">
      <div class="playInfo">
        <div class="cover">
          <img src="collectible/1.png" alt="">
        </div>

      </div>

      <div class="start" @click="changeState">
        <ice-tag>
          {{ state ? "「 || 」" : "「▶」" }}
        </ice-tag>
      </div>
    </div>
    <audio controls ref="audio" :src="item.url"
           @ended="audioEnd"
           class="video"
           controlslist="nodownload noplaybackrate"
    ></audio>
  </div>
</template>

<style scoped lang="less">
.collectibleMusic{
  flex: 1;
  width: 100%;
  padding: @p-small;

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

        img{
          display: flex;
          width: 200px;
        }
      }
    }

    .start{
      position: absolute;
      bottom: .3rem;
      left: .3rem;
    }
  }

  .video{
    /*opacity: 0;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -10;*/
  }

}
</style>