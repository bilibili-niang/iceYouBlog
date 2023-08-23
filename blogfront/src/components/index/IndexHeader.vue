<template>
  <div class="lim outLim">
    <ul class="ice-row">
      <li class="list-item">
        <el-link href="/" target="_self">index</el-link>
      </li>
      <li class="list-item" v-if="!loginState">
        <el-link href="#/login" target="_blank">login</el-link>
      </li>
      <!--配置为1才开启注册-->
      <li class="list-item" v-if="!loginState&&store.state.config.registerFlag=='1'">
        <el-link href="#/register" target="_blank">register</el-link>
      </li>
      <li class="list-item">
        <el-link href="#/code/codeClips" target="_self">code clips</el-link>
      </li>
      <li class="list-item">
        <el-link href="#/friend/links" target="_self">友链与留言</el-link>
      </li>
      <li class="list-item">
        <Search></Search>
      </li>
      <li class="list-item">
        <div class="light" :class="{ dark: dark==true }" @click="changeDark" title="切换深色/浅色模式">
          <ice-button>
            {{ dark ? 'light' : 'dark' }}
          </ice-button>
        </div>
      </li>
    </ul>
    <br>
    <div class="avatarLim" v-if="loginState">
      <ul class="ice-row">
        <li class="list-item">
          <el-avatar :src="userInf.avatar" :email="userInf.email"/>
        </li>
        <li class="list-item">
          <el-link href="#/user" target="_blank">{{ userInf.username }}的个人中心</el-link>
        </li>
        <li class="list-item">
          <el-link @click="goToUserInf" target="_blank">{{ userInf.username }}的主页</el-link>
        </li>
        <li class="list-item">
          <el-link href="#/noteList" target="_blank">我的笔记列表</el-link>
        </li>
        <li class="list-item">
          <el-link href="#/new/blog" target="_blank">新建blog</el-link>
        </li>
        <li class="list-item">
          <el-link @click="goToUserHistory" target="_blank">历史记录</el-link>
        </li>
        <li class="list-item">
          <el-link @click="goToUserSearchHistory" target="_blank">搜索记录</el-link>
        </li>
        <li class="list-item" v-if="userInfo.is_admin">
          <el-link href="#/admin" target="_self">admin</el-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex"
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Search from '@/components/common/Search.vue'

const userInf = ref()
const loginState = ref()
const router = useRouter()
const store = useStore()
let dark = ref(true)

const { userInfo } = store.state.user || false

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
</style>
