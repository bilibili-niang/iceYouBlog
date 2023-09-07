//本机数据库连接配置
const { Sequelize } = require('sequelize')
// 将database配置项赋值给databaseConfig
const { database: databaseConfig } = require('../config/default')

//实例化对象
const seq = new Sequelize(databaseConfig.name, databaseConfig.user, databaseConfig.pwd, {
    host: databaseConfig.host,
    dialect: 'mysql',
    port: databaseConfig.host,
    // 设置字符集为utf8mb4
    charset: 'utf8mb4',
    //disable logging;default:console.log
    logging: false
})

async function test () {
    try {
        await seq.authenticate()
    } catch (error) {
        console.error('数据库连接失败:  ', error)
    }
}

test()
module.exports = seq
