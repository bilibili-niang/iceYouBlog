const {DataTypes} = require('sequelize')
const seq = require('../db/seq')
const code = seq.define('markdown_code', {
    title: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '标题',
        defaultValue: '不存在的title'
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '描述'
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: 'email',
        defaultValue: '2714351312@qq.com'
    },
    tag1: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: 'tag1',
        defaultValue: 'tag1'
    },
    tag2: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: 'tag2',
        defaultValue: 'tag2'
    },
    tag3: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: 'tag3',
        defaultValue: 'tag3'
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: '空的文章内容'
    },
    state: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: 'codeState',
        comment: 'codeClips的状态,-1为已删除'
    }
})

/*code.sync({
    // force: 'true'
})*/

module.exports = code