<template>
  <div class="editMarkdown">
    <el-affix :offset="10">
      <div class="btns">
        <el-button @click="dialogFormVisible = true">
          发布
        </el-button>
        <el-button @click="goToRead(id)">前往查看</el-button>
        <el-dialog v-model="dialogFormVisible" title="填写关于该文章的其他信息">
          <el-form>
            <el-form-item label="文章标题" label-width="100px">
              <el-input v-model="markdownData.title" autocomplete="off"/>
            </el-form-item>
            <el-form-item label="文章描述" label-width="100px">
              <el-input v-model="markdownData.description" autocomplete="off"/>
            </el-form-item>
            <el-form-item label="文章tag1" label-width="100px">
              <el-input v-model="markdownData.tag1" autocomplete="off"/>
            </el-form-item>
            <el-form-item label="文章tag2" label-width="100px">
              <el-input v-model="markdownData.tag2" autocomplete="off"/>
            </el-form-item>
            <el-form-item label="文章tag3" label-width="100px">
              <el-input v-model="markdownData.tag3" autocomplete="off"/>
            </el-form-item>
          </el-form>
          <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogFormVisible = false">再想想</el-button>
            <el-button type="primary" @click="submit">接受更改并提交</el-button>
          </span>
          </template>
        </el-dialog>

      </div>
    </el-affix>
    <div class="editLim">
      <div class="write">
        <el-input
            type="textarea"
            class="writeArea"
            :rows="20"
            placeholder="请输入内容"
            v-model="article">
        </el-input>
      </div>

      <div class="show" v-html="showArticle"></div>
    </div>
  </div>
</template>

<script>
import http from '../../common/api/request'
import 'highlight.js/styles/idea.css'
import {marked} from 'marked'
import hljs from 'highlight.js';
import {ElMessage} from 'element-plus'
import {h} from 'vue'

export default {
  name: "EditMarkdown",
  data() {
    return {
      dialogFormVisible: false,
      // 即将编辑的文章id
      id: 0,
      markdownData: {},
      userInf: {},
      dataExist: true,
      article: '',
      showArticle: ''
    }
  },
  created() {
    this.initData();
  },
  methods: {
    goToRead(id) {
      const routeUrl = this.$router.resolve({
        path: "/read",
        query: {id}
      });
      window.open(routeUrl.href, '_blank');
    },
    alertMessage(title, sub, color) {
      const useColor = color || 'red';
      ElMessage({
        message: h('p', null, [
          h('span', null, title),
          h('i', {style: `color: ${useColor}`}, sub),
        ]),
      })
    },
    // 提交更新数据
    submit() {
      // 取消弹窗
      this.dialogFormVisible = false
      http.$axios({
        url: '/markdownFile/update',
        method: 'POST',
        headers: {
          token: true
        },
        data: {
          markdownData: this.markdownData,
        }
      })
          .then(res => {
            console.log(res)
            if (res.success) {
              this.alertMessage('数据更新', 'success', '#a1c4fd')

              // 成功,再次请求下数据
              this.initData();
            }
          })
          .catch(e => {
            this.alertMessage('数据更新', 'error')
            this.alertMessage('失败原因', e)
          })
    },
    // 获取要编辑的文章id并渲染数据
    initData() {
      this.id = this.$route.query.id || 0;
      http.$axios({
        url: '/markdownFile/getData',
        method: 'POST',
        headers: {
          token: true
        },
        data: {
          id: this.id,
        }
      })
          .then(res => {
            console.log("res:")
            console.log(res)

            if (!res.success) {
              console.log('文章不存在')
              /* this.markdownData = res.message;
               this.article = "文章数据不存在或已被删除";
               this.userInf = res.message;*/
              this.dataExist = !this.dataExist;
            } else {
              console.log('文章存在')
              this.dataExist = true;
              const flag = JSON.stringify(res.result).length < 3 ? false : true;
              if (flag) {
                // 即将渲染的文章数据
                this.markdownData = res.result;
                this.article = res.result.content;
                this.userInf = res.userInf;
              } else {
                // 失败
                this.dataExist = false;
              }
            }

          })
          .catch(e => {
            console.log(e)
            console.log('失败')
          })
    },

    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext'
      return hljs.highlight(code, {language}).value
    },
  },
  mounted() {
    marked.setOptions({
      renderer: new marked.Renderer(),
      highlight: function (code, lang) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext'
        return hljs.highlight(code, {language}).value
      },
      langPrefix: 'hljs language-',
      pedantic: false,
      gfm: true,
      breaks: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml: false
    })
    const blocks = document.querySelectorAll('pre code');
    blocks.forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  watch: {
    article(newVal) {
      this.showArticle = marked(newVal)
      this.markdownData.content = newVal;

    }
  }
}
</script>

<style scoped lang="less">
.editMarkdown {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  padding-left: 0.3rem;
  padding-right: 0.3rem;
}

.editLim {
  display: flex;
  flex-direction: row;
  height: auto;
  width: 100%;
  padding-bottom: 15rem;

  .write, .show {
    display: flex;
    width: 50%;
    flex-direction: column;
  }

  .write {
    .writeArea {
      display: flex;
      height: 100%;

      textarea {
        height: 100%;
      }
    }
  }
}
</style>