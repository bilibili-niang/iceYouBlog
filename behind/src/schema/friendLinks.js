const {DataTypes} = require('sequelize')
const seq = require('../db/seq')

const friendLinks = seq.define('markdownFile_friendLinks', {
    title: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '网站的标题',
        defaultValue: '友情链接'
    },
    url: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: 'url',
        defaultValue: '网站的url'
    },
    img: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: 'images',
        defaultValue: '/images/friend/default.png'
    }
});

/*friendLinks.sync({
    // force: 'true'
});*/

module.exports = friendLinks;