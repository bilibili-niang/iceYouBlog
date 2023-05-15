const log = require('../schema/logTools');

async function insertLog(option = {}) {
    console.log(option)
    const res = await log.create({
        time: option.time,
        logType: option.logType
    })
    console.log(res)
}

/*insertLog({
    time: new Date(Date.now()),
    logType: 'test'
});*/
console.log("new Date(Date.now())")
console.log(new Date(Date.now()))
console.log("new Date().getTimezoneOffset()")
console.log(new Date().getTimezoneOffset())