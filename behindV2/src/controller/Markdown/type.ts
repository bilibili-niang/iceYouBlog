// markdown的请求,响应定义
import { z } from 'koa-swagger-decorator'
import { commonResponse } from '@/controller/common'

// 基础 Markdown 字段
const BaseMarkdownFields = {
  title: z.string().optional().describe('文章名称'),
  content: z
    .string()
    .transform(str => str.replace(/\\n/g, '\n').replace(/\r/g, ''))
    .optional()
    .describe('文章内容'),
  states: z.number().optional().describe('文章的状态: 0草稿,1发布,2私密'),
  description: z.string().optional().describe('文章的描述'),
  praise: z.string().optional().describe('文章的点赞数量'),
  view: z.string().optional().describe('文章的浏览量'),
  audit: z.string().optional().describe('文章的审核状态: 1通过,0未通过'),
  tag1: z.string().optional().describe('文章的标签1'),
  tag2: z.string().optional().describe('文章的标签2'),
  tag3: z.string().optional().describe('文章的标签3'),
  source: z
    .string()
    .optional()
    .describe('文章来源,如果是来自于其他网站,则从其他网站上爬取'),
  url: z.string().optional().describe('文章链接'),
  headImg: z
    .string()
    .optional()
    .describe('文章自定义头图,如果没有则会加载默认'),
  type: z.string().optional().describe('文章类型'),
  hasOriginal: z.string().optional().describe('是否有源头'),
  diggCount: z.string().optional().describe('点赞数量'),
  articleType: z.string().optional().describe('文章类型'),
  recommendLevel: z.string().optional().describe('文章置顶等级'),
}

// 创建 Markdown 的请求类型
export const CreateMarkdownReq = z.object({
  ...BaseMarkdownFields,
  states: z.number().default(0).describe('文章的状态: 0草稿,1发布,2私密'),
  audit: z.string().default('1').describe('文章的审核状态: 1通过,0未通过'),
  type: z.string().default('blog').describe('文章类型'),
  hasOriginal: z.string().default('blog').describe('是否有源头'),
  diggCount: z.string().default('0').describe('点赞数量'),
  articleType: z.string().default('blog').describe('文章类型'),
  recommendLevel: z.string().default('0').describe('文章置顶等级'),
})

// 创建 Markdown 的响应类型
export const CreateMarkdownRes = commonResponse({
  data: CreateMarkdownReq,
})

export type ICreateMarkdownReq = z.infer<typeof CreateMarkdownReq>

// Markdown列表的请求参数
export const GetMarkdownListReq = z.object({
  page: z.number().default(1).describe('页码'),
  pageSize: z.number().default(10).describe('每页数量'),
  userId: z.string().optional().describe('用户ID，可选'),
  states: z.number().optional().describe('文章状态：0草稿,1发布,2私密'),
})

export type IGetMarkdownListReq = z.infer<typeof GetMarkdownListReq>

// 获取文章详情的请求参数
export const GetMarkdownDetailReq = z.object({
  id: z.string().describe('文章ID'),
})

export type IGetMarkdownDetailReq = z.infer<typeof GetMarkdownDetailReq>

// 获取文章详情的响应类型
export const GetMarkdownDetailRes = commonResponse({
  data: CreateMarkdownReq,
})

// 更新文章的请求类型
export const UpdateMarkdownReq = z.object({
  id: z.string().describe('文章ID'),
  ...BaseMarkdownFields,
})

// 更新文章的响应类型
export const UpdateMarkdownRes = commonResponse({
  data: UpdateMarkdownReq,
})

export type IUpdateMarkdownReq = z.infer<typeof UpdateMarkdownReq>

// Markdown列表的响应
export const GetMarkdownListRes = commonResponse({
  data: z.object({
    count: z.number(),
    rows: z.array(CreateMarkdownReq),
    page: z.number(),
    pageSize: z.number(),
  }),
})
