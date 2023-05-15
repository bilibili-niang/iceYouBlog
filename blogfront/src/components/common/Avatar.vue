<template>
  <div class="demo-type">
    <div>
      <el-avatar :src="imgUrl" class="shadow"/>
    </div>
  </div>
</template>

<script>

export default {
  name: "Avatar",
  props: {
    request: true,
    imgUrl: String
  },
}
</script>

<style scoped lang="less">
.demo-type div span {
  display: flex;
  width: 5rem;
  height: 5rem;
  transition: 0.5s;
  border-radius: 50%;

  :deep img {
    width: 5rem;
    height: 5rem;
  }
}
</style>