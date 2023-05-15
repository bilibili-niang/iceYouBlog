<template>
  <div class="adminIndex container">
    <div class="card">
      <div class="avatar">
        <Avatar :imgUrl="userInfoStore.userInfo.avatar"></Avatar>
      </div>
      <div class="card-body">
        <h5 class="card-title">{{ userInfoStore.userInfo.username }}</h5>
        <p class="card-text">admin用户</p>
      </div>
    </div>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="friendLinks" name="friendLinks">
        <FriendLinks :links="friendLinks"></FriendLinks>
      </el-tab-pane>
      <el-tab-pane label="Config" name="second">Config</el-tab-pane>
      <el-tab-pane label="Role" name="third">Role</el-tab-pane>
      <el-tab-pane label="others" name="fourth">
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <el-text class="mx-1">log查看</el-text>
            <el-button>
              <el-link href="#/admin/log" target="_blank">log</el-link>
            </el-button>
          </li>
          <li class="list-group-item">
            <el-text class="mx-1">对所有文章进行管理</el-text>
            <el-button>
              <el-link href="#/admin/allMarkdown" target="_blank">allMarkdown</el-link>
            </el-button>
          </li>

        </ul>


      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import Avatar from '@/components/common/Avatar.vue'
import {ElMessage} from 'element-plus';
import {h} from 'vue';
import FriendLinks from '@/components/admin/FriendLinks.vue';
import http from "@/common/api/request";

export default {
  name: "Index",
  components: {FriendLinks, Avatar},
  data() {
    return {
      isAdmin: false,
      friendLinks: [],
      activeName: 'friendLinks'
    }
  },
  computed: {
    userInfoStore() {
      return this.$store.state.user;
    }
  },
  methods: {
    initLinks() {
      // 请求友链信息
      http.$axios({
        url: '/admin/friendLinks',
        method: 'POST',
        headers: {
          token: true
        }
      })
          .then(res => {
            console.log("res:")
            console.log(res)
            this.alertMessage(res.message);
            if (res.success) {
              this.friendLinks = res.result;
            } else {
              console.log('error')
            }
          })
          .catch(e => {
            console.log("e:")
            console.log(e)
          })
    },
    handleClick(tab, event) {
      console.log(tab.props.name)
      if (tab.props.name == 'friendLinks') {
        console.log('friendLinks clicked')
        this.initFriendLinks();
      }
    },
    initFriendLinks() {
      if (JSON.stringify(this.friendLinks).length > 10) {
        return
      } else {
        this.initLinks();
      }
    },
    alertMessage(title, sub, color) {
      const useColor = color || 'red';
      ElMessage({
        message: h('p', null, [
          h('span', null, title),
          h('i', {style: `color: ${useColor}`}, sub),
        ]),
      })
    }
    ,
    initData() {
      console.log('store中的数据:')
      console.log(this.userInfoStore)
      const tokenStr = JSON.parse(localStorage.getItem('userInfo'));
      if (tokenStr.email.length > 0) {
        // 有用户登录
        // 查询用户是否为admin用户
        http.$axios({
          url: '/user/isAdmin',
          method: 'POST',
          headers: {
            token: true
          }
        })
            .then(res => {
              this.alertMessage(res.message)
              console.log("是否为admin用户::")
              console.log(res.result)
              this.isAdmin = res.result;
              if (!res.result) {
                // 非admin用户
                // 重定向
                this.$router.push('/login')
              } else {
              }
            })
            .catch(e => {
              console.log("e:")
              console.log(e)
            })

      } else {
        // 重定向
        this.$router.push('/login')

      }

    }
  },
  created() {
    this.initData();
    this.initLinks();

  }

}
</script>

<style scoped lang="less">
.avatar {
  display: flex;
  align-items: center;
  padding-right: 0.5rem;
  flex-direction: row;
  justify-content: space-between;
}
</style>