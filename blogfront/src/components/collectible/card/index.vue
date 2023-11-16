<script setup>
import {useMouseInElement} from "@vueuse/core";
import {computed, ref, watch} from "vue";

const cardContainer = ref(null);
let {x, y, isOutside, elementX, elementY} = useMouseInElement(cardContainer);

let calculateX = computed(() => {
  if (isOutside.value) {
    return 0;
  } else {
    return x.value - elementX.value;
  }
});
// 鼠标放在img上面偏移的px
let mouseOffsetX = computed(() => {
  if (isOutside.value) {
    return 0;
  } else {
    if (elementX.value > parseInt(imgRef.value.width / 2)) {
      return elementX.value - parseInt(imgRef.value.width / 2);
    } else {
      return parseInt(imgRef.value.width / 2) - elementX.value;
    }
  }
});

let mouseOffsetY = computed(() => {
  if (isOutside.value) {
    return 0;
  } else {
    if (elementY.value > parseInt(imgRef.value.height / 2)) {
      return elementY.value - parseInt(imgRef.value.height / 2);
    } else {
      return parseInt(imgRef.value.height / 2) - elementY.value;
    }
  }
});

const props = defineProps({
  item: {
    type: Object,
    default: () => {
      return {};
    }
  }
});
let imgRef = ref();
// 图片x
let rotateX = ref(0);
// 设置y的偏移量
watch(() => elementX.value, () => {
  if (isOutside.value) {
    rotateX.value = 0;
    return false;
  } else {
    rotateX.value = limitValue(mouseOffsetX.value, 50);
  }
});
// 图片y
let rotateY = ref(0);
// 监听x的偏移量
watch(() => elementY.value, () => {
  if (isOutside.value) {
    rotateY.value = 0;
    return false;
  } else {
    rotateY.value = limitValue(mouseOffsetY.value, 50);
  }
});

/**
 * 限制值小于target,如果大于,递归掰一半
 * @param value
 * @param target
 */
const limitValue = (value, target) => {
  if (value > target) {
    return limitValue(value / 2, target);
  } else {
    return value;
  }
};

</script>
<script>
export default {
  name: "collectibleCard"
};
</script>

<template>
  <div class="collectibleCard" ref="cardContainer">
    <img :src="item.img" alt="" :style="{ transform: `rotateY(-${rotateX}deg) rotateX(-${rotateY}deg)` }" ref="imgRef"
         class="collectibleImg">

    <div class="fixed">
      <ice-column>
        <ice-text>
          x: {{ x }}
        </ice-text>
        <ice-text>
          y: {{ y }}
        </ice-text>
        <ice-text>
          isOutside: {{ isOutside }}
        </ice-text>
        <ice-text>
          elementX:{{ elementX }}
        </ice-text>
        <ice-text>
          elementY:{{ elementY }}
        </ice-text>
        <ice-text>
          calculateX:{{ calculateX }}
        </ice-text>
        <ice-text>
          mouseOffsetX:{{ mouseOffsetX }}
        </ice-text>
      </ice-column>
    </div>
  </div>

</template>

<style scoped lang="less">
.fixed{
  position: fixed;
  top: 100px;
  right: 100px;
}
.collectibleCard{
  position: relative;
  box-sizing: border-box;
  display: flex;
  max-height: 75vh;
  width: fit-content;
  margin: 2rem;
  background: rgba(255, 255, 255, .4);


  .collectibleImg{
    display: flex;
    max-height: 75vh;
    width: 13rem;
    margin: @m-normal;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    transition: all 0.7s ease;
    transform: scale(.7);
    border-radius: @radio-n;
    transform-style: preserve-3d;

    &:hover{
      box-shadow: 0 0 10px 0 rgba(255, 255, 255, 0.5);
      transform: scale(1);
      //transform: rotateX(-15deg) rotateY(15deg);
    }
  }
}

</style>