<template>
  <div class="test container">
    <v-md-editor
        :include-level="[3,4,5]"
        @save="save"
        v-model="markdownData.content"
        :disabled-menus="[]"
        @upload-image="handleUploadImage"
    ></v-md-editor>

    <el-upload
        v-model:file-list="fileList"
        class="upload-demo"
        action="/file/markdownImages"
        multiple
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :limit="3"
        :data="uploadType"
        :on-exceed="handleExceed"
    >
      <el-button type="primary">Click to upload</el-button>
      <template #tip>
        <div class="el-upload__tip">
          jpg/png files with a size less than 500KB.
        </div>
      </template>
    </el-upload>

    头像上传:
    <div class="upload">
      <el-upload
          class="avatar-uploader"
          :data="{token}"
          action="/file/avatar"
          :show-file-list="true"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar"/>
        <el-icon v-else class="avatar-uploader-icon">
          <Plus/>
        </el-icon>
      </el-upload>
    </div>
  </div>
</template>

<script setup>
import http from '@/common/api/request'
import axios from 'axios'
import { reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const uploadType = reactive({
  type: 'markdown'
})
const imageUrl = ref('')
const token = reactive({ token: 'demotoken' })
const handleAvatarSuccess = async () => {
  console.log('handleAvatarSuccess')
  // 请求一次后端的token并存入session
  const res = await http.$axios({
    url: '/user/getUserInfByToken',
    method: 'POST',
    headers: {
      token: true
    },
  })
  const tokenStr = JSON.stringify(res.result.res)
  console.log('tokenStr')
  console.log(tokenStr)
  localStorage.setItem('userInfo', tokenStr)
}
// 上传之前的callback
const beforeAvatarUpload = () => {
  console.log('beforeAvatarUpload')
}

const handleUploadImage = async (event, insertImage, files) => {
  // 拿到 files 之后上传到文件服务器，然后向编辑框中插入对应的内容
  console.log("files")
  console.log(files)
  let formData = new FormData()
  formData.append('avatar', files)
  /*http.$axios({
    url: '/file/markdownImages',
    data: formData,
    method: 'POST',
    headers: {
      token: true
    },
  })*/
  await axios({
    url: '/file/markdownImages',
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: formData
  })
      .then(res => {
        console.log("res:")
        console.log(res)
      })
      .catch(e => {
        console.log("e:")
        console.log(e)
      })
  let form = new FormData()
  form.append('file', files)
  // 回显
  insertImage({
    url: '/2.png',
    desc: '回显图片名称',
    // width: 'auto',
    // height: 'auto',
  })
}

const markdownData = reactive({
  content: `> 你好,这个是测试`
})
const save = () => {
  console.log('save once')
}


const fileList = ref([])

const handleRemove = (file, uploadFiles) => {
  console.log(file, uploadFiles)
}

const handlePreview = (uploadFile) => {
  console.log(uploadFile)
}

const handleExceed = (files, uploadFiles) => {
  ElMessage.warning(
      `The limit is 3, you selected ${ files.length } files this time, add up to ${
          files.length + uploadFiles.length
      } totally`
  )
}

const beforeRemove = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(
      `Cancel the transfer of ${ uploadFile.name } ?`
  ).then(
      () => true,
      () => false
  )
}

</script>

<style scoped>

</style>
