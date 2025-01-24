// 网站配置类型
export interface SiteConfig {
    enableRegister: boolean // 是否开启网站注册
    enableHeaderImage: boolean // 是否开启网站头图
    enableComment: boolean // 是否开启评论功能
    siteTitle?: string // 网站标题
    siteDescription?: string // 网站描述
    siteKeywords?: string // 网站关键词
    siteBeian?: string // 网站备案号
}

// 更新网站配置请求参数
export type UpdateSiteConfigParams = SiteConfig
