const { body, query, request, summary, swaggerClass, swaggerProperty, tags } = require('koa-swagger-decorator')

/*
* 用户注册
* */
@swaggerClass()
export class userInfo {
  @swaggerProperty({ type: 'string', required: true, description: '用户邮箱' }) email: string = ''
  @swaggerProperty({ type: 'string', required: true, description: '用户名' }) name: string = ''
  @swaggerProperty({ type: 'string', required: true, description: '用户密码' }) password: string = ''
}