<template>
  <!--单个用户的评论-->
  <el-divider content-position="left">{{ item.id }}</el-divider>
  <div class="aComment hvr-glow p-l p-l">
    <div class="avatar m-r">
      <Avatar :imgUrl="avatar"></Avatar>
    </div>
    <div class="detail">
      <div class="f-r">
        <div class="m-r">
          <el-tag class="ml-2 m-r" type="info">nickName</el-tag>
          <el-text>
            {{ item.nickName }}
          </el-text>
        </div>
        <div v-if="item.email">
          <el-tag class="ml-2 m-r" type="info">email</el-tag>
          <el-text>
            {{ item.email }}
          </el-text>
        </div>
        <div v-if="item.webSite">
          <el-tag class="ml-2 m-r" type="info">webSite</el-tag>
          <el-text>
            {{ item.webSite }}
          </el-text>
        </div>
      </div>

      <v-md-editor
          left-toolbar=""
          :include-level="[3,4]"
          mode="preview"
          v-model="item.content"></v-md-editor>
    </div>
  </div>
</template>

<script>
import http from "@/common/api/request"
import Avatar from "@/components/common/Avatar.vue";

export default {
  name: "Acomment",
  components: {Avatar},
  props: {
    item: {}
  },
  data() {
    return {
      avatar: '/images/avatars/defaultAvatar.png'
    }
  },
  created() {
    const email = this.item.email || null;
    if (email) {
      console.log(`请求${email}的头像`)
      http.$axios({
        url: "/user/getUserInfoByEmail/",
        method: 'POST',
        data: {
          email
        }
      })
          .then(res => {
            console.log("res:")
            console.log(res)
            this.avatar = res.result.avatar;
          })
          .catch(e => {
            console.log("e:")
            console.log(e)
          })

    } else {
      console.log('使用默认头像');
    }
  },

}
</script>

<style scoped lang="less">
.aComment {
  display: flex;
  flex-direction: row;
  border-radius: .5rem;
  background: #ffffff;
  padding: .3rem;
  margin: .3rem;

  .avatar {
    display: flex;
    align-items: center;
  }

  .detail {
    flex: 1;
  }
}

.v-md-editor {
  display: flex;
  min-height: 0;
  font-size: .9rem;

  :deep .github-markdown-body {
    padding: .3rem;
  }
}
</style>