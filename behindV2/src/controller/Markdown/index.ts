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
  DeleteMarkdownReq,
  DeleteMarkdownRes,
  GetMarkdownDetailRes,
  GetMarkdownListRes,
  GetMarkdownViewsRes,
  GetMarkdownListReq,
  ICreateMarkdownReq,
  IGetMarkdownListReq,
  UpdateMarkdownReq,
  UpdateMarkdownRes,
  IUpdateMarkdownReq,
} from './type'
import { authMiddleware } from '@/middleware/auth'
import Markdown from '@/schema/markdown'
import { error } from '@/config/log4j'
import { ctxBody, paginationMiddleware, deleteByIdMiddleware } from '@/utils'
import { paginationQuery } from '@/controller/common/queryType'
import User from '@/schema/user'
import { Op } from 'sequelize'

class MarkdownClass {
  @routeConfig({
    method: 'post',
    path: '/markdown/create',
    summary: '创建',
    tags: ['文章'],
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
        email: user.email || '', // 使用 token 中的邮箱
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
    tags: ['文章'],
    security: [{ Bearer: [] }, { Auth: [] }, { Token: [] }],
    request: {
      query: GetMarkdownListReq,
    },
  })
  @responses(GetMarkdownListRes)
  async getMarkdownList(ctx: Context, args: ParsedArgs<IGetMarkdownListReq>) {
    const where: any = {}

    // 如果指定了用户ID，只查询该用户的文章
    if (args.query.userId) {
      where.userId = args.query.userId
    }

    // 如果是获取推荐文章
    if (args.query.getRecommend) {
      where.states = {
        [Op.gt]: 1 // states > 1
      }
    }
    // 如果指定了状态且不是获取推荐文章，只查询该状态的文章
    else if (typeof args.query.states === 'number') {
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

  @routeConfig({
    method: 'get',
    path: '/markdown/detail/:id',
    summary: '获取文章详情',
    tags: ['文章'],
    security: [{ Bearer: [] }, { Auth: [] }, { Token: [] }],
  })
  @responses(GetMarkdownDetailRes)
  async getMarkdownDetail(ctx: Context) {
    try {
      const { id } = ctx.params
      const markdown = await Markdown.findByPk(id)

      if (!markdown) {
        ctx.body = ctxBody({
          success: false,
          code: 404,
          msg: '文章不存在',
          data: null,
        })
        return
      }

      ctx.body = ctxBody({
        success: true,
        code: 200,
        msg: '获取文章详情成功',
        data: markdown,
      })
    } catch (error) {
      ctx.body = ctxBody({
        success: false,
        code: 500,
        msg: '获取文章详情失败',
        data: error,
      })
    }
  }

  @routeConfig({
    method: 'get',
    path: '/markdown/views',
    summary: '获取所有文章的浏览量',
    tags: ['文章'],
  })
  @responses(GetMarkdownViewsRes)
  async getMarkdownViews(ctx: Context) {
    try {
      const articles = await Markdown.findAll({
        attributes: ['id', 'title', 'view'],
        where: {
          states: 1 // 只获取已发布的文章
        },
        order: [['view', 'DESC']], // 按浏览量降序排序
      })

      ctx.body = ctxBody({
        success: true,
        code: 200,
        msg: '获取文章浏览量成功',
        data: articles,
      })
    } catch (e) {
      error(e)
      ctx.body = ctxBody({
        success: false,
        code: 500,
        msg: '获取文章浏览量失败',
        data: e,
      })
    }
  }

  @routeConfig({
    method: 'put',
    path: '/markdown/update',
    summary: '更新文章',
    tags: ['文章'],
    security: [{ Bearer: [] }, { Auth: [] }, { Token: [] }],
  })
  @body(UpdateMarkdownReq)
  @responses(UpdateMarkdownRes)
  @middlewares([authMiddleware])
  async updateMarkdown(ctx: Context, args: ParsedArgs<IUpdateMarkdownReq>) {
    try {
      const { id, ...updateData } = args.body

      const markdown = await Markdown.findByPk(id)

      if (!markdown) {
        ctx.body = ctxBody({
          success: false,
          code: 404,
          msg: '文章不存在',
          data: null,
        })
        return
      }

      // 更新文章
      await markdown.update(updateData)

      ctx.body = ctxBody({
        success: true,
        code: 200,
        msg: '更新文章成功',
        data: markdown,
      })
    } catch (error) {
      ctx.body = ctxBody({
        success: false,
        code: 500,
        msg: '更新文章失败',
        data: error,
      })
    }
  }

  @routeConfig({
    method: 'delete',
    path: '/markdown/delete',
    summary: '删除文章',
    tags: ['文章'],
    security: [{ Bearer: [] }, { Auth: [] }, { Token: [] }],
    request: {
      query: DeleteMarkdownReq,
    },
  })
  @responses(DeleteMarkdownRes)
  @middlewares([authMiddleware])
  async deleteMarkdown(ctx: Context) {
    await deleteByIdMiddleware(ctx, Markdown, '文章')
  }
}

export { MarkdownClass }
