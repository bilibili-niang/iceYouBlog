const {DataTypes} = require('sequelize')
const seq = require('../db/seq')

const image = seq.define('markdown_images', {
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '拥有者邮箱'
    },
    url: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '图片的url'
    },
    type: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '图片的用处',
        defaultValue: 'blog'
    },
    userEmail:{
        type: DataTypes.STRING,
        allowNull: true,
        comment: '图片上传的用户',
        defaultValue: 'userEmail'
    },
    fullPath:{
        type: DataTypes.STRING,
        allowNull: true,
        comment: '图片的完整路径',
    },
    markdownId:{
        type: DataTypes.STRING,
        allowNull: true,
        comment: '图片被使用的文章id'
    }
})

image.sync({
    // force: 'true'
})
module.exports = image
