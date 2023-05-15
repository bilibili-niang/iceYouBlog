<template>
  <div class="register container">
    <div class="form">

      <el-alert title="warning alert" type="warning"/>

      <el-input v-model="login.email" placeholder="Please input email" clearable/>
      <el-input v-model="login.username" placeholder="Please input username" clearable/>
      <el-input v-model="login.password" placeholder="Please input pwd" clearable/>

      <el-button @click="submit">submit</el-button>
      <el-button @click="getToken">get</el-button>

    </div>

  </div>
</template>

<script>
import http from '../common/api/request'
import router from '@/router';

export default {
  name: "Register",
  data() {
    return {
      login: {
        email: 'demo@demo.com',
        username: 'icestone',
        password: '12345678910'
      }
    }
  },
  methods: {
    async submit() {
      if (this.login.username.length < 1 || this.login.password.length < 1) {
        console.log('data error')
      }
      const res = await http.$axios({
        url: '/user/register/',
        method: 'POST',
        data: this.login,
      })
      console.log(res)
      if (res.code == 200) {
        // 写入token
        const userInfo = res.result || '';
        console.log("userInfo");
        console.log(userInfo);
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
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
      const user = this.$store.state.userInfo || '';
      console.log("JSON.stringify(user).length:")
      console.log(JSON.stringify(user).length)
      console.log(JSON.stringify(user))
      // 没有用户登录
      if (JSON.stringify(user).length < 10) {
        return
      } else {
        console.log('3s后跳转user')
        // 有用户登录,跳转user页面
        router.push({path: '/user'});
      }
    }
  },
  created() {
    this.verifyLogin();
  }
}
</script>