<template>
  <IndexHeader></IndexHeader>
  <router-view/>
  <div class="footer animation-time">
    <el-link href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">鄂ICP备2021010206号</el-link>
    <div>
      powered by:
      <el-link href="https://github.com/bilibili-niang/iceYouBlog" target="_blank">iceYouBlog</el-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      day: true
    }
  },
  created() {
    // 获取session中的user信息
    this.$store.commit("getUserInfo");
    console.log('day?')
    if (!this.isDaylight()) {
      //这里是白天
    } else {
      //这里是夜间
      this.day = false;
      const body = document.querySelector('body');
      body.style.backgroundColor = 'rgba(0,0,0,0.2)'
    }
    console.log(this.day)
  },
  methods: {
    isDaylight() {
      const currdate = new Date();
      if (currdate.getHours() >= 23 || currdate.getHours() < 7) {
        return true;
      } else {
        return false;
      }
    }
  }
}
</script>
<style scoped lang="less">
#app {
  display: flex;
  flex-direction: column;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  font-size: 0.7rem;
  opacity: 0.1;

  &:hover {
    opacity: 0.8;
  }
}
</style>