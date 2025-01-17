import { ctxBody } from '@/utils'

/*
* 对post传参进行校验
* */
const verificationPost = (ctx: any, cla: any) => {
  return new Promise((resolve, reject) => {
    console.log('swaggerDocument:')
    console.log(cla.swaggerDocument)

    const { body = null } = ctx.request
    if (!body) {
      ctx.body = ctxBody({
        msg: 'body 不能为空'
      })
      reject()
    } else {


    }
  })
}

/*
* 为ctx挂载一个校验方法,
* 期望的校验方法应该是传入指定校验的class,获取class的swaggerDocument,然后对比body中的参数是否正确,如果不正确的话,响应对应的description
* */
const validate = async (ctx, next): Promise<any> => {
  console.log('后去后置ctx:')
  console.log(ctx)

  await next()
}


export { verificationPost, validate }
