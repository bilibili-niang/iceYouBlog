import { Context } from 'koa'
import {
  body,
  middlewares,
  ParsedArgs,
  responses,
  routeConfig,
} from 'koa-swagger-decorator'
import {
  CreateMarkdownReq,
  CreateMarkdownRes,
  GetMarkdownListRes,
  ICreateMarkdownReq,
  IGetMarkdownListReq,
} from './type'
import { authMiddleware } from '@/middleware/auth'
import Markdown from '@/schema/markdown'
import { error } from '@/config/log4j'
import { ctxBody, deleteByIdMiddleware, paginationMiddleware } from '@/utils'
import { paginationQuery } from '@/controller/common/queryType'
import User from '@/schema/user'

class MarkdownClass {
  @routeConfig({
    method: 'post',
    path: '/markdown/create',
    summary: '创建',
    tags: ['markdown'],
    security: [{ Bearer: [] }, { Auth: [] }, { Token: [] }],
  })
  @body(CreateMarkdownReq)
  @responses(CreateMarkdownRes)
  @middlewares([authMiddleware])
  async createMarkdown(ctx: Context, args: ParsedArgs<ICreateMarkdownReq>) {
    try {
      const user = ctx.state.user
      const markdown = await Markdown.create({
        ...args.body,
        userId: user.id,
      })
      ctx.body = ctxBody({
        success: true,
        code: 200,
        msg: '创建markdown成功',
        data: markdown.dataValues,
      })
    } catch (e) {
      error(e)
      ctx.body = ctxBody({
        success: false,
        code: 500,
        msg: '创建markdown失败',
        data: e,
      })
    }
  }

  @routeConfig({
    method: 'get',
    path: '/markdown/list',
    summary: '获取文章列表',
    tags: ['markdown'],
    security: [{ Bearer: [] }, { Auth: [] }, { Token: [] }],
    request: {
      query: paginationQuery(),
    },
  })
  @responses(GetMarkdownListRes)
  async getMarkdownList(ctx: Context, args: ParsedArgs<IGetMarkdownListReq>) {
    const where: any = {}

    // 如果指定了用户ID，只查询该用户的文章
    if (args.query.userId) {
      where.userId = args.query.userId
    }

    // 如果指定了状态，只查询该状态的文章
    if (typeof args.query.states === 'number') {
      where.states = args.query.states
    }

    await paginationMiddleware(ctx, Markdown, '获取文章列表', {
      where,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: User,
          attributes: ['userName'],
        },
      ],
    })
  }
}

export { MarkdownClass }
