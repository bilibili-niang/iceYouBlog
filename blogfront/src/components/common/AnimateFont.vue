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
@font-face {
  font-family: 'Luckiest Guy';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('https://fonts.gstatic.com/s/luckiestguy/v18/_gP_1RrxsjcxVyin9l9n_j2hTd52.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

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
