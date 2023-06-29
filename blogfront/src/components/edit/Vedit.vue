<template>
  <div class="vEdit">
    <upload :action="action" :data="token" @result="getResult"></upload>
    <v-md-editor
        :include-level="[3,4,5]"
        @save="drawer = true"
        v-model="markdownData.content"
        :disabled-menus="[]"
        @upload-image="handleUploadImage"
    ></v-md-editor>
    <el-drawer v-model="drawer" title="填写关于该文章的其他信息" size="70%" direction="ttb" :with-header="false">
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
        <el-form-item label="headImg" label-width="100px">
          <el-input v-model="markdownData.headImg" autocomplete="off"/>
          <el-button @click="selectHeadImg">选择图片</el-button>
        </el-form-item>
      </el-form>
      <el-button @click="drawer = false">再想想</el-button>
      <el-button @click="submit">提交</el-button>
    </el-drawer>

    <el-drawer v-model="headImgDrawer" title="选择你的头图" size="90%" direction="ttb" :with-header="false">
      选择你的头图
      <!--下面是头图的预览-->
      <div class="demo-image__lazy">
        <div v-for="(item,index) in headImgList" :key="index" class="demo-image__preview" @click="setHeadImg(item.url)">
          <el-image
              :src="item.url"
              lazy
              fit="cover"
              :preview-src-list="previewImgList"
              :initial-index="index"
              :hide-on-click-modal="true"
              :close-on-press-escape="true"
          />
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import http from "@/common/api/request"
import { ElMessage } from "element-plus"
import { h } from "vue"
import upload from '@/components/common/imgUpload.vue'

export default {
  name: "Vedit",
  created () {
    this.initMarkdownData()
  },
  components: { upload },
  data () {
    return {
      id: 0,
      markdownData: {
        content: `> hello world!

type you first line code
`,
        title: '请输入你的标题',
        description: '这是我新建的文章',
        tag1: '',
        tag2: '',
        tag3: '',
        headImg: ''
      },
      drawer: false,
      // 头图的框
      headImgDrawer: false,
      headImgList: [],
      previewImgList: [],
      toolbar: {
        customToolbar1: {
          title: '基础工具栏',
          icon: 'v-md-icon-tip',
          action (editor) {
            editor.insert(function (selected) {
              const prefix = '((('
              const suffix = ')))'
              const placeholder = '请输入文本'
              const content = selected || placeholder

              return {
                text: `${ prefix }${ content }${ suffix }`,
                selected: content,
              }
            })
          },
        },
      },
      action: '/file/markdownImages',
      token: {
        token: JSON.parse(localStorage.getItem('userInfo')) == null ? '' : JSON.parse(localStorage.getItem('userInfo')).token
      }
    }
  },
  methods: {
    // 监听图片上传返回数据
    getResult (res) {
      console.log('成功返回的值:')
      console.log(res)
      if (res) {
        this.markdownData.content = this.markdownData.content + `![](/${ res.filePath })`
      }
    },
    // 监听图片的点击
    setHeadImg (url) {
      this.markdownData.headImg = url
    },
    selectHeadImg () {
      this.headImgDrawer = true
      //   获取头图
      http.$axios({
        url: '/user/headImg',
        method: 'POST',
        headers: {
          token: true
        },
      })
          .then(res => {
            console.log("res:")
            console.log(res)
            if (res.success) {
              this.headImgList = res.result
              this.previewImgList = this.headImgList.map(item => {
                return item.url
              })

            } else {
            }
          })
          .catch(e => {
            console.log("e:")
            console.log(e)
          })


    },
    /* @author icestone , 14:49
    * @date 2023/5/11
    * 上传图片
   */
    handleUploadImage (event, insertImage, files) {
      // 拿到 files 之后上传到文件服务器，然后向编辑框中插入对应的内容
      console.log("files")
      console.log(files)
      let form = new FormData()
      form.append('file', files)
      // 回显
      insertImage({
        url: '/images/2.png',
        desc: '回显图片名称',
        // width: 'auto',
        // height: 'auto',
      })
    },
    /* @author icestone , 16:05
     * @date 2023/5/6
     * 通过id获取初始化数据
    */
    initMarkdownData () {
      this.id = this.$route.query.id || '0'
      // @date 2023/5/8 , @author icestone
      // 没有传入id,为新建文章
      if (this.id == 0) {

      } else {
        // @date 2023/5/8 , @author icestone
        // 修改,则请求文章数据
        http.$axios({
          url: '/markdownFile/getData',
          method: 'POST',
          headers: {
            token: true
          },
          data: {
            id: this.id
          }
        })
            .then(res => {
              this.markdownData = res.result
            })
            .catch(e => {
              this.alertMessage(e)
            })
      }

    },
    // @date 2023/5/6 , @author icestone
    // 点击确认提交后执行
    submit () {
      if (this.id == 0) {
        // @date 2023/5/8 , @author icestone
        // 新建文章
        http.$axios({
          url: '/new/markdown',
          method: 'POST',
          headers: {
            token: true
          },
          data: this.markdownData
        })
            .then(res => {
              this.drawer = false
              if (res.success) {
                this.alertMessage(res.message)
              }
            })
            .catch(e => {
              this.alertMessage(e)
            })

      } else {
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
              this.drawer = false
              if (res.success) {
                this.alertMessage('数据更新', 'success', '#a1c4fd')
                // 成功,再次请求下数据
                this.initMarkdownData()
              }
            })
            .catch(e => {
              this.alertMessage('保存失败', e)
            })
      }
    },
    alertMessage (title, sub, color) {
      const useColor = color || 'red'
      ElMessage({
        message: h('p', null, [
          h('span', null, title),
          h('i', { style: `color: ${ useColor }` }, sub),
        ]),
      })
    },
  }
}
</script>

<style scoped lang="less">
.vEdit {
  display: flex;
  flex-direction: column;

  :deep div.el-drawer__body {
    padding: .3rem;
  }
}

.v-md-editor {
  min-height: 90vh;
  flex: 1;
}

//头图
.demo-image__lazy {
  height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;

  .demo-image__preview {
    display: flex;
    width: 50%;
  }

  .el-image {
    padding: .3rem;

    img {
      display: flex;
      width: 70%;
    }
  }
}
</style>
