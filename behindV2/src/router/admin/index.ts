import { SwaggerRouter } from 'koa-swagger-decorator'
import { SiteConfigClass } from '@/controller/SiteConfig'
import { swaggerSpec } from '@/config/swagger'

const router = new SwaggerRouter({
  spec: swaggerSpec,
})

router.applyRoute(SiteConfigClass)

module.exports = router
