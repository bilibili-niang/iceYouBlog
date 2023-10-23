<template>
  <!--动画化文字-->
  <div class="animateFont">
    <b>{{ text }}</b>
  </div>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    default: 'Animate'
  }
})

</script>

<style scoped lang="less">

.animateFont {
  height: 100%;
  margin: 0;
  padding: 0;
  display: grid;
  place-items: center;
}

b {
  line-height: 1;
  margin: 0;
  letter-spacing: 0.075ch;
  color: hsl(0 0% 90%);
  text-align: center;
  --light-pos-x: 1;
  --light-pos-y: -1;
  --rim-size: .02ch;
  --shadow-offset: .2ch;
  --shadow-blur: .1ch;
  text-shadow: calc(max(var(--rim-size), 1px) * var(--light-pos-x)) calc(max(var(--rim-size), 1px) * var(--light-pos-y)) hsl(0 0% 100%),
  calc(max(var(--rim-size), 1px) * var(--light-pos-x) * -1) calc(max(var(--rim-size), 1px) * var(--light-pos-y) * -1) hsl(0 0% 60%),
  calc(var(--shadow-offset) * var(--light-pos-x) * -1) calc(var(--shadow-offset) * var(--light-pos-y) * -1) var(--shadow-blur) hsl(0 0% 50% / .75)
}
</style>
