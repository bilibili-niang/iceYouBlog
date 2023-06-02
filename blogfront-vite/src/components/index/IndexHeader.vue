<template>
  <div class="indexHeader">
    <!--index全局组件-->
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item active" aria-current="page">
          <el-link href="/" target="_self">index</el-link>
        </li>
        <li class="breadcrumb-item" aria-current="page" v-if="!loginState">
          <el-link href="#/login" target="_blank">login</el-link>
        </li>
        <li class="breadcrumb-item" aria-current="page" v-if="!loginState">
          <el-link href="#/register" target="_blank">register</el-link>
        </li>
        <li class="breadcrumb-item" aria-current="page">
          <el-link href="#/code/codeClips" target="_self">code clips</el-link>
        </li>
        <li class="breadcrumb-item" aria-current="page">
          <el-link href="#/friend/links" target="_self">友链</el-link>
        </li>
        <li class="breadcrumb-item" aria-current="page" v-if="userInfoStore.userInfo.is_admin">
          <el-link href="#/admin" target="_self">admin</el-link>
        </li>
        <li class="breadcrumb-item" aria-current="page">
          <Search></Search>
        </li>
      </ol>
    </nav>
    <el-popover placement="bottom" trigger="hover" :width="300" v-if="loginState">
      <template #reference>
        <el-button style="margin-right: 16px" class="animation-time hover-around-shadow">more</el-button>
      </template>
      <div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <div class="avatarLim">
              <Avatar :imgUrl="userInf.avatar"></Avatar>
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
      </div>
    </el-popover>

  </div>
</template>

<script>
import Avatar from '@/components/common/Avatar.vue';
import Search from '@/components/common/Search.vue';


export default {
  name: "IndexHeader",
  components: {Avatar, Search},
  computed: {
    userInfoStore() {
      return this.$store.state.user;
    }
  },
  data() {
    return {
      activeName: 'first',
      loginState: false,
      userInf: '',
    }
  },
  created() {
    this.init();
  },
  methods: {
    // 阅读历史文章
    goToRead(id) {
      const routeUrl = this.$router.resolve({
        path: "/read",
        query: {id}
      });
      window.open(routeUrl.href, '_blank');
    },
    goToUserHistory() {
      const routeUrl = this.$router.resolve({
        path: "/myselfHistory",
      });
      window.open(routeUrl.href, '_blank');
    },
    goToUserSearchHistory() {
      const routeUrl = this.$router.resolve({
        path: "/searchHistory",
      });
      window.open(routeUrl.href, '_blank');
    },
    // 前往查看用户信息
    goToUserInf() {
      const routeUrl = this.$router.resolve({
        path: "/userDetail",
        query: {
          email: this.userInf.email
        }
      });
      window.open(routeUrl.href, '_blank');
    },
    init() {
      const inf = JSON.parse(localStorage.getItem('userInfo'))
      if (JSON.stringify(inf).length > 10) {
        const token = inf.token || '';
        this.userInf = inf;
        if (token.length > 10) {
          this.loginState = true
        }
      }
      // console.log(this.userInf)
    },
  }

}
</script>

<style scoped lang="less">
:deep nav {
  padding-left: 0;
}

.indexHeader {
  margin: 0 auto;
  position: relative;
  overflow: visible;
  display: flex;
  box-sizing: border-box;
  padding-left: 1.3rem;

  //小屏幕
  @media screen and (min-width: 1500px) {
    & {
      padding-right: 1.3rem;
      max-width: 75%;
    }
  }

  @media screen and (max-width: 1200px) {
    & {
      width: 100%;
      justify-content: flex-start;
    }
  }

  .avatar {
    position: absolute;
    right: 1rem;
    top: 0;
    padding: 0;
    z-index: 9;
    box-sizing: border-box;
    border-radius: 0.5rem;
    transition: 0.2s;
    width: 5rem;
    height: 5rem;
    overflow-y: hidden;
    overflow-x: hidden;
    background: rgba(0, 0, 0, 0);
  }

  .el-button {
    position: absolute;
    right: 10px;
    top: 0.2rem;
  }

  hr {
    margin: 0.2rem;
    padding-top: 0;
  }

  .items {
    display: flex;
    width: 100%;
    flex-direction: column;

    .des {
      display: flex;
      width: 100%;
    }

    span {
      display: flex;
      width: 100%;
    }

    a {
      justify-content: flex-start !important;
    }
  }
}
</style>