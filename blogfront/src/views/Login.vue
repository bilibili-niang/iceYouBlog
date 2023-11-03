<template>
  <div class="login container">
    <ice-row v-show="showAlert">
      <ice-text>
        {{ message || "有问题,出错了" }}
      </ice-text>
    </ice-row>
    <ice-column width="55%">
      <div class="ice-column">
        <ice-text>
          用户名
        </ice-text>
        <ice-input v-model="login.username"></ice-input>
      </div>

      <div class="ice-column">
        <ice-text>
          密码
        </ice-text>
        <ice-input v-model="login.password"></ice-input>
      </div>
      <div class="ice-row">
        <ice-button @click="submit">登录</ice-button>
      </div>
    </ice-column>
  </div>

</template>

<script setup>
import {reactive, ref} from "vue";
import {useRouter} from "vue-router";
import http from "@/common/api/request";

let showAlert = ref(false);
let message = ref("");
let login = reactive({
  username: "",
  password: ""
});

const router = useRouter();
const submit = async () => {
  console.log("login", login);
  if (login.username.length < 1 || login.password.length < 1) {
    console.log("data error");
    showAlert.value = true;
  } else {
    await http.$axios({
      url: "/user/login",
      method: "POST",
      data: login,
    })
        .then(res => {
          if (res.success) {
            // 登陆成功
            const userInfo = res.result || "";
            // 写入token
            localStorage.setItem("userInfo", JSON.stringify(userInfo));
            // 跳转user页面
            router.push({path: "/user"});
          } else {
            showAlert.value = true;
            message.value = res.message;
          }
        })
        .catch(e => {
          console.log("e:");
          console.log(e);
        });
  }
};

// 验证用户是否登录,如果登录,跳转个人页面
const verifyLogin = () => {
  const user = localStorage.getItem("userInfo");
  // 没有用户登录
  if (JSON.stringify(user).length < 10) {
    localStorage.removeItem("userInfo");
    return;
  } else {
    // 有用户登录,跳转user页面
    router.push({path: "/user"});
  }
};

verifyLogin();
</script>

<style scoped lang="less">
@import "../assets/css/variables";

.login{
  padding-top: @p-large-su;
  align-items: center;

  .form{
    padding: @p-normal;
    border-radius: @radio-n;
    width: 100%;
    box-sizing: border-box;

  }
}
</style>
