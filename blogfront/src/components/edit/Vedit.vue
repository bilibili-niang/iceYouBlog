<template>
  <div class="vEdit">
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
      </el-form>
      <el-button @click="drawer = false">再想想</el-button>
      <el-button type="primary" @click="submit">提交</el-button>
    </el-drawer>
  </div>
</template>

<script>
import http from "@/common/api/request";
import {ElMessage} from "element-plus";
import {h} from "vue";

export default {
  name: "Vedit",
  created() {
    this.initMarkdownData();
  },
  data() {
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
      },
      drawer: false,
      toolbar: {
        customToolbar1: {
          title: '基础工具栏',
          icon: 'v-md-icon-tip',
          action(editor) {
            editor.insert(function (selected) {
              const prefix = '(((';
              const suffix = ')))';
              const placeholder = '请输入文本';
              const content = selected || placeholder;

              return {
                text: `${prefix}${content}${suffix}`,
                selected: content,
              };
            });
          },
        },
      }
    }
  },
  methods: {
    /* @author icestone , 14:49
 * @date 2023/5/11
 * TODO 上传图片
*/
    handleUploadImage(event, insertImage, files) {
      // 拿到 files 之后上传到文件服务器，然后向编辑框中插入对应的内容
      console.log("files");
      console.log(files);
      let form = new FormData();
      form.append('file', files);
      // 回显
       insertImage({
         url: '/images/2.png',
         desc: '回显图片名称',
         // width: 'auto',
         // height: 'auto',
       });
    },
    /* @author icestone , 16:05
     * @date 2023/5/6
     * TODO 通过id获取初始化数据
    */
    initMarkdownData() {
      this.id = this.$route.query.id || '0';
      // @date 2023/5/8 , @author icestone
      // TODO 没有传入id,为新建文章
      if (this.id == 0) {

      } else {
        // @date 2023/5/8 , @author icestone
        // TODO 修改,则请求文章数据
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
              this.markdownData = res.result;
            })
            .catch(e => {
              this.alertMessage(e)
            })
      }

    },
    // @date 2023/5/6 , @author icestone
    // TODO 点击确认提交后执行
    submit() {
      if (this.id == 0) {
        // @date 2023/5/8 , @author icestone
        // TODO 新建文章
        http.$axios({
          url: '/new/markdown',
          method: 'POST',
          headers: {
            token: true
          },
          data: this.markdownData
        })
            .then(res => {
              this.drawer = false;
              if (res.success) {
                this.alertMessage(res.message);
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
              this.drawer = false;
              if (res.success) {
                this.alertMessage('数据更新', 'success', '#a1c4fd')
                // 成功,再次请求下数据
                this.initMarkdownData();
              }
            })
            .catch(e => {
              this.alertMessage('保存失败', e)
            })
      }
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
</style>