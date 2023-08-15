<template>
  <div class="indexCard" id="element">

    <ice-card>
      <template v-slot:header>
        <ice-title>
          {{ item.title }}
        </ice-title>
        <ice-button @click="goToRead(item.id)">read</ice-button>
      </template>
      <template v-slot:body>
        <div class="ice-column">
          <ice-text v-if="item.description">
            <ice-tag>description</ice-tag>
            {{ item.description }}
          </ice-text>
          <ice-text v-if="item.view">
            <ice-tag>view</ice-tag>
            {{ item.view }}
          </ice-text>
          <ice-text>
            <ice-tag>updatedAt</ice-tag>
            {{ item.updatedAt }} - 最后修改于{{ oldData }}天之前
          </ice-text>
          <ice-text>
            <ice-tag>
              tags:
            </ice-tag>
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
.indexCard {
  z-index: 100;
  position: relative;
  display: flex;
  width: 100%;
  overflow: hidden;
  border-radius: .3rem;

  // 背景
  .bacCover {
    position: absolute;
    z-index: -10;
    display: flex;
    width: 100%;
    height: 100%;
    overflow: hidden;
    transition-duration: .5s;

    .inner {
      transition-duration: .5s;
      display: flex;
      width: 100%;
      height: 100%;
      opacity: .1;
    }
  }

  .card-body {
    padding-left: .3rem;
    padding-right: .3rem;
    border-radius: 0;
    transition: .5s;
    padding-top: 0.35rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .bottomLim {
      display: flex;
      align-items: center;
      flex-wrap: wrap;

      span {
        display: flex;
        align-items: center;
      }
    }
  }

  // 小屏
  @media (max-width: 1200px) {
    .card-body {
      margin-left: 0 !important;
    }

    .imgLim {
      width: 100% !important;
      height: 100%;

      img {
        opacity: .5;
      }
    }
  }
}

.indexCard {
  overflow: hidden;

  .contentTitle {
    display: flex;
    flex-direction: column;
    width: 100%;

    .title {
      font-size: 1.7rem;
      line-height: 1.7rem;
    }

    .other {
      top: 150px;
      display: flex;
      flex-direction: column;
      width: 95%;
    }
  }

  .bottomLim {
    position: absolute;
    bottom: 0;
  }
}

/deep/ .ice-text {
  justify-content: flex-start;
}
</style>
