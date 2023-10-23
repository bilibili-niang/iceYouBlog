import axios from "axios";

export default {
  common: {
    methods: "GET",
    data: {},
    params: {},
    headers: {}
  },
  $axios(options = {}) {
    options.mehods = options.methods || this.common.methods;
    options.data = options.data || this.common.data;
    options.params = options.params || this.common.params;
    options.headers = options.headers || this.common.headers;
    //请求前显示加载中
    // 判断是否是登录状态
    if (options.headers.token) {
      // 手动获取token
      const token = JSON.parse(localStorage.getItem("userInfo")) == null ? "" : JSON.parse(localStorage.getItem("userInfo")).token;
      options.headers.token = token;
      if (!options.headers.token) {
        console.log("token不存在");
      }
    }
    return axios(options)
      .then(res => {
        let data = res.data;
        return new Promise((res, rej) => {
          if (!res) return rej();
          //结束,close
          /*setTimeout(() => {
              // Indicator.close();
              console.log('loading over')
          }, 500)*/
          res(data);
        });
      });
  }
};
const token = JSON.parse(localStorage.getItem("userInfo")) == null ? "" : JSON.parse(localStorage.getItem("userInfo")).token;

function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params, {
      headers: {"token": token}
    }).then(response => {
      resolve(response.data);
    }, err => {
      reject(err);
    }).catch((error) => {
      reject(error);
    });
  });
}

function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, params, {
      headers: {"token": token}
    }).then(response => {
      resolve(response.data);
    }, err => {
      reject(err);
    }).catch((error) => {
      reject(error);
    });
  });
}

export {post, get};
