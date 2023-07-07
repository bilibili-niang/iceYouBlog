import images from '@/common/api/images'

const markdownFileApi = require('./markdownFiles')
const user = require('./user')
const admin = require('./admin')
export default {
    ...markdownFileApi,
    ...user,
    ...images,
    ...admin
}
