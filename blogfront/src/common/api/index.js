import images from '@/common/api/images'

const markdownFileApi = require('./markdownFiles')
const user = require('./user')
export default {
    ...markdownFileApi,
    ...user,
    ...images
}
