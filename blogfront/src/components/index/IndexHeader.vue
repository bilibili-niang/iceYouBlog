<template>
  <div class="lim outLim">
    <ul class="ice-row list">
      <li class="list-item">
        <ice-link href="/" target="_self">index</ice-link>
      </li>
      <li v-if="!loginState" class="list-item">
        <ice-link href="#/login" target="_blank">login</ice-link>
      </li>
      <!--配置为1才开启注册-->
      <li v-if="!loginState&&store.state.config.registerFlag=='1'" class="list-item">
        <ice-link href="#/register" target="_blank">register</ice-link>
      </li>
      <li class="list-item">
        <ice-link href="#/code/codeClips" target="_self">code clips</ice-link>
      </li>
      <li class="list-item">
        <ice-link href="#/friend/links" target="_self">友链与留言</ice-link>
      </li>
      <li class="list-item">
        <Search></Search>
      </li>
      <li class="list-item">
        <div :class="{ dark: dark==true }" class="light" title="切换深色/浅色模式" @click="changeDark">
          <ice-text>
            {{ dark ? 'light' : 'dark' }}
          </ice-text>
        </div>
      </li>
    </ul>
    <div v-if="loginState" class="avatarLim">
      <ul class="ice-row list">
        <li class="list-item avatar">
          <ice-avatar :src="userInf.avatar"></ice-avatar>
        </li>
        <li class="list-item">
          <ice-link href="#/user" target="_blank">{{ userInf.username }}的个人中心</ice-link>
        </li>
        <li class="list-item">
          <ice-link target="_blank" @click="goToUserInf">{{ userInf.username }}的主页</ice-link>
        </li>
        <li class="list-item">
          <ice-link href="#/noteList" target="_blank">我的笔记列表</ice-link>
        </li>
        <li class="list-item">
          <ice-link href="#/new/blog" target="_blank">新建blog</ice-link>
        </li>
        <li class="list-item">
          <ice-link target="_blank" @click="goToUserHistory">历史记录</ice-link>
        </li>
        <li class="list-item">
          <ice-link target="_blank" @click="goToUserSearchHistory">搜索记录</ice-link>
        </li>
        <li v-if="userInfo.is_admin" class="list-item">
          <ice-link href="#/admin" target="_self">admin</ice-link>
        </li>
        <li v-if="userInfo" class="list-item">
          <ice-text @clic="out">out</ice-text>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex"
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import Search from '@/components/common/Search.vue'

const userInf = ref()
const loginState = ref()
const router = useRouter()
const store = useStore()
let dark = ref(true)
console.log(store.state.user.userInfo)
const { userInfo } = store.state.user || false

const out = () => {
  localStorage.removeItem('userInfo')
}

// 深色模式
const changeDark = () => {
  if (dark.value) {
    document.querySelector('html').classList.add('dark')
    document.querySelector('html').classList.remove('light')
  } else {
    document.querySelector('html').classList.add('light')
    document.querySelector('html').classList.remove('dark')
  }
  localStorage.setItem('mode', dark.value)
  dark.value = !dark.value
}
const init = () => {
  const inf = JSON.parse(localStorage.getItem('userInfo'))
  const mode = JSON.parse(localStorage.getItem('mode'))
  dark.value = Boolean(mode)
  if (JSON.stringify(inf).length > 10) {
    const token = inf.token || ''
    userInf.value = inf
    if (token.length > 10) {
      loginState.value = true
    }
  }
  // 获取配置
  store.commit('initConfig')
}
const goToUserInf = () => {
  const routeUrl = router.resolve({
    path: "/userDetail",
    query: {
      email: userInf.value.email
    }
  })
  window.open(routeUrl.href, '_blank')
}
const goToUserHistory = () => {
  const routeUrl = router.resolve({
    path: "/myselfHistory",
  })
  window.open(routeUrl.href, '_blank')
}
const goToUserSearchHistory = () => {
  const routeUrl = router.resolve({
    path: "/searchHistory",
  })
  window.open(routeUrl.href, '_blank')
}
onMounted(() => {

})

init()
changeDark()
</script>
<style lang="less" scoped>
.lim {
  margin: 0 auto;

  .list-item {
    margin: 0 1rem;
  }
}

.avatarLim {
  .ice-row {
    flex-wrap: wrap;
  }
}


.outLim {
  // 小屏
  @media (max-width: 1200px) {
    max-width: 100vw;
  }

  @media (min-width: 1200px) {
    max-width: 70vw;
  }
}

ul.list {
  flex-wrap: wrap;
  li{
    margin: 0!important;
  }
}

/*ul.list {
  li:nth-child(1n+1) {
    opacity: 0;
    height: 0;
    transition: .5s;
    white-space: nowrap;
  }

  &:hover {
    li:nth-child(1n+1) {
      opacity: 1;
      height: fit-content;
    }
  }
}

ul.list:nth-child(1) {
  height: 2rem;
}

ul.list:nth-child(2) {
  height: 6rem;
}*/
</style>
