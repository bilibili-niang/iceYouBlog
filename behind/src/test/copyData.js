const sql = require('../db/seq');

// 新表
const markdownFile = require('../schema/markdownFile')
const markdownFileOld = require('./model/markdownFileOld')

async function run() {
    const oldRes = await markdownFileOld.findAll({
        raw: true
    })
    /*console.log("oldRes:")
    console.log(oldRes)*/
    for (const item of oldRes) {
        const index = oldRes.indexOf(item);
        await markdownFile.create(item)
            .then(res => {
                console.log('成功')
            })
            .catch(e => {
                console.log('失败')
                console.log(e)
            })
    }

}

// run();
