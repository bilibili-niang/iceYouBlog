const log = require('../schema/logTools')

class logC {
    // async insertLog(option = {}) {
    async insertLog(option = {}) {
        return await log.create(option)
            .then(res => {
                console.log(`log insert success`)
            })
            .catch(e => {
                console.error(`log insert error`)
            })
    }
}

module.exports = new logC();