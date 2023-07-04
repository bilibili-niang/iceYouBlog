const image = require('../schema/image')
const { Op } = require('sequelize')

class ImageService {
    async operateImageByUrl (operate, url) {
        const operateRes = await image.findOne({
            where: {
                url: {
                    [Op.like]: '%' + url + '%'
                }
            },
            raw: true,
        })
        console.log(operateRes)

    }

// 写入图片上传记录
    async saveImageInfo (fullPath, userEmail, markdownId,type='blog') {
        await image.create({
            fullPath,
            type,
            userEmail,
            markdownId
        })
    }

}

module.exports = new ImageService()
