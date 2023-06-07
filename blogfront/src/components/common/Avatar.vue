<template>
  <div class="demo-type" :@click="allowClick? null: goDetail(email)">
    <div class="left">
      <el-avatar :src="imgUrl" class="shadow"/>
      <div class="other">
      <el-text></el-text>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  email: {
    type: String,
    request: true,
  },
  imgUrl: String,
  allowClick: {
    type: Boolean,
    default: true
  }
})
const goDetail = email => {
  if (props.allowClick) {
    const routeUrl = this.$router.resolve({
      path: "/user/about",
      query: { email }
    })
    window.open(routeUrl.href, '_blank')
  }
}
</script>
<style scoped lang="less">
.demo-type {
  margin: .3rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.demo-type div span {
  display: flex;
  width: 5rem;
  height: 5rem;
  transition: 0.5s;
  border-radius: 50%;

  :deep img {
    width: 100%;
    height: 100%;
    min-width: 3rem;
    min-height: 3rem;
  }
}
</style>
