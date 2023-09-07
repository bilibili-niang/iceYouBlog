const {
    getAllFriendLinks,
    getAddResult
} = require('../services/friend.service')
const {
    getLogs,
    getAllAdminUserInfo,
    operateUser,
    getShowInIndexAdminUser
} = require('../services/admin.service')
const {
    getDeleteResult
} = require('../services/markdownFile.service')
const {
    paramsVerify
} = require('../middleware/admin.middleware')

const adminS = require('../services/admin.service')
// 数据库操作
const connection = require('../db/seq')
// import errType from '../constant/err.type'
const errType = require('../constant/err.type')


class AdminController {
    // 返回所有友链
    async returnAllFriendLinks (ctx) {
        const result = await getAllFriendLinks()

        ctx.body = {
            code: 200,
            message: '获取所有友链',
            success: true,
            result
        }
    }

    // 增
    async returnAddResult (ctx) {
        const { form } = ctx.request.body
        console.log("form:")
        console.log(form)
        const result = await getAddResult(form)
        ctx.body = {
            code: 200,
            success: true,
            message: '增加一条友链',
            result
        }

    }

    // @date 2023/5/8 , @author icestone
    // 返回log
    async returnLogs (ctx) {
        console.log('---returnLogs---')
        const { offset = 0 } = ctx.request.body
        console.log(`offset:${ offset }`)
        const result = await getLogs(offset)
        ctx.body = {
            code: 200,
            success: true,
            message: '获取logs',
            result
        }
    }

    /* @author icestone , 18:20
     * @date 2023/5/9
     * 对文章进行操作
    */
    async operateMarkdown (ctx) {
        const {
            operate = '',
            ids = ''
        } = ctx.request.body
        console.log(`ids:${ ids },operate:${ operate }`)
        if (operate === 'del') {
            console.log('删除')
            const result = await getDeleteResult(ids, ctx.state.user.email)
            ctx.body = {
                code: 200,
                success: true,
                message: '伪删除文章',
                result
            }
        }
    }


    /* @author icestone , 17:32
 * @date 2023/5/17
 * 返回admin用户的列表
*/
    async returnAllAdminUser (ctx) {
        paramsVerify
        const result = await getAllAdminUserInfo()
        ctx.body = {
            code: 200,
            success: true,
            message: "获取所有admin用户列表",
            result
        }
    }

    /* @author icestone , 18:37
     * @date 2023/5/17
     * 对admin用户进行操作
    */

    async returnOperateResult (ctx) {
        const paramsRes = paramsVerify({
            email: {
                allowNull: false,
                default: null,
                from: 'user'
            },
            operate: {
                allowNull: false,
                default: null,
            }
        }, ctx)
        if (paramsRes === 0) {
            const result = await operateUser(ctx.request.body.email, ctx.request.body.operate)
            ctx.body = {
                code: 200,
                success: true,
                message: '操作admin用户成功',
                result,
            }
        } else {
            console.log('paramsRes的传参错误')
            ctx.body = paramsRes
        }
    }

    /* @author icestone , 15:47
     * @date 2023/5/18
     * 返回展示在index页面的admin用户信息
    */
    async returnIndexAdmin (ctx) {
        const result = await getShowInIndexAdminUser(['id', 'email', 'username', 'avatar', 'occupation', 'githubUrl', 'word'])
        ctx.body = {
            code: 200,
            success: true,
            message: "获取展示在index页面的用户",
            result
        }
    }

    /* @author 张嘉凯
     * @date 2023/7/5 @time 15:26
     * 修改配置信息
    */
    async returnConfig (ctx) {
        const {
            // 是否开启注册
            registerFlag = null,
            table = null,
            // 备份
            backupTable = null
        } = ctx.request.body
        let result = ''
        // 修改注册状态
        if (registerFlag) {
            result = await adminS.updateConfig({
                registerFlag
            })
            ctx.body = {
                code: 200,
                success: true,
                message: '修改注册状态',
                result
            }
        }
        /* @author 张嘉凯
         * @date 2023/7/20 @time 17:24
         * 获取指定数据表格信息
        */
        if (table) {
            result = await adminS.getTableConfig(table)
            ctx.body = {
                code: 200,
                success: true,
                message: '获取指定数据表格信息',
                result
            }
        }
        /* @author 张嘉凯
         * @date 2023/7/21 @time 14:22
         * 备份数据表
        */
        if (backupTable) {
            result = await adminS.bakupTable(backupTable)
            ctx.body = {
                code: 200,
                success: true,
                message: '备份数据表成功',
                result
            }
        }


    }

    /* @author 张嘉凯
     * @date 2023/7/7 @time 15:46
     *  获取配置信息
    */
    async getConfig (ctx) {
        const result = await adminS.getConfig()
        ctx.body = {
            code: 200,
            message: '获取配置信息',
            success: true,
            result
        }
    }

    /* @author 张嘉凯
     * @date 2023/7/20 @time 14:07
     * 获取所有数据表信息
    */
    async getDatabaseInfo (ctx) {
        const databases = await connection.query("SHOW TABLES", {})
        // 数据表的key
        const tableKey = Object.keys(databases[0][0])[0]
        const tables = databases[0].map(table => table[tableKey])
        const tablesDetail = await Promise.all(databases[0].map(table => adminS.getTableInfo(table[tableKey])))
        const tableObj = {}
        tables.map((item, index) => {
            tableObj[item] = tablesDetail[index][0][0]
        })
        ctx.body = {
            result: { ...tableObj },
            code: 200,
            success: true,
            message: '获取所有数据表信息'
        }
    }

    /**
     * 获取指定数据表信息
     */
    async getSelectInfo (ctx) {
        const { tableName = null } = ctx.request.body
        console.log(tableName)
        if (!tableName) {
            ctx.body = errType.userParamsError
        } else {
            const result = await adminS.getTableInfo(tableName)

            ctx.body = {
                code: 200,
                message: '返回指定表信息',
                result
            }
        }

    }

}

module.exports = new AdminController()
