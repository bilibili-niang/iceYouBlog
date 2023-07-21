import { get, post } from '@/common/api/request'


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
    async getUserInfo(params){
        return post('/user/getUserInfoByEmail/',params)
    },
    // 获取首页数据
    async initCount(params){
        return get('/markdownFile/allCounts')
    }
}
