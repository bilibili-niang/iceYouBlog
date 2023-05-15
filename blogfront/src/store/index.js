import {createStore} from 'vuex'

const store = createStore({
    state() {
        return {
            user: {
                //登录状态
                loginStatus: false,
                // 用户信息:用户的头像,用户昵称
                userInfo: {}
            },
        }
    },
    mutations: {
        increment(state) {
            state.count++
        },
        getUserInfo(state) {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (userInfo) {
                state.user.loginStatus = true;
                state.user.userInfo = userInfo;
            } else {

            }

        },
        CHANGE_META_INFO(state, metaInfo) {
            state.metaInfo = metaInfo;
        }
    }
})

export default store;
