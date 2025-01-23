import { createStore } from 'vuex'
import admin from '@/api/admin'

const store = createStore({
  state() {
    return {
      user: {
        //登录状态
        loginStatus: false,
        // 用户信息:用户的头像,用户昵称
        userInfo: {}
      },
      // 配置信息
      config: {
        registerFlag: '0'
      },
      styleConfig: {
        showHeader: true
      }
    }
  },
  mutations: {
    increment(state) {
      state.count++
    },
    getUserInfo(state) {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      if (userInfo) {
        state.user.loginStatus = true
        state.user.userInfo = userInfo
      } else {
      }
    },
    async initConfig(state) {
      const res = await admin.getConfig()
      if (res.success) {
        state.config = res.data
      }
    },
    CHANGE_META_INFO(state, metaInfo) {
      state.metaInfo = metaInfo
    },
    updateStyleConfig(state, styleConfig) {
      state.styleConfig = styleConfig
    }
  }
})

export default store
