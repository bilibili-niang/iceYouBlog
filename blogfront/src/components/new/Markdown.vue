<template>
  <div class="markdown">

  </div>
</template>

<script>
import {marked} from 'marked';
import 'highlight.js/styles/foundation.css'
import alert from '@/components/markdown/Alert.vue'
import http from '@/common/api/request'

export default {
  name: "markdown",
  data() {
    return {
      title: 'demo',
      // 渲染后的数据
      articleAfter: '',
      dialogFormVisible: false,
      formLabelWidth: '120px',
      form: {
        tag1: '不存在的tag1',
        tag2: '存在的tag2',
        tag3: '没用的tag3',
        desc: '关于文章的描述',
        article: `> Hello World!`
      },
    }
  },
  components: {
    alert
  },
  methods: {
    subMitForm() {
      console.log('提交文章数据')
      this.dialogFormVisible = false;
      http.$axios({
        url: '/new/markdown',
        method: 'POST',
        headers: {
          token: true
        },
        data: {
          title: this.title,
          content: this.form.article,
          desc: this.form.desc,
          tag1: this.form.tag1,
          tag2: this.form.tag2,
          tag3: this.form.tag3,
        }
      })
          .then(res => {
            if (res.success) {
              const id = res.res.result.id
              const routeUrl = this.$router.resolve({
                path: "/read",
                query: {
                  id
                }
              });
              window.open(routeUrl.href, '_blank');
            }
          })
          .catch(e => {
            console.log('e')
            console.log(e)
          })
    }
  },
  created() {
    console.log('created')
  },
  watch: {
    'form.article': {
      handler(newVal) {
        // todo
        this.articleAfter = marked.parse(newVal)
      },
    }
  },
  mounted() {
    this.articleAfter = marked.parse(this.form.article)
    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: true,
      smartLists: true,
      smartypants: false
    })
  }
}
</script>
<style scoped lang="less">
.markdown {
  display: flex;
  width: 100%;
  flex-direction: column;
  padding-left: 2rem;
  padding-right: 2rem;

  .header {
    display: flex;
    flex-direction: row;
    width: 100%;

    .title {
      flex: 1;
      padding: 10px;
    }

    .submit {
      display: flex;
      width: auto;

      .el-form-item {
        margin-bottom: 0;
      }

      .el-input {
        margin-bottom: 18px;
      }
    }
  }

  .write {
    display: flex;
    width: 100%;
    box-sizing: border-box;

    .writeCon {
      display: flex;
      flex-direction: row;
      width: 100%;

      .writeArea {
        display: flex;
        width: 50%;
        min-height: 900px;
      }

      .show {
        flex: 1;
      }
    }
  }
}
</style>