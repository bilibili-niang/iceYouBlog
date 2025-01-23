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

<script lang="ts">
import { defineComponent } from 'vue'
import { getRecommendList } from '@/api/recommend'
import MarkdownTags from '@/components/common/MarkdownTags.vue'
import timeFormat from '@/common/filter/time'
import IndexCard from '@/components/index/IndexCard.vue'

interface MarkdownItem {
  id: string | number
  title: string
  content: string
  updatedAt: string
  createdAt: string
  [key: string]: any
}

export default defineComponent({
  name: 'Recommend',
  components: { IndexCard, MarkdownTags },
  data() {
    return {
      markdownList: [] as MarkdownItem[]
    }
  },
  methods: {
    DateDiffer(Date_end: string): number {
      let date1: Date = new Date(Date_end)
      let date2: Date = new Date()
      date1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate())
      date2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate())
      const diff: number = date1.getTime() - date2.getTime()
      const diffDate: number = diff / (24 * 60 * 60 * 1000)
      return diffDate
    },
    timeFormat(time: string): string {
      return timeFormat.timeFormat(time)
    },
    dateData(property: keyof MarkdownItem, bol: boolean) {
      return function(a: MarkdownItem, b: MarkdownItem): number {
        const value1: string = a[property] as string
        const value2: string = b[property] as string
        if (bol) {
          return Date.parse(value1) - Date.parse(value2)
        } else {
          return Date.parse(value2) - Date.parse(value1)
        }
      }
    },
    getRecommendData(): void {
      getRecommendList().then(res => {
        this.markdownList = res.data.rows
        console.log('this.markdownList--------------')
        console.log(this.markdownList)
        this.markdownList.sort(this.dateData('updatedAt', false))
      })
    },
    goToRead(id: string | number): void {
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
})
</script>
