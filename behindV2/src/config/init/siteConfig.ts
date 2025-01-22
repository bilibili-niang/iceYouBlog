import SiteConfig from '@/schema/siteConfig'
import { error } from '@/config/log4j'

const getEnvBoolean = (value: string | undefined): boolean => {
  if (!value) return true // 默认为 true
  return value.toLowerCase() === 'true'
}

export const initSiteConfig = async () => {
  try {
    // 检查是否已存在网站配置
    const existingConfig = await SiteConfig.findOne()
    if (!existingConfig) {
      console.log('未找到网站配置，开始创建默认配置')
      // 创建默认网站配置，使用环境变量
      const newConfig = await SiteConfig.create({
        enableRegister: getEnvBoolean(process.env.ENABLE_REGISTER),
        enableHeaderImage: getEnvBoolean(process.env.ENABLE_HEADER_IMAGE),
        enableComment: getEnvBoolean(process.env.ENABLE_COMMENT),
        siteTitle: process.env.SITE_TITLE || 'blog',
        siteDescription: process.env.SITE_DESCRIPTION || 'lalalalala',
        siteKeywords: process.env.SITE_KEYWORDS || 'lalalala',
        siteBeian: process.env.SITE_BEIAN || '',
        lastModifiedBy: process.env.ADMIN_ID || 'system' // 系统初始化时使用
      })
    } else {
      console.log('跳过初始化')
    }
  } catch (e) {
    console.error('初始化网站配置失败:', e)
    error(e instanceof Error ? e.message : String(e))
  }
}
