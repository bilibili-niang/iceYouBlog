const { DataTypes } = require('sequelize')
const seq = require('../db/seq')
const config=seq.define('markdown_config',{
    registerFlag:{
        type: DataTypes.STRING,
        allowNull: true,
        comment: '是否允许注册',
        // 0 不允许,1 允许
        default: 0
    },


})

/*config.sync({
    // force: 'true'
})*/

module.exports = config
