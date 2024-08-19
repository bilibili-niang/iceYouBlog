import { post } from '@/api/request'


export default {
    async operateImage (operate, url) {
        return await post('/image/operate', {
            operate,
            url
        })
    }

}
