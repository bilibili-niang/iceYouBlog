<template>
  <div class="comment">

    <!--评论区-->
    <v-md-editor
        left-toolbar="undo redo"
        :include-level="[3,4]" @save="save()" v-model="content"></v-md-editor>
    <el-dialog v-model="dialogFormVisible" title="留言一下">
      <el-text>为文章
        <el-text tag="b">{{ title }}</el-text>
        留言
      </el-text>
      <template #footer>
          <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="submit">提交</el-button>
        </span>
      </template>
    </el-dialog>
    <el-button @click="dialogFormVisible = true" class="m-t">submit</el-button>

  </div>
</template>
<script>
import http from '@/common/api/request'
import {ElMessage} from "element-plus";
import Acomment from "@/components/read/Acomment.vue";

export default {
  components: { Acomment},
  props: {
    id: '',
    title: {},
    type: {},
    content: '',
    user: {},
  },
  data() {
    return {
      content: `> 支持markdown`,
      dialogFormVisible: false,
      oldId: 0,
    }
  },
  methods: {
    save() {
      this.dialogFormVisible = true;
    },
    submit() {
      console.log('save clicked')
      http.$axios({
        url: '/comment/addComment',
        method: 'POST',
        headers: {
          token: true
        },
        data: {
          id: this.id,
          type: this.type,
          content: this.content,
          user: this.user,
        }
      })
          .then(res => {
            this.open2(res.message)
          })
          .catch(e => {
            console.log("e:")
            console.log(e)
          })
      this.dialogFormVisible = false;
    },
    open2(msg) {
      ElMessage({
        showClose: true,
        message: msg,
        type: 'success',
      })
    },
  },
  watch: {
    id(newVal) {
      // this.getAllComment(newVal);
      this.oldId = newVal
    }
  }
}
</script>
<style scoped lang="less">
.v-md-editor {
  display: flex;
  min-height: 30vh;
}
</style>