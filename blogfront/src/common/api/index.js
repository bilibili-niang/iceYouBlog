import images from '@/common/api/images'
import markdownFileApi from './markdownFiles'
import user from './user'
import admin from './admin'

export default {
    ...markdownFileApi,
    ...user,
    ...images,
    ...admin
}
