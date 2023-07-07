const { DataTypes } = require('sequelize')
const seq = require('../db/seq')
const config=seq.define('config',{
    

})

/*config.sync({
    // force: 'true'
})*/

module.exports = config
