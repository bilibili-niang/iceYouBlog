<template>
  <div class="login container">
    <div class="form">
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
        <ice-button @click="getToken">get</ice-button>
      </div>
    </div>
  </div>
  <Alert :msg="alertInf" :show="showAlert"></Alert>


</template>

<script>
import http from "../common/api/request";
import router from "@/router";
import Alert from "@/components/common/Alert.vue";

export default {
  name: "Login",
  data() {
    return {
      login: {
        username: "",
        password: ""
      },
      warning: false,
      alertInf: "暂无消息",
      showAlert: false,
    };
  },
  methods: {
    async submit() {
      if (this.login.username.length < 1 || this.login.password.length < 1) {
        console.log("data error");
      }
      const res = await http.$axios({
        url: "/user/login",
        method: "POST",
        data: this.login,
      });
      if (!res.success) {
        // 登录失败
        this.alertInf = res.message;
        this.showAlert = true;
      } else {
        // 登陆成功

        const userInfo = res.result || "";

        console.log(JSON.stringify(userInfo));
        // 写入token
        localStorage.setItem("userInfo", JSON.stringify(userInfo));

        // 跳转user页面
        router.push({path: "/user"});
      }
    },
    getToken() {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (JSON.stringify(userInfo) > 10) {
        console.log(userInfo);
        console.log(userInfo.id);
      } else {
        console.log("token is null");
      }
    },
    // 验证用户是否登录,如果登录,跳转个人页面
    verifyLogin() {
      const user = localStorage.getItem("userInfo");
      console.log("localStorage:");
      console.log(user);
      // 没有用户登录
      if (JSON.stringify(user).length < 10) {
        localStorage.removeItem("userInfo");
        return;
      } else {
        // 有用户登录,跳转user页面
        router.push({path: "/user"});
      }
    }
  },
  created() {
    this.verifyLogin();
  },
  components: {
    Alert
  }
};
</script>

<style scoped lang="less">
@import "../assets/css/variables";

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
