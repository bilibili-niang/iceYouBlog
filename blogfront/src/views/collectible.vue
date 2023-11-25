<script setup>
import {ref} from "vue";
import CollectibleCard from "@/components/collectible/card/index.vue";
import CollectibleMusic from "@/components/collectible/music/index.vue";


let imgList = [
  {
    url: "/collectible/ding.png",
    id: 1,
    type: "card",
    title: "群 丁真",
    descriptions: "二十一世纪的理塘王,曾有无数人挑战丁真的地位,但都在他的雪豹面前败下阵来.成名绝技:闭嘴,雪豹"
  },
  {
    url: "/collectible/video1.mp4",
    id: 2,
    type: "music",
    title: "I Got Smoke",
    author: "V在燃烧",
    authorUrl: "/",
    coverImg:'collectible/1.png',
    descriptions: "你拿什么和我丁真拼?"
  },
];
const transformRotate = (item) => {
  imgPreviewRef.value.show([item.url]);
};

let imgPreviewRef = ref();

</script>

<template>
  <div class="collectible">
    <ice-text>
      收藏品,来自我
    </ice-text>
    <ice-column>
      <ice-row class="cardContainer">
        <template v-for="(item,index) in imgList" :key="index">
          <div v-if="item.type==='card'" class="cardLim">
            <collectibleCard :item="item"
                             @clickTrigger="transformRotate"/>
            <ice-column>
              <ice-text size="l">
                {{ item.title }}
              </ice-text>
              <ice-text>
                {{ item.descriptions }}
              </ice-text>
            </ice-column>
          </div>
          <div v-if="item.type==='music'" class="cardLim">
            <collectibleMusic :item="item"/>
            <ice-column>
              <ice-text size="l">
                {{ item.title }}
              </ice-text>
              <ice-text>
                <ice-tag>作者</ice-tag>
                {{ item.author }}
              </ice-text>
              <ice-text>
                {{ item.descriptions }}
              </ice-text>
            </ice-column>
          </div>


        </template>

      </ice-row>


    </ice-column>

    <iceImgPreview ref="imgPreviewRef" closeIconRight/>

  </div>
</template>

<style scoped lang="less">
@import "../assets/css/variables.less";

.collectible{
  max-width: 75vw;
  box-sizing: border-box;
  margin: 0 auto;

  .cardContainer{
    box-sizing: border-box;
    flex-wrap: wrap;

    .cardLim{
      padding: @p-normal;
      min-width: 300px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      width: 27%;
      margin-right: .3rem;
      border-radius: @radio-l;
      transition-duration: @time-n;
      box-shadow: rgba(0, 0, 0, 0) 1rem 1rem 1rem;
      position: relative;

      &:hover{
        box-shadow: @themeColor 1rem 1rem 2rem;
      }

    }
  }
}
</style>