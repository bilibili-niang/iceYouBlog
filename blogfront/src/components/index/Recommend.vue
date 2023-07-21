<template>
  <div class="recommend">
    <!--推荐-->
    <div class="markdown" v-if="markdownList">
      <div class="btns m-b">
        <el-tag>文章推荐</el-tag>
      </div>
      <!--推荐文章-->
      <div class="markdownLim card p-normal m-b border-radius-normal hvr-glow" v-for="(item,index) in markdownList"
           :key="index">
        <div class="title">
          <el-text class="mx-1">{{ item.title }}</el-text>
        </div>
        <div class="time bottomDetail">
          <markdownTags tag="更新时间" :click="false" v-if="item.tag1"></markdownTags>
          <el-text> {{ timeFormat(item.updatedAt) }} - 更新于{{ DateDiffer(item.updatedAt) }}天之前</el-text>
        </div>
        <div class="btns bottomDetail">
          <el-button round @click="goToRead(item.id)" class="m-r">read</el-button>
        </div>
        <span class="tags bottomDetail">
            <markdownTags :tag="item.tag1" :click="true" v-if="item.tag1"></markdownTags>
            <markdownTags :tag="item.tag2" :click="true" v-if="item.tag2"></markdownTags>
            <markdownTags :tag="item.tag3" :click="true" v-if="item.tag3"></markdownTags>
          </span>
      </div>
    </div>

  </div>
</template>

<script>
import http from '@/common/api/request'
import MarkdownTags from "@/components/common/MarkdownTags.vue"
import timeFormat from "@/common/filter/time"

export default {
  name: "Recommend",
  components: { MarkdownTags },
  data () {
    return {
      markdownList: ''
    }
  },
  methods: {
    DateDiffer (Date_end) {
      //date1结束时间
      let date1 = new Date(Date_end)
      //date2当前时间
      let date2 = new Date()
      date1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate())
      date2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate())
      const diff = date1.getTime() - date2.getTime() //目标时间减去当前时间
      const diffDate = diff / ( 24 * 60 * 60 * 1000 )  //计算当前时间与结束时间之间相差天数
      return diffDate
    },
    timeFormat (time) {
      return timeFormat.timeFormat(time)
    },
    //property是你需要排序传入的key,bol为true时是升序，false为降序
    dateData (property, bol) {
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
    getRecommendData () {
      http.$axios({
        url: '/markdownFile/getRecommend',
        method: 'GET',
      })
          .then(res => {
            this.markdownList = res.result
            this.markdownList.sort(this.dateData('updatedAt', false))
          })
          .catch(e => {
            console.log("e:")
            console.log(e)
          })
    },
    goToRead (id) {
      const routeUrl = this.$router.resolve({
        path: "/read",
        query: { id }
      })
      window.open(routeUrl.href, '_blank')
    },
  },
  created () {
    this.getRecommendData()
  }
}
</script>

<style scoped lang="less">
.recommend {
  display: flex;
  flex-direction: column;
  max-width: 100%;

  .markdown {
    display: flex;
    width: 100%;
    max-width: 100%;
    flex-direction: column;
    flex-wrap: wrap;

    .markdownLim {
      overflow: hidden;
      position: relative;
      display: flex;
      width: 100%;
      margin-bottom: .3rem;
      height: 9rem;
      border-top-left-radius: 1rem;
      border-bottom-right-radius: 1rem;
      transition: .3s;

      &:hover {
        border-top-left-radius: 2rem !important;
        border-bottom-right-radius: 2rem !important;
        z-index: 9999;

        .title {
          top: 5px !important;

          span {
            overflow-x: hidden;
            font-size: 15px !important;
          }
        }

        .bottomDetail {
          opacity: 1 !important;
          left: 5px !important;
        }

        .tags {
          bottom: 2px !important;
        }

        .btns {
          bottom: 35px !important;
        }

        .time {
          bottom: 65px !important;
        }
      }

      .title {
        position: absolute;
        top: 45%;
        transition: .3s;
        width: 100%;

        span {
          font-size: 25px;
          transition: .3s;
          line-height: 20px;
        }
      }

      .bottomDetail {
        position: absolute;
        bottom: -50px;
        left: 0;
        opacity: 1;
      }

      .tags {
        transition: .8s;
      }

      .btns {
        transition: .6s;
      }

      .time {
        transition: .2s;
      }

      .btns {
        flex-direction: row;
        display: flex;
      }
    }
  }

}
</style>
