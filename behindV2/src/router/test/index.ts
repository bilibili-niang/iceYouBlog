import { SwaggerRouter } from 'koa-swagger-decorator'
import { swaggerSpec } from '@/config/swagger'
import TestController from '@/controller/Test/TestController'


/*
* 请不要在这里配置前缀,这些路由是由创建了多个 SwaggerRouter 然后在 ../index.ts 中导入再导出的,如果在这里加前缀会有问题
* */
const router = new SwaggerRouter({
  spec: swaggerSpec
})

router.swagger()

router
  .applyRoute(TestController)

module.exports=router