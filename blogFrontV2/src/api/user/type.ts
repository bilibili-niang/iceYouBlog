// 用户接口相关类型
export interface LoginParams {
    username: string
    password: string
}

// 创建用户请求参数
export interface CreateUserParams {
    userName: string
    password: string
    email?: string
}

// 用户信息
export interface UserInfo {
    id: number
    userName: string
    email?: string
    createdAt: string
    updatedAt: string
}

// 用户列表响应
export interface UserListResponse {
    count: number
    rows: UserInfo[]
}