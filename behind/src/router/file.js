const Router = require('koa-router');
const {
    authBybody,
    auth
} = require('../middleware/user.middleware');
const router = new Router({prefix: '/file'});
const {
    updateUserAvatar
} = require('../controller/user.controller');
const {
 uploadMarkdownImage
}=require('../controller/markdown.controller')

/* @author icestone , 15:15
 * @date 2023/5/11
 * TODO 用户头像更改
*/
router.post('/avatar', authBybody, updateUserAvatar)

/* @author icestone , 15:15
 * @date 2023/5/11
 * TODO markdown图片上传
*/
router.post('/markdownImages', auth, uploadMarkdownImage)

module.exports = router