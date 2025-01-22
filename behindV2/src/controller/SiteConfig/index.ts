import { Context } from 'koa'
import {
  body,
  middlewares,
  ParsedArgs,
  responses,
  routeConfig,
} from 'koa-swagger-decorator'
import { authMiddleware } from '@/middleware/auth'
import { ctxBody } from '@/utils'
import SiteConfig from '@/schema/siteConfig'
import { error } from '@/config/log4j'
import {
  UpdateSiteConfigReq,
  GetSiteConfigRes,
  IUpdateSiteConfigReq,
} from './type'

class SiteConfigClass {
  @routeConfig({
    method: 'get',
    path: '/admin/siteConfig',
    summary: '获取网站配置',
    tags: ['网站配置'],
  })
  @responses(GetSiteConfigRes)
  async getSiteConfig(ctx: Context) {
    console.log('getSiteConfig-----------------------------------');
    
    try {
      const config = await SiteConfig.findOne({
        order: [['createdAt', 'DESC']], // 获取最新的配置
        raw: true // 返回原始数据
      })

      if (!config) {
        console.log('未找到网站配置')
        ctx.body = ctxBody({
          success: false,
          code: 404,
          msg: '未找到网站配置',
          data: null,
        })
        return
      }

      ctx.body = ctxBody({
        success: true,
        code: 200,
        msg: '获取网站配置成功',
        data: config,
      })
    } catch (e) {
      console.error('获取网站配置失败:', e)
      error(e instanceof Error ? e.message : String(e))
      ctx.body = ctxBody({
        success: false,
        code: 500,
        msg: '获取网站配置失败: ' + (e instanceof Error ? e.message : String(e)),
        data: null,
      })
    }
  }

  @routeConfig({
    method: 'put',
    path: '/admin/siteConfig',
    summary: '更新网站配置',
    tags: ['网站配置'],
    security: [{ Bearer: [] }],
  })
  @body(UpdateSiteConfigReq)
  @responses(GetSiteConfigRes)
  @middlewares([authMiddleware])
  async updateSiteConfig(ctx: Context, args: ParsedArgs<IUpdateSiteConfigReq>) {
    try {
      const user = ctx.state.user
      let config = await SiteConfig.findOne()

      if (!config) {
        config = await SiteConfig.create({
          ...args.body,
          lastModifiedBy: user.id,
        })
      } else {
        await config.update({
          ...args.body,
          lastModifiedBy: user.id,
        })
      }

      ctx.body = ctxBody({
        success: true,
        code: 200,
        msg: '更新网站配置成功',
        data: config,
      })
    } catch (e) {
      ctx.body = ctxBody({
        success: false,
        code: 500,
        msg: '更新网站配置失败',
        data: e,
      })
    }
  }
}

export { SiteConfigClass }
