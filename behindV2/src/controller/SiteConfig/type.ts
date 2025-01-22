import { z } from 'koa-swagger-decorator'
import { commonResponse } from '@/controller/common'

export const UpdateSiteConfigReq = z.object({
  enableRegister: z.boolean().describe('是否开启网站注册'),
  enableHeaderImage: z.boolean().describe('是否开启网站头图'),
  enableComment: z.boolean().describe('是否开启评论功能'),
  siteTitle: z.string().optional().describe('网站标题'),
  siteDescription: z.string().optional().describe('网站描述'),
  siteKeywords: z.string().optional().describe('网站关键词'),
  siteBeian: z.string().optional().describe('网站备案号'),
})

export const GetSiteConfigRes = commonResponse({
  data: UpdateSiteConfigReq,
})

export type IUpdateSiteConfigReq = z.infer<typeof UpdateSiteConfigReq>
