// 通用响应接口
export interface ApiResponse<T = any> {
    code: number
    data: T
    message: string
}

// 分页请求参数接口
export interface PaginationParams {
    page: number
    pageSize: number
}

// 分页响应接口
export interface PaginationResponse<T> {
    list: T[]
    total: number
    page: number
    pageSize: number
}
