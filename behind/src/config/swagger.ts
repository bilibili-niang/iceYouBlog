const { SwaggerRouter } = require('koa-swagger-decorator');
const path = require('path')
const router = new SwaggerRouter();
// swagger docs avaliable at http://localhost:89/swagger-html
router.swagger({
  title: '排课系统',
  description: 'API DOC',
  version: '1.0.0'
});
// 查找对应目录下的routes文件夹
router.mapDir(path.resolve(__dirname, '../controller/'));

// module.exports = router
export {router }