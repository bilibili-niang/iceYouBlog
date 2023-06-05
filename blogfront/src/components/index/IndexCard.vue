<template>
  <div class="indexCard hover" id="element">
    <div class="bacCover">
      <div class="inner"></div>
    </div>
    <div class="card-body">
      <el-text tag="b" size="large">
        <h5>{{ item.title }}</h5>
      </el-text>
      <el-text>{{ item.createdAt }} {{ oldData }}天之前的文章</el-text>
      <el-text>{{ item.description }}</el-text>
      <!--goToDetail-->
      <div class="bottomLim">
        <span>
          <el-button round @click="goToRead(item.id)">read</el-button>
        </span>
        <el-divider direction="vertical"/>
        <span @click="support(item.id)">
          <el-button round circle>赞</el-button>
           <el-text>
            {{ item.praise }}
          </el-text>
        </span>
        <el-divider direction="vertical"/>
        <span>
          <el-button round>view</el-button>
          <el-text>
            {{ item.view }}
          </el-text>
        </span>
        <el-divider direction="vertical"/>
        <span>
          <el-button round>id</el-button>
           <el-text>
            {{ item.id }}
          </el-text>
        </span>
        <el-divider direction="vertical"/>
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
    item: {}
  },
  data () {
    return {
      oldData: ''
    }
  },

  mounted () {
    // 倍数
    // 妈的不好用,太抖了
    /*const multiple = 5
    document.querySelectorAll(".indexCard").forEach(item => {
      item.addEventListener("mousemove", function (e) {
        let box = item.getBoundingClientRect()
        let calcX = ( e.clientY - box.y - ( box.height / 2 ) ) / multiple * - 1
        let calcY = ( e.clientX - box.x - ( box.width / 2 ) ) / multiple * - 1
        // if (calcY < 30 & calcY > - 30) {
        // }
        item.style.transform = "rotateX(" + calcX + "deg) " + "rotateY(" + calcY + "deg)"
      })
    })*/
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
      // TODO 分页数据更改时数据会更改,再次格式化时间
      this.item.createdAt = timeFormat.timeFormat(newVal.createdAt) || ''
    }
  },
  created () {
    this.DateDiffer(this.item.createdAt)
    // @date 2023/5/5 , @author icestone
    // TODO 第一次创建子组件并接收到值时需要格式化下时间
    this.item.createdAt = timeFormat.timeFormat(this.item.createdAt) || ''
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
  // 炫酷背景!
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
      background: radial-gradient(black 3px, transparent 4px),
      radial-gradient(black 3px, transparent 4px),
      linear-gradient(#fff 4px, transparent 0),
      linear-gradient(45deg, transparent 74px, transparent 75px, #a4a4a4 75px, #a4a4a4 76px, transparent 77px, transparent 109px),
      linear-gradient(-45deg, transparent 75px, transparent 76px, #a4a4a4 76px, #a4a4a4 77px, transparent 78px, transparent 109px),
      #fff;
      background-size: 109px 109px, 109px 109px, 100% 6px, 109px 109px, 109px 109px;
      background-position: 54px 55px, 0px 0px, 0px 0px, 0px 0px, 0px 0px;
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
    background: rgba(255, 255, 255, 0);

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
      background: rgba(255, 255, 255, .7) !important;
    }

    .imgLim {
      width: 100% !important;
      height: 100%;

      img {
        opacity: .5;
      }
    }
  }

  &:hover {
    //transform: scale(1.1, 1.1);

    .inner {
      opacity: 1;
      background-color: silver;
      background-image: radial-gradient(circle at 100% 150%, silver 24%, white 24%, white 28%, silver 28%, silver 36%, white 36%, white 40%, transparent 40%, transparent),
      radial-gradient(circle at 0 150%, silver 24%, white 24%, white 28%, silver 28%, silver 36%, white 36%, white 40%, transparent 40%, transparent),
      radial-gradient(circle at 50% 100%, white 10%, silver 10%, silver 23%, white 23%, white 30%, silver 30%, silver 43%, white 43%, white 50%, silver 50%, silver 63%, white 63%, white 71%, transparent 71%, transparent),
      radial-gradient(circle at 100% 50%, white 5%, silver 5%, silver 15%, white 15%, white 20%, silver 20%, silver 29%, white 29%, white 34%, silver 34%, silver 44%, white 44%, white 49%, transparent 49%, transparent),
      radial-gradient(circle at 0 50%, white 5%, silver 5%, silver 15%, white 15%, white 20%, silver 20%, silver 29%, white 29%, white 34%, silver 34%, silver 44%, white 44%, white 49%, transparent 49%, transparent);
      background-size: 100px 50px !important;
    }

    .card-body {
      background: rgba(255, 255, 255, .7);
    }
  }
}
</style>
