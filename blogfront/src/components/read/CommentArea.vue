<template>
  <div class="commentArea">
    <div class="havComment" v-if="commentFlag">
      <el-text>
        暂无评论
      </el-text>
    </div>
    <div class="commentList" v-if="!commentFlag">
      <div v-for="(item,index) in commentList" :key="index">
        <Acomment :item="item" :email="email" @refresh="getRefreshFlag"></Acomment>
      </div>
    </div>
  </div>
</template>

<script setup>
import http from "@/common/api/request"
import Acomment from "@/components/read/Acomment.vue"
import { reactive, ref, watch } from 'vue'
import { useStore } from 'vuex'

const email = useStore().state.user.userInfo.email

console.log('email')
console.log(email)
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

/* @author icestone , 16:09
* @date 2023/5/11
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

/* @author 张嘉凯
 * @date 2023/7/7 @time 14:31
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

<style scoped>

</style>
