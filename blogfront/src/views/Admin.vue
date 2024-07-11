<template>
  <div class="adminIndex container">
    <div class="card">
      <div class="avatar">
        <Avatar :imgUrl="userInfoStore.userInfo.avatar"></Avatar>
      </div>
      <div class="card-body">
        <div class="detail">
          <el-text>{{ userInfoStore.userInfo.username }}</el-text>
          <el-text>admin用户</el-text>
        </div>
      </div>
    </div>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="friendLinks" name="friendLinks">
        <FriendLinks :links="friendLinks" v-if="activeName === 'friendLinks'"></FriendLinks>
      </el-tab-pane>
      <el-tab-pane label="Config" name="config">
        <Config v-if="activeName === 'config'"/>
      </el-tab-pane>
      <el-tab-pane label="Role" name="third">Role</el-tab-pane>
      <el-tab-pane label="others" name="fourth">
        <ul class="list-group list-group-flush" v-if="activeName === 'fourth'">
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
            <div class="user" v-for="(item, index) in allAdminList" :key="index">
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
                <el-button @click="operateAdminUser(item.email, 'showInIndex')">setAsIndexUser</el-button>
              </div>
            </div>
          </li>
        </ul>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import {fun} from "@/hook/function";
import Avatar from "@/components/common/Avatar.vue";
import {computed, reactive, ref} from "vue";
import FriendLinks from "@/components/admin/FriendLinks.vue";
import http from "@/common/api/request";
import Config from "@/components/admin/Config.vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";


let friendLinks = ref();
let activeName = ref("friendLinks");

// 存放所有的admin用户信息
let allAdminList = reactive({});
const store = useStore();
const router = useRouter();

const userInfoStore = computed(() => {
  return store.state.user;
});


/* @author icestone , 18:15
 * @date 2023/5/17
 * 操作admin用户
*/
const operateAdminUser = (email, operate) => {
  http.$axios({
    url: "/admin/operateUser",
    method: "POST",
    headers: {
      token: true
    },
    data: {
      email,
      operate
    }
  })
      .then(res => {
        fun.alert(res.message);
      })
      .catch(e => {
        console.log("e:");
        console.log(e);
      });
};

/* @author icestone , 17:56
 * @date 2023/5/17
 * 获取所有admin的信息
*/
const getAllAdminUserInfo = () => {
  http.$axios({
    url: "/admin/getAllAdminInfo",
    method: "POST",
    headers: {
      token: true
    }
  })
      .then(res => {
        allAdminList = res.result;
      })
      .catch(e => {
        console.log("e:");
        console.log(e);
      });
};
const initLinks = () => {
  // 请求友链信息
  http.$axios({
    url: "/admin/friendLinks",
    method: "POST",
    headers: {
      token: true
    }
  })
      .then(res => {
        fun.alert(res.message);
        if (res.success) {
          friendLinks.value = res.result;
        } else {
          console.log("error");
        }
      })
      .catch(e => {
        console.log("e:");
        console.log(e);
      });
};
const handleClick =
    (tab, event) => {
      console.log(tab.props.name);
      if (tab.props.name == "friendLinks") {
        initFriendLinks();
      }
    };

const initFriendLinks = () => {
  if (JSON.stringify(friendLinks).length > 10) {
    return;
  } else {
    initLinks();
  }
};
let isAdmin = ref('');
const initData = () => {
  console.log("store中的数据:");
  console.log(store.state);
  const tokenStr = JSON.parse(localStorage.getItem("userInfo"));
  if (tokenStr.email.length > 0) {
    // 有用户登录
    // 查询用户是否为admin用户
    http.$axios({
      url: "/user/isAdmin",
      method: "POST",
      headers: {
        token: true
      }
    })
        .then(res => {
          fun.alert(res.message);
          isAdmin.value = res.result;
          if (!res.result) {
            // 非admin用户
            // 重定向
            router.push("/login");
          } else {
          }
        })
        .catch(e => {
          console.log("e:");
          console.log(e);
        });

  } else {
    // 重定向
    router.push("/login");
  }
};

initLinks();
initData();
getAllAdminUserInfo();

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

.card-body {
  .detail {
    display: flex;
    flex-direction: column;
    align-content: flex-start
  }
}
</style>
