import { ctxBody } from '@/utils'
import seq from '@/config/db'
import { Context } from 'koa'
import { error } from '@/config/log4j'
import User from '@/schema/user'
import UserLevel from '@/schema/userLevel'
seq

/*
 * 构建一个分页查询
 * @param {ctx} koa的Context
 * @param {model} sequelize的model
 * @param {msg} 分页查询的提示信息
 * */
const paginationMiddleware = async (
  ctx: Context,
  model: any,
  message: string,
  options: {
    where?: any
    order?: any[]
    attributes?: string[]
    include?: any[]
  } = {}
) => {
  try {
    const page = Math.max(Number(ctx.query.page) || 1, 1) // 确保页码最小为 1
    const pageSize = Math.max(Number(ctx.query.pageSize) || 10, 1) // 确保每页数量最小为 1

    // 如果是 User 模型，自动添加 UserLevel 关联
    if (model === User) {
      options.include = [
        {
          model: UserLevel,
          attributes: [
            'id',
            'levelName',
            'levelValue',
            'isAdmin',
            'description',
          ],
        },
        ...(options.include || []),
      ]

      // 设置要查询的字段，排除密码
      const defaultAttributes = [
        'id',
        'userName',
        'email',
        'userLevelId',
        'createdAt',
        'updatedAt',
      ]
      if (!options.attributes) {
        options.attributes = defaultAttributes
      } else if (Array.isArray(options.attributes)) {
        // 如果提供了自定义字段，确保不包含密码字段
        options.attributes = options.attributes.filter(
          attr => attr !== 'password'
        )
      }
    }

    const { count, rows } = await model.findAndCountAll({
      where: options.where || {},
      offset: (page - 1) * pageSize,
      limit: pageSize,
      order: options.order || [['createdAt', 'DESC']],
      attributes: options.attributes,
      include: options.include,
    })

    ctx.body = ctxBody({
      success: true,
      code: 200,
      msg: `${message}成功`,
      data: {
        count,
        rows,
        page,
        pageSize,
      },
    })
  } catch (e) {
    error(e)
    ctx.body = ctxBody({
      success: false,
      code: 500,
      msg: `${message}失败`,
      data: e,
    })
  }
}
/*
 * 通过id删除
 * */
const deleteByIdMiddleware = async (ctx: any, model: any, msg?: string) => {
  const { id } = ctx.parsed.query
  await model
    .destroy({
      where: {
        id,
      },
    })
    .then((res: any) => {
      if (res === 0) {
        ctx.body = ctxBody({
          success: false,
          code: 500,
          msg: `删除${msg}失败,指定的id不存在`,
          data: res,
        })
      } else {
        ctx.body = ctxBody({
          success: true,
          code: 200,
          msg: `删除${msg}成功`,
        })
      }
    })
    .catch(e => {
      ctx.body = ctxBody({
        success: false,
        code: 500,
        msg: `删除${msg}失败`,
        data: e,
      })
    })
}

export { paginationMiddleware, deleteByIdMiddleware }
