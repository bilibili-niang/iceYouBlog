<template>
  <div class="inputCard">
    <el-button @click="drawer = true">add code</el-button>
    <el-drawer v-model="drawer" title="新增code" size="70%" direction="ttb" :with-header="false">
      {{form}}
      <div class="form">
        <div class="des">
          <div class="desLim m-b">
            <el-text class=m-r>title</el-text>
            <el-input v-model="form.title" autocomplete="off"/>
            <el-text class=m-r>tag1</el-text>
            <el-input v-model="form.tag1" autocomplete="off"/>
          </div>
          <div class="desLim m-b">
            <el-text class=m-r>tag2</el-text>
            <el-input v-model="form.tag2" autocomplete="off"/>
            <el-text class=m-r>tag3</el-text>
            <el-input v-model="form.tag3" autocomplete="off"/>
          </div>
          <el-text>description</el-text>
          <el-input v-model="form.description" autocomplete="off"/>
        </div>
        <v-md-editor
            :include-level="[3,4,5]"
            @save="drawer = true"
            v-model="form.content"
            :disabled-menus="[]"
        ></v-md-editor>
      </div>

      <div class="btns">
        <el-button @click="submitCode()">submit</el-button>
        <el-button @click="showInput()">close</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import http from '@/common/api/request';
import {ElMessage} from 'element-plus';
import {h} from 'vue';

export default {
  name: "InputCard",
  data() {
    return {
      showFlag: false,
      form: {
        title: 'my title',
        tag1: 'css',
        tag2: 'html',
        tag3: 'code',
        content: `> type your first code`,
        description: 'description about this code'
      },
      drawer: false
    }
  },
  methods: {
    alertMessage(title, sub, color) {
      const useColor = color || 'red';
      ElMessage({
        message: h('p', null, [
          h('span', null, title),
          h('i', {style: `color: ${useColor}`}, sub),
        ]),
      })
    },
    /* @author icestone , 17:27
     * @date 2023/5/16
     * TODO 提交
    */
    submitCode() {
      console.log("this.form:")
      console.log(this.form)
      http.$axios({
        url: '/code/codeClips',
        method: 'POST',
        headers: {
          token: true
        },
        data: this.form
      })
          .then(res => {
            this.alertMessage(res.message);
            if (res.success) {
              // 成功
              console.log(res)
              this.showFlag = false;
              this.form = null;
            } else {
              // 失败
              console.log(res)
            }
          })
          .catch(e => {
            console.log(e)
          })
    },
    showInput() {
      console.log('showInput')
      this.showFlag = !this.showFlag;
    }
  }
}
</script>

<style scoped lang="less">
.inputCard {
  :deep .el-input {
    width: auto;
    margin-right: .3rem;
  }

  .des {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;

    .desLim {
      display: flex;
      flex-direction: row;
    }
  }

  .v-md-editor {
    min-height: 40vh;
  }
}
</style>