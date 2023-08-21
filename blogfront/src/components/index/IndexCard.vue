<template>
  <div class="indexCard">
    <ice-card>
      <template v-slot:header>
        <ice-title>
          {{ item.title }}
        </ice-title>
        <ice-button @click="goToRead(item.id)">read</ice-button>
      </template>
      <template v-slot:body>
        <div class="ice-column">
          <ice-text>
            <div v-if="item.description" class="ice-column">
              <ice-tag>描述</ice-tag>
              {{ item.description }}
            </div>
          </ice-text>
          <ice-text v-if="item.view">
            <ice-tag>浏览量</ice-tag>
            {{ item.view }}
          </ice-text>
          <ice-text>
            <ice-tag>更新时间</ice-tag>
            {{ item.updatedAt }} - 最后修改于{{ oldData }}天之前
          </ice-text>
          <ice-text>
            <ice-link :tag="item.tag1" v-if="item.tag1" :href="'#/read/readTag?tag1='+item.tag1">
              {{ item.tag1 }}
            </ice-link>
            <ice-link :tag="item.tag2" v-if="item.tag2" :href="'#/read/readTag?tag1='+item.tag2">
              {{ item.tag2 }}
            </ice-link>
            <ice-link :tag="item.tag3" v-if="item.tag3" :href="'#/read/readTag?tag1='+item.tag3">
              {{ item.tag3 }}
            </ice-link>
          </ice-text>
        </div>
      </template>
    </ice-card>
  </div>
</template>

<script>
import MarkdownTags from "@/components/common/MarkdownTags.vue"
import timeFormat from "@/common/filter/time"
import LazyImg from '@/components/common/LazyImg.vue'

export default {
  name: "indexCard",
  components: { LazyImg, MarkdownTags },
  props: {
    item: {},
    selectOperate: {
      type: String
    },
    showOperate: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      oldData: ''
    }
  },
  methods: {
    jumpTag (tag) {
      const routeUrl = this.$router.resolve({
        path: "/read/readTag",
        query: { tag }
      })
      window.open(routeUrl.href, '_blank')
    },
    DateDiffer (Date_end) {
      //date1结束时间
      let date1 = new Date(Date_end)
      //date2当前时间
      let date2 = new Date()
      date1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate())
      date2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate())
      const diff = date1.getTime() - date2.getTime() //目标时间减去当前时间
      const diffDate = diff / ( 24 * 60 * 60 * 1000 )  //计算当前时间与结束时间之间相差天数
      this.oldData = diffDate
    },
    // 跳转阅读
    goToRead (id) {
      const routeUrl = this.$router.resolve({
        path: "/read",
        query: { id }
      })
      window.open(routeUrl.href, '_blank')
    },
  },
  watch: {
    item (newVal) {
      // @date 2023/5/5 , @author icestone
      // 分页数据更改时数据会更改,再次格式化时间
      this.item.updatedAt = timeFormat.timeFormat(newVal.updatedAt) || ''
    }
  },
  created () {
    this.DateDiffer(this.item.updatedAt)
    // @date 2023/5/5 , @author icestone
    // 第一次创建子组件并接收到值时需要格式化下时间
    this.item.updatedAt = timeFormat.timeFormat(this.item.updatedAt) || ''
  },
}
</script>

<style scoped lang="less">
@media (max-width: 1200px) {
  .indexCard {
    width: 100%;
  }
}

@media (min-width: 1200px) {
  .indexCard {
    width: 49%;
  }
}
</style>
