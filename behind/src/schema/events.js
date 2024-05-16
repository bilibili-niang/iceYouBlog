const { DataTypes } = require('sequelize')
const seq = require('../db/seq')
const events = seq.define('markdown_event', {
    name: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '事件名字,随便起,可以默认为今日的日期'
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '详情,描述'
    },
    content: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '内容'
    },
    tag1: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: 'tag1'
    },
    tag2: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: 'tag2'
    },
    tag3: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: 'tag3'
    },
    tomorrow: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: 'tomorrow,计划'
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '用户id'
    }
}, {
    paranoid: true,
// If you want to give a custom name to the deletedAt column
    deletedAt: 'destroyTime'
})

events.sync({
    // force: 'true'
})

module.exports = events
