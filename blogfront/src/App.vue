<template>
  <IndexHeader/>
  <router-view :key="$route.fullPath"/>
  <div class="footer ice-row">
    <ice-link size="s" href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">鄂ICP备2021010206号
    </ice-link>
    <ice-text size="s">
      powered by:
    </ice-text>
    <ice-link size="s" href="https://github.com/bilibili-niang/iceYouBlog" target="_blank">iceYouBlog</ice-link>
    <ice-link size="s" href="https://github.com/bilibili-niang/icePro" target="_blank">icePro</ice-link>
    <ice-text>
      浏览量: {{ viewCount }}
    </ice-text>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import {useStore} from 'vuex';
import IndexHeader from '@/components/index/IndexHeader.vue';
import api from '@/api';

const store = useStore();
const viewCount = ref(0);

onMounted(async () => {
  // 获取session中的user信息
  store.commit('getUserInfo');

  // 获取深色/浅色模式的flag并应用
  const dark = localStorage.getItem('mode') || null;
  if (dark !== null) {
    document.documentElement.classList[dark === 'true' ? 'add' : 'remove']('dark');
  } else {
    // 自动切换深色/浅色模式
    const isNight = !isDaylight();
    document.documentElement.classList[isNight ? 'add' : 'remove']('dark');
  }

  // 获取浏览量
  try {
    const res = await api.getViews();
    viewCount.value = res.result;
  } catch (e) {
    // 错误处理
  }
});

// 判断是否为白天
function isDaylight() {
  const currDate = new Date();
  return currDate.getHours() >= 7 && currDate.getHours() < 20;
}
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
