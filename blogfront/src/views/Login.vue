<template>
  <div class="login container">
    <div class="form hover-around-shadow animation-time">
      <el-input v-model="login.username" placeholder="Please input username"/>
      <el-input v-model="login.password" placeholder="Please input pwd"/>
      <div class="btns">
        <el-button @click="submit">登录</el-button>
        <el-button @click="getToken">get</el-button>
      </div>
    </div>
  </div>
  <Alert :msg="alertInf" :show="showAlert"></Alert>


</template>

<script>
import http from '../common/api/request';
import router from '@/router';
import Alert from '@/components/common/Alert.vue';
import {ElMessage} from 'element-plus';
import {h} from 'vue';

export default {
  name: "Login",
  data() {
    return {
      login: {
        username: '',
        password: ''
      },
      warning: false,
      alertInf: '暂无消息',
      showAlert: false,
    }
  },
  methods: {
    alertMessage(title, sub, color) {
      const useColor = color || 'red';
      ElMessage({
        message: h('p', null, [
          h('span', null, title),
          h('i', {style: `color: ${useColor}`}, sub),
        ]),
      })
    },
    async submit() {
      if (this.login.username.length < 1 || this.login.password.length < 1) {
        console.log('data error')
      }
      const res = await http.$axios({
        url: '/user/login',
        method: 'POST',
        data: this.login,
      })
      if (!res.success) {
        // 登录失败
        this.alertInf = res.message;
        this.showAlert = true;
        this.alertMessage(res.message)
      } else {
        // 登陆成功
        this.alertMessage(res.message)
        const userInfo = res.result || '';
        console.log('即将写入的user信息')
        console.log(JSON.stringify(userInfo))
        // 写入token
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        this.alertMessage('已有用户登录,跳转用户页面')
        // 跳转user页面
        router.push({path: '/user'});
      }
    },
    getToken() {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (JSON.stringify(userInfo) > 10) {
        console.log(userInfo);
        console.log(userInfo.id);
      } else {
        console.log('token is null')
      }
    },
    // 验证用户是否登录,如果登录,跳转个人页面
    verifyLogin() {
      const user = localStorage.getItem("userInfo");
      console.log('localStorage:')
      console.log(user)
      // 没有用户登录
      if (JSON.stringify(user).length < 10) {
        localStorage.removeItem('userInfo');
        return
      } else {
        // 有用户登录,跳转user页面
        router.push({path: '/user'});
      }
    }
  },
  created() {
    this.verifyLogin();
  },
  components: {
    Alert
  }
}
</script>
<style scoped lang="less">
.login {
  padding-top: 1rem;
  align-items: center;

  .form {
    padding: 0.3rem;
    background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
    /* 背景尺寸 - 原理3 */
    background-size: 600% 600%;
    /* 循环动画 - 原理4 */
    animation: backgroundChange 5s ease infinite;
    border-radius: 0.5rem;

    .el-input {
      margin-top: 0.5rem;
      border-radius: 0.5rem;
    }

    .btns {
      margin-top: 0.5rem;
    }
  }
}

@keyframes backgroundChange {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

</style>
