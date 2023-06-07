const code = require('../schema/code')
const { Op } = require('sequelize')

class CodeService {
    async newCodeClips (email, options) {
        console.log("email:")
        console.log(email)
        console.log("options:")
        console.log(options)
        options.state = '1'
        options.email = email
        return code.create(options, {
            raw: true
        })
    }

    // 返回
    async getCodeClips () {
        return await code.findAll({
            attributes: {
                exclude: ['updatedAt'],
                where: {
                    state: {
                        [Op.ne]: '-1'
                    }
                }
            },
            order: [
                // 我们从要排序的模型开始排序数组
                ['id', 'DESC']
            ],
            raw: true
        })
    }

// 通过传入的id删除
    async delCodeClipsById (id) {
        return await code.update({
            state: '-1'
        }, {
            where: {
                id
            }
        })
    }

// 通过id返回codeClips数据
    async getCodeClipsData (id) {
        return await code.findAll({
            where: {
                id
            }
        })
    }

    async getCodeByKeyWord (key) {
        return await code.findAll({
            where: {
                content: {
                    // 模糊查询
                    [Op.like]: '%' + key + '%'
                }
            },
            raw: true,
            // 控制查询字段
            // attributes: ['id', 'title', 'description']
        })
    }
}

module.exports = new CodeService()
