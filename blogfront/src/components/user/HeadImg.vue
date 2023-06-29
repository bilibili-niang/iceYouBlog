<template>
  <div class="headImg container">
    <!--头图的上传-->
    <div class="upload">
      <el-text>
        或者你可以上传图片:
      </el-text>
      <el-upload
          class="avatar-uploader"
          :data="{token}"
          action="/file/headImg"
          :show-file-list="true"
          :on-success="uploadSuccess"
          :before-upload="beforeAvatarUpload">
        <el-icon class="avatar-uploader-icon">
          <Plus/>
        </el-icon>
      </el-upload>
      <form action="/file/avatar"></form>
    </div>
    <!--下面是头图的预览-->
    <div class="demo-image__lazy">
      <div v-for="(item,index) in imgList" :key="index" class="demo-image__preview">
        <el-image
            :src="item.url"
            lazy
            fit="cover"
            :preview-src-list="previewImgList"
            :initial-index="index"
            :hide-on-click-modal="true"
            :close-on-press-escape="true"
        />
        <el-button text @click="open(item.url)">删除</el-button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { useStore } from "vuex"
import { onMounted, ref, } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import http from '@/common/api/request'

const api = require('@/common/api')

const store = useStore()
const open = (e) => {
  ElMessageBox.confirm(
      '确定删除该图片吗',
      'Warning',
      {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      }
  )
      .then(() => {
        console.log('确认')
        api.operateImage('del', e)
        ElMessage({
          type: 'success',
          message: 'Delete completed',
        })
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: 'Delete canceled',
        })
      })
}

// @date 2023/5/28 , @author icestone
// 存放头图的list
const imgList = ref([])
const token = store.state.user.userInfo.token
// 预览图的list,这里应该存放的全是url
const previewImgList = ref([])
console.log(store.state.user.userInfo)

onMounted(() => {
  getUserAllHeadImg()
})
const getUserAllHeadImg = () => {
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
          imgList.value = res.result
          previewImgList.value = imgList.value.map(item => {
            return item.url
          })
        } else {

        }
      })
      .catch(e => {
        console.log("e:")
        console.log(e)
      })
}

/* @author icestone , 17:44
 * @date 2023/5/28
 * 图片上传
*/
const uploadSuccess = async () => {
  console.log('handleAvatarSuccess')
  // 请求一次后端的token并存入session
  const res = await http.$axios({
    url: '/user/getUserInfByToken',
    method: 'POST',
    headers: {
      token: true
    },
  })
  getUserAllHeadImg()
}
/* @author icestone , 17:45
 * @date 2023/5/28
 * 图片上传之前的回调
*/
const beforeAvatarUpload = (rawFile) => {
  console.log("rawFile")
  console.log(rawFile)
  console.log("rawFile.size")
  console.log(rawFile.size)
  if (rawFile.size <= 2000000) {
    ElMessage.success('上传成功')
    return true
  } else {
    ElMessage.error('请选择2mb大小以下的图片')
    return false
  }
}

</script>

<style scoped lang="less">
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

.demo-image__lazy .el-image {
  display: block;
  min-height: 200px;
  margin-bottom: 10px;
}

.demo-image__lazy .el-image:last-child {
  margin-bottom: 0;
}
</style>
