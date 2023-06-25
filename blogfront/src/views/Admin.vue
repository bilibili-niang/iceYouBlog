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

          <li class="list-group-item">
            <el-text>选择需要展示的admin账户</el-text>
            <div class="user" v-for="(item,index) in allAdminList" :key="index">
              <el-row>
                <el-col :span="8">
                  <Avatar :imgUrl="item.avatar"></Avatar>
                </el-col>
                <el-col :span="16">
                  <div class="UserInfo">
                    <div class="Lim">
                      <el-tag class="ml-2" type="info">id</el-tag>
                      <el-text>
                        {{ item.id }}
                      </el-text>
                    </div>

                    <div class="Lim">
                      <el-tag class="ml-2" type="info">username</el-tag>
                      <el-text>
                        {{ item.username }}
                      </el-text>
                    </div>

                    <div class="Lim">
                      <el-tag class="ml-2" type="info">email</el-tag>
                      <el-text>
                        {{ item.email }}
                      </el-text>
                    </div>

                    <div class="Lim">
                      <el-tag class="ml-2" type="info">occupation</el-tag>
                      <el-text>
                        {{ item.occupation }}
                      </el-text>
                    </div>

                    <div class="Lim">
                      <el-tag class="ml-2" type="info">word</el-tag>
                      <el-text>
                        {{ item.word }}
                      </el-text>
                    </div>
                  </div>
                </el-col>
              </el-row>
              <div class="uerOptions">
                <el-button @click="operateAdminUser(item.email,'showInIndex')">setAsIndexUser</el-button>
              </div>
            </div>
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
      activeName: 'friendLinks',
      // 存放所有的admin用户信息
      allAdminList: {},
    }
  },
  computed: {
    userInfoStore() {
      return this.$store.state.user;
    }
  },
  methods: {
    /* @author icestone , 18:15
     * @date 2023/5/17
     * 操作admin用户
    */
    operateAdminUser(email, operate) {
      console.log("operateAdminUser")
      console.log(`email:${email},operate:${operate}`)
      http.$axios({
        url: '/admin/operateUser',
        method: 'POST',
        headers: {
          token: true
        },
        data: {
          email,
          operate
        }
      })
          .then(res => {
            console.log("res:")
            console.log(res)
            this.alertMessage(res.message)
          })
          .catch(e => {
            console.log("e:")
            console.log(e)
          })


    },
    /* @author icestone , 17:56
     * @date 2023/5/17
     * 获取所有admin的信息
    */
    getAllAdminUserInfo() {
      http.$axios({
        url: '/admin/getAllAdminInfo',
        method: 'POST',
        headers: {
          token: true
        }
      })
          .then(res => {
            this.allAdminList = res.result;
          })
          .catch(e => {
            console.log("e:")
            console.log(e)
          })

    },
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
    },
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
    this.getAllAdminUserInfo();

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

:deep .list-group-item {
  padding: .3rem;
}

.friendLinks {
  flex-wrap: wrap;

  :deep .card {
    padding: 0;
    min-width: 19rem;

  }
}

</style>
