<template>
  <ice-column>
    <!--推荐-->
    <ice-card :border="false" v-if="markdownList">
      <template v-slot:header>
        <ice-tag>文章推荐↓点击下面展开</ice-tag>
      </template>
      <template v-slot:bottom>
        <!--推荐文章-->
        <ice-column width="98%">
          <template v-for="(item, index) in markdownList" :key="index">
            <IndexCard :item="item"></IndexCard>
          </template>
          <div class="indexCard"></div>
          <div class="indexCard"></div>
          <div class="indexCard"></div>
        </ice-column>
      </template>
    </ice-card>
  </ice-column>
</template>

<script>
import http from '@/api/request'
import MarkdownTags from '@/components/common/MarkdownTags.vue'
import timeFormat from '@/common/filter/time'
import IndexCard from '@/components/index/IndexCard.vue'

export default {
  name: 'Recommend',
  components: { IndexCard, MarkdownTags },
  data() {
    return {
      markdownList: ''
    }
  },
  methods: {
    DateDiffer(Date_end) {
      //date1结束时间
      let date1 = new Date(Date_end)
      //date2当前时间
      let date2 = new Date()
      date1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate())
      date2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate())
      const diff = date1.getTime() - date2.getTime() //目标时间减去当前时间
      const diffDate = diff / (24 * 60 * 60 * 1000) //计算当前时间与结束时间之间相差天数
      return diffDate
    },
    timeFormat(time) {
      return timeFormat.timeFormat(time)
    },
    //property是你需要排序传入的key,bol为true时是升序，false为降序
    dateData(property, bol) {
      return function (a, b) {
        var value1 = a[property]
        var value2 = b[property]
        if (bol) {
          // 升序
          return Date.parse(value1) - Date.parse(value2)
        } else {
          // 降序
          return Date.parse(value2) - Date.parse(value1)
        }
      }
    },
    getRecommendData() {
      http
        .$axios({
          url: '/markdownFile/getRecommend',
          method: 'GET'
        })
        .then(res => {
          this.markdownList = res.result
          this.markdownList.sort(this.dateData('updatedAt', false))
        })
    },
    goToRead(id) {
      const routeUrl = this.$router.resolve({
        path: '/read',
        query: { id }
      })
      window.open(routeUrl.href, '_blank')
    }
  },
  created() {
    this.getRecommendData()
  }
}
</script>
