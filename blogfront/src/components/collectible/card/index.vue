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
// 鼠标横向偏移
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
// 鼠标纵向偏移
let mouseOffsetY = computed(() => {
  if (!isOutside.value) {
  }
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
let rightFlag = ref(false);
// 设置y的偏移量
watch(() => elementX.value, () => {
  if (isOutside.value) {
    rotateX.value = 0;
    return false;
  } else {
    // 在左边
    if (mouseOffsetX.value < imgRef.value.width / 2) {
      rightFlag.value = false;
      rotateX.value = limitValue(mouseOffsetX.value, 50);
    } else {
      rightFlag.value = true;
      // 在右边
      rotateX.value = -(limitValue(mouseOffsetX.value, 50));
    }
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
    if (mouseOffsetY.value < imgRef.value.height / 2) {
      rotateY.value = limitValue(mouseOffsetY.value, 70);
    } else {
      rotateY.value = -limitValue(mouseOffsetY.value, 70);
    }
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

const emit = defineEmits(["clickTrigger"]);
/**
 * 点击传递给父组件放大查看
 */
const clickRotate = (item) => {
  emit("clickTrigger", item);
};

</script>
<script>
export default {
  name: "collectibleCard"
};
</script>

<template>
  <div class="collectibleCard" ref="cardContainer" @click="clickRotate(item)">
    <img :src="item.url" alt=""
         :style="{ transform: `rotateY(${rightFlag?-rotateX:rotateX}deg) rotateX(${rotateY}deg)` }" ref="imgRef"
         class="collectibleImg">
  </div>

</template>

<style scoped lang="less">
.collectibleCard{
  position: relative;
  box-sizing: border-box;
  display: flex;
  max-height: 75vh;
  width: fit-content;
  margin-left: .5rem;
  margin-right: .5rem;
  //background: rgba(255, 255, 255, .4);

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