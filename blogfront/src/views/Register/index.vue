<template>
  <ice-column class="register container">
    <ice-column width="55%">
      <ice-input v-model="login.email" placeholder="邮箱" clearable/>
      <ice-input v-model="login.username" placeholder="用户名" clearable/>
      <ice-input v-model="login.password" placeholder="密码" clearable/>
      <div class="btns ice-row">
        <ice-button @click="submit">注册</ice-button>
      </div>
    </ice-column>
  </ice-column>
</template>

<script>
import router from '@/router';
import {errorRes} from "@/utils";
import api from "@/api";
import {iceMessage} from 'icepro'

export default {
  name: "Register",
  data() {
    return {
      login: {
        email: '',
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async submit() {
      if (this.login.username.length < 1 || this.login.password.length < 1) {
        iceMessage({
          message: '请输入用户名或密码',
          type: 'danger'
        })
      }
      await api.register(this.login)
          .then(res => {
            if (res.success) {
              const userInfo = res.result || '';
              localStorage.setItem('userInfo', JSON.stringify(userInfo));
            }
          })
          .catch(errorRes)
    },
    verifyLogin() {
      const user = this.$store.state.userInfo || '';
      // 没有用户登录
      if (JSON.stringify(user).length < 10) {
        return void 0
      } else {
        iceMessage('3s后跳转user')
        router.push({path: '/user'});
      }
    }
  },
  created() {
    this.verifyLogin();
  }
}
</script>
<style lang="less" scoped>
.container {
  align-items: center;
}
</style>