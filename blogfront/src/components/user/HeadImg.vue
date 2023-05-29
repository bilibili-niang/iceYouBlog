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
      </div>
    </div>

  </div>
</template>

<script setup>
import {useStore} from "vuex";
import {onMounted, ref,} from 'vue';
import {UploadProps} from 'element-plus'

import {ElMessage} from 'element-plus'

const store = useStore();
import http from '@/common/api/request'

// @date 2023/5/28 , @author icestone
// TODO 存放头图的list
const imgList = ref([]);
const token = store.state.user.userInfo.token;
// 预览图的list,这里应该存放的全是url,例如:
/*const srcList = [
  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
  'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
  'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
  'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
  'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
  'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
  'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
]*/
const previewImgList = ref([]);
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
          imgList.value = res.result;
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
 * TODO 图片上传
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
  getUserAllHeadImg();
}
/* @author icestone , 17:45
 * @date 2023/5/28
 * TODO 图片上传之前的回调
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
