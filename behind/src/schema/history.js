const {DataTypes} = require('sequelize')
const seq = require('../db/seq')
const history = seq.define('markdown_history', {
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '用户邮箱,唯一'
    },
    fileName: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '浏览的文章的名称'
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '浏览的文章的描述'
    },
    fileId: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '浏览的文章id'
    },
    type: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '浏览的内容类型,以后可能扩展,默认为blog',
        defaultValue: 'blog'
    },
    key: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '搜索的关键字'
    }
})

history.sync({
    // force: 'true'
})

module.exports = history