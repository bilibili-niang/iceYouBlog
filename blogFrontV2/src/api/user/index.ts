import request from '../request'
import type { ApiResponse } from '../types'
import type { LoginParams, CreateUserParams, UserInfo, UserListResponse } from './type'


/**
 * 登录函数
 *
 * @param data 登录参数
 * @returns 登录成功后的响应数据，包含token
 */
export const $login = (data: LoginParams) => {
    return request.post<ApiResponse<{ token: string }>>('/auth/login', data)
}

/**
 * 创建用户
 * @param data 用户信息
 */
export const createUser = (data: CreateUserParams) => {
    return request.post<ApiResponse<UserListResponse>>('/user/create', data)
}

/**
 * 获取用户列表
 * @param page 页码
 * @param pageSize 每页数量
 */
export const getUserList = (page: number = 1, pageSize: number = 10) => {
    return request.get<ApiResponse<UserListResponse>>('/user/list', {
        params: { page, pageSize }
    })
}