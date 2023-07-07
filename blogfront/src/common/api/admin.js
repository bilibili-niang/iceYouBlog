import { post } from './request'

export default {
    async postConfig(params){
        return post('/admin/config',params)
    }
}
