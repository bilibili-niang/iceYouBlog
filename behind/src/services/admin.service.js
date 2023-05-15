const log = require('../schema/logTools')

class AdminService {
    async getLogs(offset = 0) {
        console.log('---getLogs---')
        console.log(`offset:${offset}`)
        return await log.findAll({
            order: [
                // 我们从要排序的模型开始排序数组
                ['id', 'DESC']
            ],
            raw: true,
            offset: offset,
            limit: 20
        })
            /*.then(res => {
                console.log("res:")
                console.log(res)
            })
            .catch(e => {
                console.log("e:")
                console.log(e)
            })*/
    }

}

module.exports = new AdminService();