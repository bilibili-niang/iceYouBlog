import { SwaggerRouter } from 'koa-swagger-decorator'
import { swaggerSpec } from '@/config/swagger'
import { MarkdownClass } from '@/controller/Markdown'

const router = new SwaggerRouter({
  spec: swaggerSpec,
})
router.swagger()

router.applyRoute(MarkdownClass)

module.exports = router
