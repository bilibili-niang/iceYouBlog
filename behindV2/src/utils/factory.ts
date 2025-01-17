import { ctxBody } from '@/utils'
import seq from '@/config/db'
import { toInteger } from 'lodash'

seq


/*
* 构建一个分页查询
* @param {ctx} koa的Context
* @param {model} sequelize的model
* @param {msg} 分页查询的提示信息
* */
const paginationMiddleware = async (ctx: any, model: any, msg?: string) => {
  const { size, page } = ctx.parsed.query
  // 执行分页查询
  await model.findAndCountAll({
    limit: toInteger(size),
    offset: toInteger((page - 1) * size),
    // 排除 password 字段
    attributes: { exclude: ['password'] }
  })
    .then((res: any) => {
      ctx.body = ctxBody({
        success: true,
        code: 200,
        msg: `查询${msg}成功`,
        data: res
      })
    })
    .catch(e => {
      ctx.body = ctxBody({
        success: false,
        code: 500,
        msg: `查询${msg}失败`,
        data: e
      })
    })
}
/*
* 通过id删除
* */
const deleteByIdMiddleware = async (ctx: any, model: any, msg?: string) => {
  const { id } = ctx.parsed.query
  await model.destroy({
    where: {
      id
    }
  })
    .then((res: any) => {
      if (res === 0) {
        ctx.body = ctxBody({
          success: false,
          code: 500,
          msg: `删除${msg}失败,指定的id不存在`,
          data: res
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
        data: e
      })
    })
}

export {
  paginationMiddleware,
  deleteByIdMiddleware
}


