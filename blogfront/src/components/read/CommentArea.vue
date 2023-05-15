<template>
  <div class="commentArea">
    <div class="havComment" v-if="commentFlag">
      <el-text>
        暂无评论
      </el-text>
    </div>
    <div class="commentList" v-if="!commentFlag">
      <div v-for="(item,index) in commentList" :key="index">
        <Acomment :item="item"></Acomment>
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/common/api/request";
import Acomment from "@/components/read/Acomment.vue";

export default {
  name: "CommentArea",
  components: {Acomment},
  props: {
    id: 0,
    refresh: {
      type: Boolean
    }
  },
  data() {
    return {
      // 关于该文章的评论
      commentList: [],
      commentFlag: true,
    }
  },
  methods: {
    /* @author icestone , 16:09
 * @date 2023/5/11
 * TODO 获取与该文章有关的评论
*/
    getAllComment(id) {
      http.$axios({
        url: '/comment/getCommentById',
        method: 'POST',
        headers: {
          token: true
        },
        data: {
          id,
        }
      })
          .then(res => {
            this.commentList = res.result;
            if (this.commentList.length) {
              this.commentFlag = false;
            }
          })
          .catch(e => {
            console.log("e:")
            console.log(e)
          })
    },
  },
  watch: {
    id(newVal) {
      this.oldId = newVal;
      console.log('子组件的id发生变化')
      this.getAllComment(this.oldId);
    }
  }
}
</script>

<style scoped>

</style>