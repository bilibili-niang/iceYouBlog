<template>
  <div class="login container">
    <ice-column width="55%">
      <div class="ice-column">
        <ice-text> 用户名</ice-text>
        <ice-input v-model="login.username"></ice-input>
      </div>

      <div class="ice-column">
        <ice-text> 密码</ice-text>
        <ice-input v-model="login.password"></ice-input>
      </div>
      <div class="ice-row">
        <ice-button @click="submit">登录</ice-button>
      </div>
    </ice-column>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { fun } from '@/hook/function'
import User from '@/api/user'
import { throwException } from '@/utils'
import { useRouter } from 'vue-router'

const router = useRouter()
let login = reactive({
  username: '',
  password: ''
})

const submit = async () => {
  if (login.username.length < 1 || login.password.length < 1) {
    fun.alert('请输入正确账号/密码')
  } else {
    await User.login(login)
      .then(res => {
        if (res.success) {
          fun.alert(res.message)
          const userInfo = res.result || ''
          localStorage.setItem('userInfo', JSON.stringify(userInfo))

          router.push({
            name: 'user'
          })
        } else {
          fun.alert(res.message)
        }
      })
      .catch(throwException)
  }
}

// 验证用户是否登录,如果登录,跳转个人页面
const verifyLogin = () => {
  const user = localStorage.getItem('userInfo')
  if (JSON.stringify(user).length < 10) {
    localStorage.removeItem('userInfo')
    return void 0
  } else {
    router.push({
      name: 'user'
    })
  }
}

verifyLogin()
</script>

<style scoped lang="less">
.login {
  padding-top: @p-large-su;
  align-items: center;

  .form {
    padding: @p-normal;
    border-radius: @radio-n;
    width: 100%;
    box-sizing: border-box;
  }
}
</style>
