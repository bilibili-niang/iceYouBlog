<template>
  <div class="indexCard hover" id="element">
    <div class="btns" v-if="showOperate">
      <el-checkbox v-model="item.checked" border/>
    </div>
    <div class="bacCover">
      <div class="inner"></div>
    </div>
    <div class="card-body">
      <el-text tag="b" size="large">
        <h5>{{ item.title }}</h5>
      </el-text>
      <el-text>{{ item.updatedAt }} - 最后修改于{{ oldData }}天之前</el-text>
      <el-text>{{ item.description }}</el-text>
      <!--goToDetail-->
      <div class="bottomLim">
        <span>
          <el-button round @click="goToRead(item.id)">read</el-button>
        </span>
        <el-divider direction="vertical"/>
        <!--<span @click="support(item.id)">
                  <el-button round circle>赞</el-button>
                   <el-text>
                    {{ item.praise }}
                  </el-text>
                </span>-->
        <el-divider direction="vertical"/>
        <span>
          <el-button round class="m-r">view</el-button>
          <el-text>
            {{ item.view }}
          </el-text>
        </span>
        <el-divider direction="vertical"/>
        <span v-if="item.recommendLevel>1">
          <el-button round class="m-r">recommendLevel</el-button>
          <el-text>
            {{ item.recommendLevel }}
          </el-text>
        <el-divider direction="vertical"/>
        </span>
        <span class="tags">
            <markdownTags :tag="item.tag1" :click="true" v-if="item.tag1"></markdownTags>
            <markdownTags :tag="item.tag2" :click="true" v-if="item.tag2"></markdownTags>
            <markdownTags :tag="item.tag3" :click="true" v-if="item.tag3"></markdownTags>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import MarkdownTags from "@/components/common/MarkdownTags.vue"
import timeFormat from "@/common/filter/time"
import http from "@/common/api/request"
import { ElMessage } from "element-plus"
import { h } from "vue"
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

  mounted () {
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
      this.oldData = diffDate
    },
    alertMessage (title, sub, color) {
      const useColor = color || 'red'
      ElMessage({
        message: h('p', null, [
          h('span', null, title),
          h('i', { style: `color: ${ useColor }` }, sub),
        ]),
      })
    },
    // 赞
    async support (id) {
      const res = await http.$axios({
        url: '/home/support',
        method: 'POST',
        data: {
          id
        },
        headers: {
          token: true
        }
      })
      this.alertMessage(res.message)
      this.item.praise ++
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
    },
    selectOperate (newVal) {
      if (this.item.checked) {
        console.log(item.id)
      }
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
      border-radius: .3rem;
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
</style>
