<template>
  <IndexHeader></IndexHeader>
  <router-view :key="$route.fullPath"/>
  <div class="footer ice-row">
    <ice-link size="s" href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">鄂ICP备2021010206号
    </ice-link>
    <ice-text size="s">
      powered by:
    </ice-text>
    <ice-link size="s" href="https://github.com/bilibili-niang/iceYouBlog" target="_blank">iceYouBlog</ice-link>
    <ice-link size="s" href="https://github.com/bilibili-niang/icePro" target="_blank">icePro</ice-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      day: true
    };
  },
  created() {
    // 获取session中的user信息
    this.$store.commit("getUserInfo");
    // 获取深色/浅色模式的flag
    const dark = localStorage.getItem("mode") || null;
    if (dark != null) {
      if (dark == "true") {
        document.querySelector("html").classList.add("dark");
      } else {
        document.querySelector("html").classList.remove("dark");
      }
    } else {
      if (!this.isDaylight()) {
        //这里是白天
        document.querySelector("html").classList.remove("dark");
      } else {
        //这里是夜间
        this.day = false;
        document.querySelector("html").classList.add("dark");
      }
    }
  },
  methods: {
    isDaylight() {
      const currdate = new Date();
      if (currdate.getHours() >= 20 || currdate.getHours() < 7) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>
<style scoped lang="less">
#app {
  display: flex;
  flex-direction: column;
  max-height: 90vh;
}

.footer {
  position: fixed;
  bottom: 10px;
  left: 10px;
}

@media (max-width: 1200px) {
  #app {
    padding-top: 3rem;
  }
}
</style>
