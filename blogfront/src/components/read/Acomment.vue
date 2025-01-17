<template>
  <!--单个用户的评论-->
  <ice-row class="comment-area">
    <div class="avatar m-r">
      <Avatar :imgUrl="avatar"></Avatar>
    </div>
    <ice-column>
      <ice-column>
        <ice-row>
          <ice-text>nickName</ice-text>
          <ice-text>
            {{ item.nickName }}
          </ice-text>
        </ice-row>
        <ice-row v-if="item.email">
          <ice-text>email</ice-text>
          <ice-text>
            {{ item.email }}
          </ice-text>
        </ice-row>
        <ice-row v-if="item.webSite">
          <ice-text>webSite</ice-text>
          <ice-text>
            {{ item.webSite }}
          </ice-text>
        </ice-row>
      </ice-column>
      下面是评论区
      <MdRender :mode="editMod" v-model="copyItem.content"></MdRender>
      上面是评论区
      <div v-if="email === item.email" class="m-b m-t options">
        <ice-button @click="editMod = editMod === 'editable' ? 'preview' : 'editable'">编辑</ice-button>
        <ice-button @click="save" v-if="editMod == 'editable'">save</ice-button>
      </div>
    </ice-column>
  </ice-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import markdown from '@/api/markdownFiles'
import { fun } from '@/hook/function'
import MdRender from '@/components/MdRener/index.vue'

const props = defineProps({
  item: {
    type: Object,
    default: () => ({})
  },
  email: {
    type: String,
    default: ''
  }
})
const emits = defineEmits(['refresh'])
const avatar = ref('/images/avatars/defaultAvatar.png')
const editMod = ref('preview')
const copyItem = ref({
  content: ''
})

const save = async () => {
  const res = await markdown.updateComment({ data: copyItem.value })
  if (res.success) {
    emits('refresh', true)
    editMod.value = 'preview'
    fun.alert(res.message, '成功辣')
  } else {
    fun.alert(res.message, '失败辣')
  }
}

const init = () => {
  const email = props.item.email || null
  if (email) {
    markdown.getUserInfo({ email }).then(res => {
      avatar.value = res.result.avatar
    })
  }
  copyItem.value = props.item
}

init()
</script>
<style scoped lang="less">
.comment-area {
  background: rgba(0, 0, 0, 0.1);
}
</style>
