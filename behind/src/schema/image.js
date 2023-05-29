const {DataTypes} = require('sequelize')
const seq = require('../db/seq')

const image = seq.define('markdown_images', {
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '拥有者邮箱',
        defaultValue: 'adminEmail'
    },
    url: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '图片的url',
        defaultValue: '/images/headImg/defaultHeadImg.png'
    }
})

image.sync({
    // force: 'true'
})
module.exports = image
