import { get, post } from './index'


export default {
    // 通过tag和文章id返回相关文章
    async getRecommendByTags (params) {
        return post('/markdownFile/getRecommendByTags', params)
    },
    async getTopArticle (params) {
        return post('/markdownFile/getTopArticle', params)
    },
    // 评论更新
    async updateComment (params) {
        return post('/comment/update', params)
    },
    // 通过email获取个人信息
    async getUserInfo (params) {
        return post('/user/getUserInfoByEmail/', params)
    },
    // 获取首页数据
    async initCount () {
        return get('/markdownFile/allCounts')
    },
    /**
     * Created At: 2023-07-21 16:12
     * Description: 获取codeclips列表
     */
    async getCodeClipsList () {
        return get('/code/getCodeClips')
    },
    /* @author 张嘉凯
     * @date 2023/7/31 @time 13:39
     * 获取浏览量
    */
    async getViews () {
        return post('/home/allviews')
    },
    /* @author 张嘉凯
     * @date 2023/7/31 @time 13:40
     * 获取首页数据
    */
    async getHomeData () {
        return get('/api/home')
    },
    async postHomeData (params) {
        return post('/home', params)
    },
    /* @author 张嘉凯
     * @date 2023/8/2 @time 15:41
     * 获取所有浏览量
    */
    async getAllViews (params) {
        return post('/home/allviews', params)
    }

}
