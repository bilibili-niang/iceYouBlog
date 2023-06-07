import { post } from '@/common/api/request'


export default {
    // @date 2023/6/7 , @author icestone
    // TODO 传入email,返回该用户可以展示的信息
    async getUserInfoByEmail (data) {
        return await post('/user/getUserInfoByEmail', data)
    }
}
