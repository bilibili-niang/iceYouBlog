<template>
  <div class="links container">
    <div class="btns">
      <ice-button @click="drawer =!drawer">{{ drawer ? "close" : "add" }}</ice-button>
    </div>
    <ice-column v-if="drawer">
      <div class="inputLim">
        <el-input v-model="form.title" placeholder="Please input title"/>
        <el-input v-model="form.url" placeholder="Please input url"/>
      </div>

      <div class="btns">
        <ice-button @click="drawer = false">close</ice-button>
        <ice-button @click="subMitForm()">submit</ice-button>
      </div>
    </ice-column>

    <div class="cardLim">
      <div class="card" v-for="(item,index) in linkList" :key="index">
        <ice-avatar :src="item.img" block size="120" fit="fill" round></ice-avatar>
        <div class="card-body">
          <ice-text class="mx-1">{{ item.title }}</ice-text>
          <br>
          <ice-link :href="item.url" target="_blank">前往</ice-link>
        </div>
      </div>
    </div>
    <ice-text>
      评论区:
    </ice-text>
    <comment :user="commentUser" title="添加友链" :id="-1" type="friendLink"></comment>
    <CommentArea id="-1"></CommentArea>

  </div>
</template>

<script>
import http from "@/api/request";
import {ElMessage} from "element-plus";
import {h} from "vue";
import comment from "@/components/read/Comment/index.vue";
import CommentArea from "@/components/read/CommentArea/index.vue";

export default {
  name: "links",
  components: {CommentArea, comment},
  data() {
    return {
      linkList: [],
      drawer: false,
      form: {
        title: "",
        url: ""
      },
      commentUser: {
        name: "",
        url: "",
      },
    };
  },
  methods: {
    alertMessage(title, sub, color) {
      const useColor = color || "red";
      ElMessage({
        message: h("p", null, [
          h("span", null, title),
          h("i", {style: `color: ${useColor}`}, sub),
        ]),
      });
    },
    subMitForm() {
      http.$axios({
        url: "/admin/addLinks",
        method: "POST",
        data: {form: this.form}
      })
          .then(res => {
            if (res.success) {
              this.alertMessage("添加成功,重新获取数据");
              this.drawer = false;
              this.initLinks();
            }
          })
          .catch(e => {
            console.log("e:");
            console.log(e);
            this.alertMessage("添加失败");
            this.alertMessage(e);
          });

    },
    initLinks() {
      http.$axios({
        url: "/admin/friendLinks",
        method: "POST",
      })
          .then(res => {
            this.alertMessage(res.message);
            if (res.result.length == 0) {
              this.alertMessage("但是当前没有友链");
            } else {
              this.linkList = res.result;
            }
          })
          .catch(e => {
            this.alertMessage(e);
          });
    }
  },
  created() {
    this.initLinks();
  }
};
</script>

<style scoped lang="less">
.links{

  .inputLim{
    .el-input{
      margin-bottom: 0.3rem;
    }
  }

  .cardLim{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 1rem 1.3rem;

    .card{
      transition: @time-n;
      border: rgba(0, 0, 0, 0) 1px solid;
      border: @borderColor 1px solid;
      transition-duration: @time-n;
      border-radius: @radio-n;

      &:hover{
        border: @themeActiveColor 1px solid !important;
      }

      display: flex;
      flex-direction: column;
      width: 28%;
      margin: 0.3rem;
      padding: 0.3rem;

      .card-body{
        padding: 0.3rem;
      }

      img{
        display: flex;
        width: 5rem;
        height: 5rem;
      }
    }
  }
}

</style>