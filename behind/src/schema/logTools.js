const {DataTypes} = require('sequelize');
const seq = require('../db/seq');

const logTools = seq.define('log', {
//id会被sequelize自动创建,管理
    time: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: 'log写入的时间',
        defaultValue:new Date()
    },
    logType: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "log写入的类型"
    },
    detail: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "说明",
        default: '不道,这是默认的'
    },
    ip: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "记载一下ip地址,可以用作用户找回密码的依据",
        default: '127.0.0.0'
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "记载一下用户唯一id,找回用户密码用的",
        default: ''
    },
    fileNameAndPath: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '记录log的文件名/文件具体位置'
    }
})

logTools.sync({
    // force: 'true'
})
module.exports = logTools

