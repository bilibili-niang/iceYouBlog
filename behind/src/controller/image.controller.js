const { operateImageByUrl } = require('../services/image.service')

class ImageController {
    async returnOperateResult (ctx) {
        const { operate = null, url = null } = ctx.request.body
        console.log(operate,url)
        if (operate & url) {
            if (operate == 'del') {
                const result = await operateImageByUrl('del', url)
                console.log('result:')
                console.log(result)
            }
        }


    }
}

module.exports = new ImageController()
