const log = require('../schema/logTools')
const user = require('../schema/user.model')

class AdminService {
    async getLogs(offset = 0) {
        console.log('---getLogs---')
        console.log(`offset:${offset}`)
        return await log.findAll({
            order: [
                // 我们从要排序的模型开始排序数组
                ['id', 'DESC']
            ],
            raw: true,
            offset: offset,
            limit: 20
        })
        /*.then(res => {
            console.log("res:")
            console.log(res)
        })
        .catch(e => {
            console.log("e:")
            console.log(e)
        })*/
    }

    /* @author icestone , 17:36
     * @date 2023/5/17
     * TODO 返回指定的所有admin信息
    */
    async getAllAdminUserInfo(attr = ['id', 'email', 'username', 'avatar', 'occupation', 'word']) {
        return await user.findAll({
            attributes: attr,
            where: {
                is_admin: 1
            },
            raw: true
        })
    }

    /* @author icestone , 9:10
     * @date 2023/5/18
     * TODO 对admin用户进行操作,
     *  这里通过了参数验证,operate不会为空
    */
    async operateUser(email, operate = null) {
        console.log(`---operateUser---`)
        console.log(`将要修改的email':${email}`)
        // @date 2023/5/18 , @author icestone
        // TODO 设置admin展示在首页
        if (operate == 'showInIndex') {
            // @date 2023/5/18 , @author icestone
            // TODO 展示在首页的只能有一个,现将其他admin用户的 showInIndex 设为0
            await user.update({
                showInIndex: '0'
            }, {
                where: {}
            })

            return await user.update({
                showInIndex: '1'
            }, {
                where: {
                    email
                }
            })
        }
    }

    /* @author icestone , 15:49
     * @date 2023/5/18
     * TODO 获取展示在index页面的admin用户信息:
    */
    async getShowInIndexAdminUser(attr = []) {
        return await user.findOne({
            attributes: attr,
            where: {
                showInIndex: '1'
            },
            raw: true
        })
    }

}

module.exports = new AdminService();