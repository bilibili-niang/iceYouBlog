<template>
<div class="comment">

  <!--评论区-->
  <v-md-editor
      left-toolbar="undo redo"
      :include-level="[3,4]" @save="save()" v-model="content"></v-md-editor>
  <ice-column v-show="dialogFormVisible" title="留言一下">
    <ice-text>为 {{ title }} 留言</ice-text>
    <ice-row>
      <ice-button @click="dialogFormVisible = false">取消</ice-button>
      <ice-button type="primary" @click="submit">提交</ice-button>
    </ice-row>
  </ice-column>
  <ice-button @click="dialogFormVisible = true" class="m-t">submit</ice-button>

</div>
</template>
<script>
  import http from "@/api/request";
  import {ElMessage} from "element-plus";
  import Acomment from "@/components/read/Acomment.vue";

  export default {
    components: {Acomment},
    props: {
      id: "",
      title: {},
      type: {},
      content: "",
      user: {},
    },
    data() {
      return {
        content: `> 支持markdown`,
        dialogFormVisible: false,
        oldId: 0,
      };
    },
    methods: {
      save() {
        this.dialogFormVisible = true;
      },
      submit() {
        console.log("save clicked");
        http.$axios({
          url: "/comment/addComment",
          method: "POST",
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
              this.open2(res.message);
              this.$emit("refreshComments", true);
            })
            .catch(e => {
              console.log("e:");
              console.log(e);
            });
        this.dialogFormVisible = false;
      },
      open2(msg) {
        ElMessage({
          showClose: true,
          message: msg,
          type: "success",
        });
      },
    },
    watch: {
      id(newVal) {
        // this.getAllComment(newVal);
        this.oldId = newVal;
      }
    }
  };
</script>
<style scoped lang="less">
  .v-md-editor {
    display: flex;
    min-height: 30vh;
  }
</style>
