import { post, get } from './request'

export default {
    async postConfig (params) {
        return post('/admin/config', params)
    },
    async getConfig () {
        return post('/admin/getconfig')
    },
    async getDatabases(){
        return post('/admin/database')
    },
    /* @author 张嘉凯
     * @date 2023/8/2 @time 15:50
     * 获取展示在首页的admin用户信息
    */
    async getAdminInfo () {
        return get('/admin/showInIndexAdminInfo')
    }
}
