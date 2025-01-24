import request from '../request'
import type { ApiResponse } from '../types'
import type { SiteConfig, UpdateSiteConfigParams } from './type'

/**
 * 获取网站配置
 */
export const getSiteConfig = () => {
    return request.get<ApiResponse<SiteConfig>>('/site/config')
}

/**
 * 更新网站配置
 * @param data 网站配置数据
 */
export const updateSiteConfig = (data: UpdateSiteConfigParams) => {
    return request.put<ApiResponse<SiteConfig>>('/site/config', data)
}
