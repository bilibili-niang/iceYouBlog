<template>
  <div class="demo-type" @click="goDetail(email)">
    <div>
      <el-avatar :src="imgUrl" class="shadow"/>
    </div>
  </div>
</template>

<script>

export default {
  name: "Avatar",
  props: {
    email: String,
    request: true,
    imgUrl: String
  },
  methods: {
    goDetail (email) {
      console.log('将要跳转的email:')
      console.log(email)
      const routeUrl = this.$router.resolve({
        path: "/user/about",
        query: { email }
      })
      window.open(routeUrl.href, '_blank')
    }
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
    min-width: 5rem;
    min-height: 5rem;
  }
}
</style>
