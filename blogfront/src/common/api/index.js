import images from './images'
import markdownFileApi from './markdownFiles'
import user from './user'
import admin from './admin'
import bonus from './bonus'
import search from "@/common/api/search";

export default {
    ...markdownFileApi,
    ...user,
    ...images,
    ...admin,
    ...bonus,
    ...search
}
