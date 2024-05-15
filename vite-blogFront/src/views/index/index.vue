<script setup lang="ts">
import Hello from './index.jsx'
import test from './button.jsx'

const getMsg = (str) => {
  console.log('父亲接受到了:')
  console.log(str)
}
</script>
<script>

</script>

<template>
  <div class="indexPage">
    index!!!
    <Hello></Hello>
    <br/>
    <br/>
    <br/>
    <test test="父亲的test文字" @sonMsg="getMsg"></test>
  </div>
</template>

<style scoped lang="less">

</style>