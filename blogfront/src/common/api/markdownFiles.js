import { post } from '@/common/api/request'


export default {
    async getRecommendByTags (data) {
        return post('/markdownFile/getRecommendByTags', data)
    }
}
