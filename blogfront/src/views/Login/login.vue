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

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import http from '@/api/request'
import { fun } from '@/hook/function'
import User from '@/api/user'

let login = reactive({
  username: '',
  password: ''
})

const router = useRouter()
const submit = async () => {
  if (login.username.length < 1 || login.password.length < 1) {
    fun.alert('请输入正确账号/密码')
  } else {
    await User.login(login)
      .then(res => {
        if (res.success) {
          fun.alert(res.message)
          // 登陆成功
          const userInfo = res.result || ''
          // 写入token
          localStorage.setItem('userInfo', JSON.stringify(userInfo))
          // 跳转user页面
          router.push({ path: '/user' })
        } else {
          fun.alert(res.message)
        }
      })
      .catch(e => {
        console.log('e:')
        console.log(e)
      })
  }
}

// 验证用户是否登录,如果登录,跳转个人页面
const verifyLogin = () => {
  const user = localStorage.getItem('userInfo')
  // 没有用户登录
  if (JSON.stringify(user).length < 10) {
    localStorage.removeItem('userInfo')
    return
  } else {
    // 有用户登录,跳转user页面
    router.push({ path: '/user' })
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
