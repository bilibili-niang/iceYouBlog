<template>
  <div class="buttonLim hover-out-exudes">
    <a :href="href"></a>
  </div>
</template>

<script setup>

const props = defineProps(['href'])

</script>

<style scoped lang="less">
@skyblue: rgba(69, 159, 251, .7);
@hoverColor: #ffffff;
@hoverShadow: rgba(0, 0, 0, 0.5);
.hover-out-exudes {
  position: relative;
  overflow: visible;
  border: @skyblue;
  color: @skyblue;

  &:before {
    content: '';
    box-shadow: 0 0 2rem 1.5rem @skyblue;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    width: 100%;
    height: 100%;
    transition-duration: .5s;
  }

  &:hover {
    color: @hoverColor;
    background: @skyblue;

    &:before {
      box-shadow: .5rem .5rem .7rem .3rem @skyblue;
      background: transparent;
      right: inherit;
      filter: blur(.3rem);
    }
  }
}
</style>
