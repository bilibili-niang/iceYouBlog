import { get } from '@/api/request'

export default {
    async getRandom () {
        return get('/bonus/randomOne')
    }
}
