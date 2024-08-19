<template>
  <div class="commentArea">
    <div class="havComment" v-if="commentFlag">
      <ice-text>
        暂无评论
      </ice-text>
    </div>
    <div class="commentList" v-if="!commentFlag">
      <div v-for="(item,index) in commentList" :key="index">
        <Acomment :item="item" :email="email" @refresh="getRefreshFlag"></Acomment>
      </div>
    </div>
  </div>
</template>

<script setup>
import http from "@/api/request"
import Acomment from "@/components/read/Acomment.vue"
import {reactive, ref, watch} from 'vue'
import {useStore} from 'vuex'

const email = useStore().state.user.userInfo.email

const props = defineProps({
  id: {
    default: 0
  },
  refresh: {
    type: Boolean
  }
})
// 关于该文章的评论
let commentList = reactive([])
let commentFlag = ref(true)
let oldId = ref()

/*
* 获取与该文章有关的评论
*/
const getAllComment = () => {
  http.$axios({
    url: '/comment/getCommentById',
    method: 'POST',
    headers: {
      token: true
    },
    data: {
      id: oldId.value,
    }
  })
      .then(res => {
        commentList = res.result
        if (commentList.length) {
          commentFlag.value = false
        }
      })
      .catch(e => {
        console.log("e:")
        console.log(e)
      })
}

/*
 *  评论成功,再次获取刷新数据
*/
const getRefreshFlag = (val) => {
  getAllComment()
}
watch(() => props.id, (newVal) => {
  oldId.value = newVal
  getAllComment()
})
watch(() => props.refresh, (newVal) => {
  getAllComment()
})
oldId.value = props.id
getAllComment()
</script>
