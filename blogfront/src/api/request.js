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
                // 确保响应数据中有success或类似字段来标识操作成功与否，根据实际情况调整
                if (res.data.success) {
                    return new Promise((resolve) => resolve(res.data));
                } else {
                    // 如果后端API设计为非2xx也通过data传递错误信息，这里应该抛出错误
                    return Promise.reject(res.data);
                }
            })
            .catch(error => {
                // 处理网络错误或非200响应
                if (error.response) {
                    // 请求已发出，但服务器响应的状态码不在2xx范围内
                    console.error('请求错误:', error.response.data);
                    return Promise.reject(error.response.data); // 返回错误信息给调用者
                } else if (error.request) {
                    // 请求已经发出，但没有收到响应
                    console.error('请求没有收到响应:', error.request);
                    return Promise.reject({message: '网络连接问题，请稍后再试'});
                } else {
                    // 发生了一些配置错误
                    console.error('发生错误:', error.message);
                    return Promise.reject({message: '请求配置错误'});
                }
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
