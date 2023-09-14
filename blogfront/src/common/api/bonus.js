import { get } from '@/common/api/request'

export default {
    async getRandom () {
        return get('/bonus/randomOne')
    }
}
