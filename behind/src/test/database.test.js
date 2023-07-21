// const adminC =require('../../src/controller/admin.controller')
// adminC.getDatabaseInfo()
const connection=require('../db/seq')


let sql = 'SELECT *';
// 查询所有的表
connection.query("SHOW TABLES", {  })
    .then((tables) => {
        // tables 是一个包含所有表名的数组
        console.log('查询成功');
        console.log(tables[0]);
    })
    .catch((error) => {
        console.error('查询表时发生错误:', error);
    });
