<template>
  <div class="editUser container">
    <div class="form">
      <div style="margin: 20px"/>
      <el-form
          label-width="100px"
      >
        <div class="avatar">
          <Avatar :imgUrl="userInfo.avatar"></Avatar>
          <!--<div class="demo" @click="handleAvatarSuccess()">demo</div>-->
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
            <form action="/file/avatar"></form>
          </div>
        </div>
        <el-form-item label="avatar">
          <el-input v-model="userInfo.avatar"/>
        </el-form-item>
        <el-form-item label="id">
          <el-input v-model="userInfo.id" disabled="true"/>
        </el-form-item>

        <el-form-item label="Name">
          <el-input v-model="userInfo.username"/>
        </el-form-item>


        <el-form-item label="email">
          <el-input v-model="userInfo.email" disabled="true"/>
        </el-form-item>


        <el-form-item label="occupation">
          <el-input v-model="userInfo.occupation"/>
        </el-form-item>

        <el-form-item label="githubUrl">
          <el-input v-model="userInfo.githubUrl"/>
        </el-form-item>

        <el-form-item label="word">
          <el-input v-model="userInfo.word"/>
        </el-form-item>

        <el-form-item label="createdAt">
          <el-input v-model="userInfo.createdAt" disabled="true"/>
        </el-form-item>

      </el-form>
    </div>

    <!--成就/数据-->
    <div class="achievement">
      <el-form
          label-width="100px"
      >
        <el-form-item label="浏览量">
          <el-input v-model="markdownData.allView" disabled="true"/>
        </el-form-item>

        <el-form-item label="文章数量">
          <el-input v-model="markdownData.allNums" disabled="true"/>
        </el-form-item>

        <el-form-item label="点赞数量">
          <el-input v-model="markdownData.diggCounts" disabled="true"/>
        </el-form-item>
      </el-form>
    </div>
    <el-button @click="submitForm">提交一下!</el-button>

    <Alert :msg="alertInf" :show="showAlert"></Alert>
  </div>
</template>

<script>
import http from '../../common/api/request'
import Avatar from '@/components/common/Avatar.vue'
import Alert from '@/components/common/Alert.vue'

export default {
  name: "EditUser",
  data() {
    return {
      userInfo: {},
      markdownData: {},
      imageUrl: '',
      imgData: '',
      token: {token: 'demotoken'},
      alertInf: '',
      showAlert: false
    }
  },
  components: {
    Avatar,
    Alert
  },
  methods: {
    // 头像上传成功之后的callback
    async handleAvatarSuccess() {
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
      localStorage.setItem('userInfo', tokenStr);

    },
    // 上传之前的callback
    beforeAvatarUpload() {
      console.log('beforeAvatarUpload')


    },
    // 初始化用户数据
    async initUserData() {
      const res = await http.$axios({
        url: '/user/userInf',
        method: 'POST',
        headers: {
          token: true
        },
      })
      console.log("res:")
      console.log(res)
      // localStorage.setItem('userInfo', JSON.stringify(res.result.res));

      if (res.success) {
        this.userInfo = res.result.res;
        this.markdownData = res.result.markdown;
      }
    },
    // 提交用户更新表单:
    async submitForm() {
      console.log('submitForm')
      console.log("userInfo:")
      console.log(this.userInfo)

      // 提交
      const res = await http.$axios({
        url: '/user/updateUserInf',
        method: 'POST',
        headers: {
          token: true
        },
        data: {
          ...this.userInfo
        }
      })
      console.log('res')
      console.log(res)

      if (res.success) {
        // 更新成功
        this.alertInf = res.message || '更新成功';
        this.showAlert = true;
      } else {
        this.alertInf = res.message || '更新失败';
        this.showAlert = true;
      }

    }

  },
  created() {
    this.initUserData();
    // 获取token并赋值
    const token = JSON.parse(localStorage.getItem('userInfo'))
    this.token = token.token;
  }
}
</script>

<style scoped lang="less">
.editUser {
  .form {
    .avatar {
      display: flex;
      width: 100%;
      justify-content: center;
      padding: 10px;
      box-sizing: border-box;
      align-items: center;

      .btnGroup {
        margin-left: 10px;
      }

      .upload {
        margin-left: 20px;
      }
    }
  }
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  background: rgba(0, 0, 0, 0.1);
  font-size: 28px;
  color: #8c939d;
  width: 5rem;
  height: 5rem;
  text-align: center;
  border-radius: 50%;
}
</style>