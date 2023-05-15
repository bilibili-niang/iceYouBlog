import {USER_LOGIN} from './mutations-types';
import {INIT_USER} from './mutations-types';

export default {
    state: {
        //登录状态
        list: 1,
        loginStatus: false, token: null, // 用户信息:用户的头像,用户昵称
        userInfo: {}
    },
    getters: {},
    mutations: {
        // 设置
        [USER_LOGIN](state, user) {
            /*console.log("user.token")
            console.log(user.token)*/
            state.loginStatus = true;
            state.token = user.token;
            state.userInfo = user;
            // 持久化存储是存储在本地
            localStorage.setItem('teaUserInfo', JSON.stringify(user));
        },
        // 读取
        [INIT_USER](state) {
            let userInfo = JSON.parse(localStorage.getItem('teaUserInfo'));
           /* console.log("userInfo:")
            console.log(userInfo)*/
            if (userInfo) {
                state.loginStatus = true;
                state.token = userInfo.token;
                state.userInfo = userInfo;
            }
        },
        // 退出登录
        loginOut(state) {
            state.loginStatus = false;
            state.token = null;
            state.userInfo = {};
            localStorage.removeItem('teaUserInfo');
        }
    },
    actions: {}
}