<template>
  <div class="lim outLim">
    <shrinkBar bac-color="#ffffff" direction="top">
      <template v-slot:show v-if="showHeader">
        <ice-avatar :src="userInf?.avatar" v-if="userInf?.avatar"></ice-avatar>
        <ice-button v-else>
          hover
        </ice-button>
      </template>

      <template v-slot:body>
        <div class="ice-column">
          <ul class="ice-column">
            <li class="list-item">
              <ice-link href="/" target="_self">首页</ice-link>
            </li>
            <li class="list-item">
              <ice-text>
                切换颜色:
                <ice-button :class="{ dark: dark == true }" @click="changeDark"> {{ dark ? "深色" : "明亮" }}
                </ice-button>
              </ice-text>
            </li>
            <li v-if="!loginState" class="list-item">
              <ice-link href="#/login" target="_blank">登录</ice-link>
            </li>
            <!--配置为1才开启注册-->
            <li v-if="!loginState && store.state.config.registerFlag == '1'" class="list-item">
              <ice-link href="#/register" target="_blank">注册</ice-link>
            </li>
            <li class="list-item">
              <ice-link href="#/code/codeClips" target="_self">代码片段</ice-link>
            </li>
            <li class="list-item">
              <ice-link href="#/friend/links" target="_self">友链</ice-link>
            </li>
            <li class="list-item">
              <ice-link href="#/collectible" target="_self">收藏品</ice-link>
            </li>
            <li class="list-item">
              <ice-link href="#/searchHistory">搜索</ice-link>
              <Search v-if="false"></Search>
            </li>
          </ul>
        </div>
        <div v-if="loginState" class="ice-column">
          <ul class="ice-column">
            <li class="list-item">
              <ice-link href="#/user" target="_blank">{{ userInf.username }}</ice-link>
            </li>
            <li class="list-item">
              <ice-link @click="goToUserInf">{{ userInf.username }}的主页</ice-link>
            </li>
            <li class="list-item">
              <ice-link href="#/noteList" target="_blank">我的笔记列表</ice-link>
            </li>
            <li class="list-item">
              <ice-link href="#/new/blog" target="_blank">新建blog</ice-link>
            </li>
            <li class="list-item">
              <ice-link href="#/myselfHistory">历史记录</ice-link>
            </li>
            <li class="list-item">
              <ice-link href="#/searchHistory">搜索记录</ice-link>
            </li>
            <li v-if="userInfo.is_admin" class="list-item">
              <ice-link href="#/admin" target="_self">admin</ice-link>
            </li>
            <li class="list-item">
              <ice-link href="#/tools" target="_self">tools!</ice-link>
            </li>
            <li v-if="userInfo" class="list-item">
              <ice-button @click="out" disabled>out</ice-button>
            </li>
          </ul>
        </div>
      </template>
    </shrinkBar>


    <!--基础菜单-->
    <ul class="ice-row list" v-if="false">
      <li class="list-item">
        <ice-link href="/" target="_self">index</ice-link>
      </li>
      <li v-if="!loginState" class="list-item">
        <ice-link href="#/login" target="_self">login</ice-link>
      </li>
      <!--配置为1才开启注册-->
      <li v-if="!loginState && store.state.config.registerFlag == '1'" class="list-item">
        <ice-link href="#/register" target="_blank">register</ice-link>
      </li>
      <li class="list-item">
        <ice-link href="#/code/codeClips" target="_self">code clips</ice-link>
      </li>
      <li class="list-item">
        <ice-link href="#/friend/links" target="_self">友链</ice-link>
      </li>
      <li class="list-item">
        <ice-link href="#/words/index" target="_self">iKun</ice-link>
      </li>
      <li class="list-item">
        <ice-link href="#/search">搜索</ice-link>
        <Search v-if="false"></Search>
      </li>
      <li class="list-item">
        <ice-link :disabled="true" :class="{ dark: dark == true }" @click="changeDark"> {{ dark ? "light" : "dark" }}
        </ice-link>
      </li>
    </ul>

    <!--    <div v-if="loginState" class="avatarLim" v-if="false">-->
    <div class="avatarLim" v-if="false">
      <ul class="ice-row list">
        <li class="list-item avatar">
          <!--<ice-avatar :src="userInf.avatar"></ice-avatar>-->
        </li>
        <li class="list-item">
          <ice-link href="#/user" target="_blank">{{ userInf.username }}</ice-link>
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
          <ice-link @clic="out" disabled>out</ice-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import {useStore} from "vuex";
import {computed, onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import Search from "@/components/common/Search.vue";

const userInf = ref();
const loginState = ref();
const router = useRouter();
const store = useStore();
let dark = ref(true);
const {userInfo} = store.state.user || false;

const out = () => {
  localStorage.removeItem("userInfo");
  // 刷新
  window.location.reload();
};

// 是否展示侧边栏
const showHeader = computed(() => {
  return store.state.styleConfig.showHeader
})

// 深色模式
const changeDark = () => {
  if (dark.value) {
    document.querySelector("html").classList.add("dark");
    document.querySelector("html").classList.remove("light");
  } else {
    document.querySelector("html").classList.add("light");
    document.querySelector("html").classList.remove("dark");
  }
  localStorage.setItem("mode", dark.value);
  dark.value = !dark.value;
};
const init = () => {
  const inf = JSON.parse(localStorage.getItem("userInfo"));
  const mode = JSON.parse(localStorage.getItem("mode"));
  dark.value = Boolean(mode);
  if (JSON.stringify(inf).length > 10) {
    const token = inf.token || "";
    userInf.value = inf;
    if (token.length > 10) {
      loginState.value = true;
    }
  }
  // 获取配置
  store.commit("initConfig");
};
const goToUserInf = () => {
  const routeUrl = router.resolve({
    path: "/userDetail",
    query: {
      email: userInf.value.email
    }
  });
  window.open(routeUrl.href, "_blank");
};
const goToUserHistory = () => {
  const routeUrl = router.resolve({
    path: "/myselfHistory",
  });
  window.open(routeUrl.href, "_blank");
};
const goToUserSearchHistory = () => {
  const routeUrl = router.resolve({
    path: "/searchHistory",
  });
  window.open(routeUrl.href, "_blank");
};
onMounted(() => {

});

init();
changeDark();
</script>
