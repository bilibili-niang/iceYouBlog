// 测试通过url将文章内容插入:
const {
    updateDataByUrl
} = require('../services/tool.service');

const urlObj = {
    ul: 'https://blog.csdn.net/ice_stone_kai/article/details/128270130',
    id: '1'
}
updateDataByUrl(urlObj)
    .then(
        res => {
            console.log(res)
        }
    )
    .catch(e => {
        console.log(e)
    })


