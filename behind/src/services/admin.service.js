const log = require('../schema/logTools')
const user = require('../schema/user.model')
const config = require('../schema/config')
const connection = require('../db/seq')
const fs = require('fs')
const xlsx = require('xlsx')

class AdminService {
    async getLogs (offset = 0) {
        return await log.findAll({
            order: [
                // 我们从要排序的模型开始排序数组
                ['id', 'DESC']
            ],
            raw: true,
            offset: offset,
            limit: 20
        })
    }

    /* @author icestone , 17:36
     * @date 2023/5/17
     * 返回指定的所有admin信息
    */
    async getAllAdminUserInfo (attr = ['id', 'email', 'username', 'avatar', 'occupation', 'word']) {
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
     * 对admin用户进行操作,
     *  这里通过了参数验证,operate不会为空
    */
    async operateUser (email, operate = null) {
        console.log(`---operateUser---`)
        console.log(`将要修改的email':${ email }`)
        // @date 2023/5/18 , @author icestone
        // 设置admin展示在首页
        if (operate == 'showInIndex') {
            // @date 2023/5/18 , @author icestone
            // 展示在首页的只能有一个,现将其他admin用户的 showInIndex 设为0
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
     * 获取展示在index页面的admin用户信息:
    */
    async getShowInIndexAdminUser (attr = []) {
        return await user.findOne({
            attributes: attr,
            where: {
                showInIndex: '1'
            },
            raw: true
        })
    }

    /* @author 张嘉凯
     * @date 2023/7/7 @time 15:36
     *  更新配置信息
    */
    async updateConfig (params) {
        const oneRow = await config.findOne({
            where: {
                id: 1
            }
        })
        // 存在,修改第一条
        if (oneRow) {
            return await config.update(
                params,
                {
                    where: {
                        id: 1
                    }
                }
            )
        } else {
            return await config.create(params)
        }
    }

    /* @author 张嘉凯
     * @date 2023/7/20 @time 17:16
     * 获取指定数据库信息
    */
    async getTableConfig (tableName) {
        let detail = {}
        detail.totalData = await connection.query(`SELECT * FROM ${ tableName }`)
        return detail
    }

    /* @author 张嘉凯
     * @date 2023/7/21 @time 14:28
     * 数据表备份导出
    */
    async bakupTable (tableName) {
        const [rows, fields] = await connection.query(`SELECT * FROM ${ tableName }`, {})
        const worksheet = xlsx.utils.json_to_sheet(rows)
        const workbook = xlsx.utils.book_new()
        xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

        try {
            xlsx.writeFile(workbook, `./src/backup/${ tableName }.xlsx`)
            console.log('文件写入成功')
            return true
        } catch (error) {
            console.error('文件写入失败:', error)
            this.backupTOJson(tableName)
            return false
        }
    }

    /**
     * admin.service
     * Created At: 2023-07-21 15:47
     * Description: 数据库备份为json
     */
    async backupTOJson (tableName) {
        const [rows, fields] = await connection.query(`SELECT *
                                                       FROM ${ tableName }`, {})
        // 将查询结果转换为JSON格式
        const jsonData = JSON.stringify(rows)
        fs.writeFile(`./src/backup/${ tableName }.json`, jsonData, (error) => {
            if (error) {
                console.error('json写入文件失败:', error)
            } else {
                console.log('json文件写入成功')
            }
        })

    }


    /* @author 张嘉凯
     * @date 2023/7/7 @time 15:47
     *  获取
    */
    async getConfig () {
        return await config.findAll({ raw: true })
    }

    /**
     * 通过表名获取指定表信息
     */
    async getTableInfo (table) {
        return await connection.query(`SELECT COUNT(*) FROM ${ table }`, {})
    }


}

module.exports = new AdminService()
