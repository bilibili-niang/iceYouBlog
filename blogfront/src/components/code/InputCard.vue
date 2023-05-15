<template>
  <div class="inputCard">
    <el-button @click="drawer = true">add</el-button>
    <el-drawer v-model="drawer" title="新增code" size="70%" direction="ttb" :with-header="false">
      <el-form>
        <el-form-item label="title" label-width="100px">
          <el-input v-model="form.title" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="tag1" label-width="100px">
          <el-input v-model="form.tag1" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="tag2" label-width="100px">
          <el-input v-model="form.tag2" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="tag3" label-width="100px">
          <el-input v-model="form.tag3" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="content" label-width="100px">
          <el-input
              v-model="form.content"
              :rows="13"
              type="textarea"
              placeholder="Please input content"
          />
        </el-form-item>

        <el-form-item label="description" label-width="100px">
          <el-input v-model="form.description" autocomplete="off"/>
        </el-form-item>

      </el-form>

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
        title: '这是我的标题',
        tag1: 'css',
        tag2: 'html',
        tag3: 'demo',
        content: `.list-group {
      z-index: 3;
      .list-group-item{

        padding: 0.3rem;
      }
    }`,
        description: '这个是css的代码,有些不懂的就写在这里了'
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

</style>