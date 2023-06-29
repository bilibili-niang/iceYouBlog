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

}

module.exports = new ImageService()
