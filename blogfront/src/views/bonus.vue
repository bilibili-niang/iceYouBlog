<template>
  <div class="bonus">

    <div class="btns">
      <ice-button @click="init">
        refresh
      </ice-button>
    </div>
    <img :src="imgsrc" alt="" class="img">
  </div>
</template>

<script setup>

import { ref } from 'vue'
import api from '@/api'

const imgsrc = ref('')

const init = async () => {
  const res = await api.getRandom()
  console.log(res)
  imgsrc.value = res.result
}

init()
</script>

<style scoped lang="less">
@import '../assets/css/variables';

.bonus {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  .img {
    display: flex;
    width: 70vw;
    height: auto;
    border-radius: @radio-n;
  }
}


@media (max-width: 1200px) {
  .img {
    width: 90vw !important;
  }
}
</style>

