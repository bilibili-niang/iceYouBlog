

class LogController {
    writeLog(option = {}) {
        console.log(option)
        console.log('写入日志')
    }


}

module.exports = new LogController()