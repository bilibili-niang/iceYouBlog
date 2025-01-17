import { SwaggerRouter } from 'koa-swagger-decorator'
import { UserController } from '@/controller/User'
import { swaggerSpec } from '@/config/swagger'


const router = new SwaggerRouter({
  spec: swaggerSpec,
})
router.swagger()

router
  .applyRoute(UserController)

module.exports = router
