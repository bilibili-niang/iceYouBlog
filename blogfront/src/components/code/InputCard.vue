<template>
  <div class="inputCard">
    <ice-button @click="drawer = true" class="m-normal">add code</ice-button>
    <ice-column v-show="drawer">
      <ice-column>
        <ice-column>
          <ice-row>
            <ice-input v-model="form.title" placeholder="title" class="m-r"/>
            <ice-input v-model="form.tag1" placeholder="tag1" class="m-r"/>
            <ice-input v-model="form.tag2" placeholder="tag2" class="m-r"/>
            <ice-input v-model="form.tag3" placeholder="tag3" class="m-r"/>
          </ice-row>
          <el-text>description</el-text>
          <el-input v-model="form.description"/>
        </ice-column>
        <v-md-editor
            :include-level="[3,4,5]"
            @save="drawer = true"
            v-model="form.content"
            :disabled-menus="[]"
        ></v-md-editor>
      </ice-column>

      <div class="btns">
        <ice-button @click="submitCode()">submit</ice-button>
        <ice-button @click="showInput()">close</ice-button>
      </div>
    </ice-column>
  </div>
</template>

<script>
import http from "@/common/api/request";
import {ElMessage} from "element-plus";
import {h} from "vue";

export default {
  name: "InputCard",
  data() {
    return {
      showFlag: false,
      form: {
        title: "my title",
        tag1: "css",
        tag2: "html",
        tag3: "code",
        content: `> type your first code`,
        description: "description about this code"
      },
      drawer: false
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
    /* @author icestone , 17:27
     * @date 2023/5/16
     * 提交
    */
    submitCode() {
      http.$axios({
        url: "/code/codeClips",
        method: "POST",
        headers: {
          token: true
        },
        data: this.form
      })
          .then(res => {
            this.alertMessage(res.message);
            if (res.success) {
              // 成功
              this.showFlag = false;
            } else {
              // 失败
              console.log(res);
            }
          })
          .catch(e => {
            console.log(e);
          });
    },
    showInput() {
      console.log("showInput");
      this.showFlag = !this.showFlag;
    }
  }
};
</script>

<style scoped lang="less">
</style>
