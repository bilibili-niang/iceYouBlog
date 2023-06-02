<template>
  <div class="register container">
    <div class="form">
      <el-input class="m-b" v-model="login.email" placeholder="Please input email" clearable/>
      <el-input class="m-b" v-model="login.username" placeholder="Please input username" clearable/>
      <el-input class="m-b" v-model="login.password" placeholder="Please input pwd" clearable/>
      <div class="btns">
        <el-button @click="submit">submit</el-button>
        <el-button @click="getToken">get</el-button>
      </div>
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
        username: 'username',
        password: 'password'
      }
    }
  },
  methods: {
    async submit() {
      if (this.login.username.length < 1 || this.login.password.length < 1) {
        console.log('data error')
      }
      await http.$axios({
        url: '/user/register/',
        method: 'POST',
        data: this.login,
      })
          .then(res => {
            console.log("res:")
            console.log(res)
            if (res.success) {
              const userInfo = res.result || '';
              localStorage.setItem('userInfo', JSON.stringify(userInfo));
            }
          })
          .catch(e => {
            console.log("e:")
            console.log(e)
          })
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
<style scoped lang="less">
.form {
  display: flex;
  flex-direction: column;
}
</style>