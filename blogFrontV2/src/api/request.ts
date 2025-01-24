import axios from 'axios'
import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { API_CONFIG } from '../config/api.config'

// 创建axios实例
const service: AxiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}${API_CONFIG.PREFIX}` || '',  // 从环境变量获取基础URL并添加前缀
    timeout: 15000,  // 请求超时时间
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
})

// 请求拦截器
service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // 在这里可以添加token等认证信息
        const token = localStorage.getItem('token')
        if (token && config.headers) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        console.error('Request error:', error)
        return Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    (response: AxiosResponse) => {
        const res = response.data
        // 这里可以根据后端的响应结构做相应的处理
        if (response.status === 200) {
            return res
        }
        return Promise.reject(new Error(res.message || 'Error'))
    },
    (error) => {
        console.error('Response error:', error)
        // 这里可以统一处理错误情况
        return Promise.reject(error)
    }
)

export default service
