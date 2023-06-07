<template>
  <div class="lim container">
    <div class="left">
      <ul>
        <li class="list-group-item active">
          <el-link href="/" target="_self">index</el-link>
        </li>
        <li class="list-group-item" v-if="!loginState">
          <el-link href="#/login" target="_blank">login</el-link>
        </li>
        <li class="list-group-item" v-if="!loginState">
          <el-link href="#/register" target="_blank">register</el-link>
        </li>
        <li class="list-group-item">
          <el-link href="#/code/codeClips" target="_self">code clips</el-link>
        </li>
        <li class="list-group-item">
          <el-link href="#/friend/links" target="_self">友链</el-link>
        </li>
        <li class="list-group-item" v-if="userInfo.is_admin">
          <el-link href="#/admin" target="_self">admin</el-link>
        </li>
        <li class="list-group-item">
         <Search></Search>
        </li>
      </ul>
    </div>
    <div class="right">

      <div class="avatarLim">
        <el-popover
            :width="300"
            popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: .1rem;"
        >
          <template #reference>
            <el-avatar :src="userInf.avatar"/>
          </template>
          <template #default>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                <div class="avatarLim">
                  <Avatar :imgUrl="userInf.avatar" :email="userInf.email"></Avatar>
                </div>
              </li>
              <li class="list-group-item">
                <el-link href="#/user" target="_blank">{{ userInf.username }}的个人中心</el-link>
              </li>
              <li class="list-group-item">
                <el-link @click="goToUserInf" target="_blank">{{ userInf.username }}的主页</el-link>
              </li>
              <li class="list-group-item">
                <el-link href="#/noteList" target="_blank">我的笔记列表</el-link>
              </li>
              <li class="list-group-item">
                <el-link href="#/new/blog" target="_blank">新建blog</el-link>
              </li>
              <li class="list-group-item">
                <el-link @click="goToUserHistory" target="_blank">历史记录</el-link>
              </li>
              <li class="list-group-item">
                <el-link @click="goToUserSearchHistory" target="_blank">搜索记录</el-link>
              </li>
            </ul>
          </template>
        </el-popover>


      </div>

    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex"
import Avatar from '@/components/common/Avatar.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Search from '@/components/common/Search.vue'

const userInf = ref()
const loginState = ref()
const router = useRouter()
const store = useStore()
const { userInfo } = store.state.user
console.log(userInfo)
const init = () => {
  const inf = JSON.parse(localStorage.getItem('userInfo'))
  if (JSON.stringify(inf).length > 10) {
    const token = inf.token || ''
    userInf.value = inf
    if (token.length > 10) {
      loginState.value = true
    }
  }
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
</script>
<style lang="less" scoped>
.lim {
  display: flex;
  flex-direction: row;
  width: 100%;
  max-height: 3rem;
  min-height: 0;
  justify-content: space-between;

  .left {
    display: flex;
    align-items: center;

    ul {
      list-style: none;
      padding-left: 0;
      display: flex;
      flex-direction: row;
      margin-bottom: 0;

      li {
        margin-right: 1.3rem;
      }
    }

  }

  .right {
    .select {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
