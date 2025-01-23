<template>
  <div
    class="articleEdit"
    v-if="closeAble"
    @click="
      () => {
        initMarkdownData()
      }
    "
  >
    <ice-row flexWrap class="article-info-container">
      <ice-row width="fit-content">
        <ice-text> 文章标题 </ice-text>
        <ice-input v-model="markdownData.title" />
      </ice-row>
      <ice-row width="fit-content">
        <ice-text>文章描述</ice-text>
        <ice-input v-model="markdownData.description" />
      </ice-row>
      <ice-row width="fit-content">
        <ice-text>文章tag1</ice-text>
        <ice-input v-model="markdownData.tag1" />
      </ice-row>
      <ice-row width="fit-content">
        <ice-text>文章tag2</ice-text>
        <ice-input v-model="markdownData.tag2" />
      </ice-row>
      <ice-row width="fit-content">
        <ice-text>文章tag3</ice-text>
        <ice-input v-model="markdownData.tag3" />
      </ice-row>
      <ice-button @click="drawer = false">再想想</ice-button>
      <ice-button @click="submit">提交</ice-button>
      <ice-button @click="selectHeadImg">选择头图</ice-button>
      <upload :action="actionUrl" :data="data" @result="getResult"></upload>
    </ice-row>
    <v-md-editor
      :include-level="[1, 2, 3, 4, 5]"
      @save="drawer = true"
      v-model="markdownData.content"
      :disabled-menus="[]"
      @upload-image="handleUploadImage"
      :autofocus="true"
      :toolbar="customToolBar"
    ></v-md-editor>
    <el-drawer v-model="drawer" title="填写关于该文章的其他信息" size="70%" direction="ttb" :with-header="false">
      <ice-row flexWrap>
        <ice-row width="fit-content">
          <ice-text> 文章标题 </ice-text>
          <ice-input v-model="markdownData.title" />
        </ice-row>
        <ice-row width="fit-content">
          <ice-text>文章描述</ice-text>
          <ice-input v-model="markdownData.description" />
        </ice-row>
        <ice-row width="fit-content">
          <ice-text>文章tag1</ice-text>
          <ice-input v-model="markdownData.tag1" />
        </ice-row>
        <ice-row width="fit-content">
          <ice-text>文章tag2</ice-text>
          <ice-input v-model="markdownData.tag2" />
        </ice-row>
        <ice-row width="fit-content">
          <ice-text>文章tag3</ice-text>
          <ice-input v-model="markdownData.tag3" />
        </ice-row>
      </ice-row>
      <ice-button @click="drawer = false">再想想</ice-button>
      <ice-button @click="submit">提交</ice-button>
    </el-drawer>

    <el-drawer v-model="headImgDrawer" title="选择你的头图" size="90%" direction="ttb" :with-header="false">
      选择你的头图
      <!--下面是头图的预览-->
      <div class="demo-image__lazy">
        <div
          v-for="(item, index) in headImgList"
          :key="index"
          class="demo-image__preview"
          @click="setHeadImg(item.url)"
        >
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
  <div v-else>
    <ice-text> 已经创建成功了,请回到首页查看 </ice-text>
  </div>
</template>

<script setup>
import './index.less'
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import upload from '@/components/common/imgUpload.vue'
import { iceMessage } from 'icepro'
import http from '@/api/request'
import api from '@/api'
const route = useRoute()

const id = ref(0)

const markdownData = ref({
  content: `> hello world!\ntype you first line code\n`,
  title: '请输入你的标题',
  description: '这是我新建的文章',
  tag1: '',
  tag2: '',
  tag3: '',
  headImg: ''
})
const drawer = ref(false)

const customToolBar = ref({
  customToolbar: {
    icon: 'save',
    title: 'hover时显示的标题',
    action(editor) {
      console.log(editor)
    }
  }
})

const headImgDrawer = ref(false)
const headImgList = ref([])
const previewImgList = ref([])
const data = ref()
// 是否关闭当前新建页面
const closeAble = ref(true)

const actionUrl = '/file/markdownImages'

function getResult(res) {
  if (res) {
    markdownData.value.content += `[](/${res.filePath})`
  }
}

function setHeadImg(url) {
  markdownData.value.headImg = url
}

async function selectHeadImg() {
  headImgDrawer.value = true
  try {
    const res = await http.$axios({
      url: '/user/headImg',
      method: 'POST',
      headers: {
        token: true
      }
    })
    if (res.success) {
      headImgList.value = res.result
      previewImgList.value = headImgList.value.map(item => item.url)
    }
  } catch (e) {
    console.error('e:')
    console.error(e)
  }
}

function handleUploadImage(event, insertImage, files) {
  const form = new FormData()
  form.append('file', files)
  insertImage({
    url: '/images/2.png',
    desc: '回显图片名称'
  })
}

const initMarkdownData = () => {
  console.log('route', route)
  id.value = route.query?.id
  if (id.value !== 0) {
    alertMessage('获取文章信息')
    api.getMarkdown(id.value).then(res => {
      markdownData.value = res.result
      alertMessage('信息加载成功')
    })
  }
}

async function submit() {
  if (id.value === 0) {
    alertMessage('创建文章')
    api.createMarkdown(markdownData.value).then(res => {
      if (res.success) {
        alertMessage(res.message)
        drawer.value = false
        setTimeout(() => {
          closeAble.value = !closeAble.value
        }, 1500)
      }
    })
  } else {
    alertMessage('更新文章')
    await api.updateMarkdown({ markdownData: markdownData.value }).then(res => {
      if (res.success) {
        alertMessage('数据更新')
        initMarkdownData()
        drawer.value = false
      } else {
        alertMessage(res.msg)
      }
    })
  }
}

function alertMessage(title, sub) {
  iceMessage({
    message: title + (sub ? sub : ''),
    color: 'yinzhu'
  })
}
onMounted(initMarkdownData)
</script>
