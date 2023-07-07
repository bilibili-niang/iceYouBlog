<template>
  <!--单个用户的评论-->
  <el-divider content-position="left"></el-divider>
  <div class="aComment hvr-glow p-l p-l">
    <div class="avatar m-r">
      <Avatar :imgUrl="avatar"></Avatar>
    </div>
    <div class="detail">
      <div class="f-r">
        <div class="m-r m-b">
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
          :mode="editMod"
          v-model="copyItem.content"></v-md-editor>
      <div v-if="email===item.email" class="m-b m-t options">
        <el-button @click="editMod=editMod==='editable'?'preview':'editable'">
          编辑
        </el-button>
        <el-button @click="save" v-if="editMod=='editable'">save</el-button>
      </div>

    </div>
  </div>
</template>

<script>
import Avatar from "@/components/common/Avatar.vue"
import markdown from '@/common/api/markdownFiles'

const fun = require('@/hook/function')

export default {
  name: "Acomment",
  components: { Avatar },
  props: {
    item: {},
    email: ''
  },
  data () {
    return {
      avatar: '/images/avatars/defaultAvatar.png',
      editMod: 'preview',
      copyItem: ''
    }
  },
  methods: {
    async save () {
      const res = await markdown.updateComment({ data: this.copyItem })
      if (res.success) {
        this.$emit('refresh', true)
        this.editMod = 'preview'
        fun.alert(res.message,'成功辣')
      } else {
        fun.alert(res.message,'失败辣')
      }
    }
  },
  created () {
    const email = this.item.email || null
    if (email) {
      markdown.getUserInfo({ email })
          .then(res => {
            this.avatar = res.result.avatar
          })

    } else {
    }
    this.copyItem = this.item
  },

}
</script>

<style scoped lang="less">
.dark {
  .aComment {
    background: rgba(0, 0, 0, .3);
  }
}

.aComment {
  display: flex;
  flex-direction: row;
  border-radius: .5rem;
  padding: .3rem;
  margin: .3rem;

  &:hover {
    .options {
      opacity: 1;
    }
  }

  .avatar {
    display: flex;
    align-items: center;
  }

  .detail {
    flex: 1;
  }

  .options {
    opacity: 0;
    transition-duration: .3s;
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
