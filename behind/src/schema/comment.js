const {DataTypes} = require('sequelize')
const seq = require('../db/seq')

const comment = seq.define('markdown_comments', {
    nickName: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '评论用户的名字',
        defaultValue: '无名之辈'
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '评论用户的email',
        defaultValue: ''
    },
    webSite: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '评论用户的留言网址',
        defaultValue: ''
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: '评论用户的留言内容',
        defaultValue: ''
    },
    type: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: '评论的出处,默认为blog',
        defaultValue: 'blog'
    },
    from: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: '评论的关联id',
        defaultValue: '0'
    }
});

comment.sync({
    // force: 'true'
});

module.exports = comment;