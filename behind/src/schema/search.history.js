const {DataTypes} = require('sequelize');
const seq = require('../db/seq');

const searchHistory = seq.define('markdown_searchHistory', {
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '用户邮箱'
    },
    key: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '搜索的关键字'
    }
});

/*searchHistory.sync({
    // force: 'true'
})*/

module.exports = searchHistory