import http from './request'
import { ARTICLE_RECOMMEND } from '@/constant'

/**
 * 获取推荐文章列表
 * @returns {Promise}
 */
export function getRecommendList() {
  return http.$axios({
    url: '/markdown/list',
    params: {
      getRecommend: true,
      size: 3000
    },
    method: 'GET'
  })
}
