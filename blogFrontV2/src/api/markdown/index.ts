import request from '../request'
import type { ApiResponse } from '../types'
import type { CreateMarkdownParams, UpdateMarkdownParams, MarkdownBase, MarkdownListResponse, MarkdownViewItem } from './type'

/**
 * 创建文章
 * @param data 文章数据
 */
export const createMarkdown = (data: CreateMarkdownParams) => {
    return request.post<ApiResponse<MarkdownBase>>('/markdown/create', data)
}

/**
 * 获取文章列表
 * @param page 页码
 * @param pageSize 每页数量
 */
export const getMarkdownList = (page: number = 1, pageSize: number = 10) => {
    return request.get<ApiResponse<MarkdownListResponse>>('/markdown/list', {
        params: { page, pageSize }
    })
}

/**
 * 获取文章详情
 * @param id 文章ID
 */
export const getMarkdownDetail = (id: string) => {
    return request.get<ApiResponse<MarkdownBase>>(`/markdown/detail/${id}`)
}

/**
 * 获取文章浏览量
 */
export const getMarkdownViews = () => {
    return request.get<ApiResponse<MarkdownViewItem[]>>('/markdown/views')
}

/**
 * 更新文章
 * @param data 文章数据
 */
export const updateMarkdown = (data: UpdateMarkdownParams) => {
    return request.put<ApiResponse<MarkdownBase>>('/markdown/update', data)
}

/**
 * 删除文章
 * @param id 文章ID
 */
export const deleteMarkdown = (id: string) => {
    return request.delete<ApiResponse<null>>(`/markdown/delete/${id}`)
}