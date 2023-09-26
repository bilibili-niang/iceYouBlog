import images from './images'
import markdownFileApi from './markdownFiles'
import user from './user'
import admin from './admin'
import bonus from './bonus'

export default {
    ...markdownFileApi,
    ...user,
    ...images,
    ...admin,
    ...bonus
}
