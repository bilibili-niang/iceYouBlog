import { post } from '@/common/api/request'

const http = require('@/common/api/request')

export default {
    async getRecommendByTags (data) {
        console.log('getRecommendByTags')
        return await post('/markdownFile/getRecommendByTags', data)

    }
}
