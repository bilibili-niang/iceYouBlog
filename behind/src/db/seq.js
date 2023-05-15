//本机数据库连接配置
const {Sequelize} = require('sequelize')
// 将database配置项赋值给databaseConfig
const {database: databaseConfig} = require('../config/default');
console.log('databaseConfig:')
console.log(databaseConfig)
//实例化对象
const seq = new Sequelize(databaseConfig.name, databaseConfig.user, databaseConfig.pwd, {
    host: databaseConfig.host,
    dialect: 'mysql',
    port: databaseConfig.host
})

async function test() {
    try {
        await seq.authenticate()
        console.log('数据库连接成功')
        /*insertLog({
            time: '',
            logType: 'start',
            detail: '服务器启动'
        })*/
    } catch (error) {
        console.error('数据库连接失败:  ', error)
    }
}

test()
module.exports = seq
