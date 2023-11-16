<template>
  <ice-cloumn class="container">
    <ice-text>
      404
    </ice-text>

    <ice-text>
      找不着东西,回头是岸
    </ice-text>
    <ice-column>
      <audio controls ref="audio" :src="src"
             @ended="audioEnd"
      >
      </audio>
      <ice-row>
        src:{{ src }}
        <ice-selector v-model="playIndex" :list="audioSrc"></ice-selector>
      </ice-row>

    </ice-column>
    <ice-text>
      {{ audio.value }}
    </ice-text>


  </ice-cloumn>
</template>

<script setup>
import {computed, reactive, ref} from "vue";

let playIndex = ref("1");
let audioSrc = reactive([
  {
    label: "I got smoke",
    value: "1",
    src: "/404.mp4"
  },
  {
    label: "肺痒痒",
    value: "2",
    src: "/feiyangyang.mp4"
  },
  {
    label: "桃子",
    value: "3",
    src: "/feiyangyang.mp4"
  },
  {
    label: "猕猴桃",
    value: "4",
    src: "/feiyangyang.mp4"
  }
]);
const src = computed(() => {
  let res = "";
  audioSrc.filter(item => {
    if (item.value === playIndex.value) {
      res = item.src;
    }
  });
  return res;
});
let audio = ref("");
setTimeout(() => {
  console.log(audio.value);
});

const audioEnd = () => {
  console.log("停下了");
};

</script>

<style scoped lang="less">
audio{
  width: 100%;
}
</style>