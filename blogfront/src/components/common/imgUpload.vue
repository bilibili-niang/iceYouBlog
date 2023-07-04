<template>
  <div class="upload">
    <el-upload
        v-model:file-list="fileList"
        class="upload-demo"
        :action="action"
        :data="data"
        :headers="token"
        :on-success="success"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
    >
      <el-button>upload</el-button>
      <template #tip>
      </template>
    </el-upload>
  </div>
</template>

<script setup>
import { ElMessageBox } from 'element-plus'
import { reactive } from 'vue'

const emit = defineEmits(["result"])
const success = (res) => {
  if (res.success) {
    emit("result", res.result)
  }
}

const token = reactive({
  token: JSON.parse(localStorage.getItem('userInfo')) == null ? '' : JSON.parse(localStorage.getItem('userInfo')).token
})
const fileList = ( [] )
const props = defineProps({
  data: {
    type: Object,
    default: {}
  },
  action: {
    type: String,
    require: true
  }
})

const handleRemove = (file, uploadFiles) => {
  console.log(file, uploadFiles)
}

const handlePreview = (uploadFile) => {
  console.log(uploadFile)
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

<style scoped lang="less">
.upload {
  position: fixed;
  top: 10px;
  left: 10px;
  border-radius: .5rem;
  z-index: 99;
}
</style>
