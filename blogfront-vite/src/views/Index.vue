<template>
  <!-- content goes here -->
  <div class="btns m-b">
    <el-button type="primary" style="margin-left: 16px" @click="drawer = true">
      关于
    </el-button>
    <el-drawer
        v-model="drawer"
        title="I am the title"
        direction="ttb"
        :with-header="false">
      测试账户:
      admin
      密码:
      admin
      <br>
      关于项目:
      <el-link href="https://github.com/bilibili-niang/iceYouBlog" target="_blank">github地址</el-link>
    </el-drawer>
  </div>
  <div class="index container">
    <div class="left m-r">
      <div class="card hvr-glow border-radius-small" style="width: 100%;" v-for="(item,index) in indexList"
           :key="index">
        <IndexCard :item="item"></IndexCard>
      </div>
      <div class="btns m-b">
        <!--<el-button @click="getDataById()">下一页</el-button>-->
        <el-pagination
            v-model:current-page="currentPage2"
            v-model:page-size="pageSize2"
            :page-sizes="[10, 20, 30, 40]"
            :small="small"
            :disabled="disabled"
            :background="background"
            layout="sizes, prev, pager, next"
            :total="allCount"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <div class="right">
      <AdminCard></AdminCard>
      <Recommend></Recommend>
    </div>

  </div>
</template>

<script>
import http from '@/common/api/request';
import filters from '@/common/filter/time';
import {ElMessage} from 'element-plus';
import MarkdownTags from "@/components/common/MarkdownTags.vue";
import IndexCard from "@/components/index/IndexCard.vue";
import AdminCard from "@/components/index/AdminCard.vue";
import Recommend from "@/components/index/Recommend.vue";

export default {
  name: "Index",
  components: {Recommend, AdminCard, IndexCard, MarkdownTags},
  data() {
    return {
      indexList: [],
      nav_show: '',
      windowHeight: '',
      allCount: '',
      disabled: false,
      small: false,
      background: false,
      pageSize2: 10,
      currentPage2: 1,
      drawer: false
    }
  },
  methods: {
    // @date 2023/5/5 , @author icestone
    // TODO 分页按钮
    handleCurrentChange(val) {
      let id = this.pageSize2 * val;
      if (val == 1) {
        // @date 2023/5/5 , @author icestone
        // TODO 第一页,跳过为0
        id = 0;
      } else {
      }
      // @date 2023/5/5 , @author icestone
      // TODO 请求分页数据
      http.$axios({
        url: '/home/',
        method: 'POST',
        data: {
          id,
          limit: this.pageSize2
        }
      })
          .then(res => {
            if (res.result.length > 0) {
              this.alertMessage(res.message);
              this.indexList = res.result;
            } else {
              this.alertMessage("你到达了未知领域")
              this.indexList = [];
            }
          })
          .catch(e => {
            this.alertMessage(e)
          })
    },
    handleSizeChange(val) {
      // console.log(`${val} items per page`)
    },
    /* @author icestone , 15:41
     * @date 2023/5/5
     * TODO 获取首页所有文章的统计
    */
    initCount() {
      http.$axios({
        url: "/markdownFile/allCounts",
        method: 'GET',
      })
          .then(res => {
            this.allCount = res.result;
            /*this.allCount = (res.result / 20);
            if (parseInt(this.allCount) < this.allCount) {
              this.allCount = parseInt(this.allCount) + 1;
            } else {
              this.allCount = parseInt(this.allCount);
            }
            console.log(`this.allCount:${this.allCount}`)*/
          })
          .catch(e => {
            this.alertMessage(e)
          })
    },
    alertMessage(title, type) {
      ElMessage({
        message: title,
        grouping: true,
        type: 'success',
      })
    },
    timeFormat() {
      this.markdownData.createdAt = filters.timeFormat(this.markdownData.createdAt)
    },
    // 获取首页数据
    initData() {
      http.$axios({
        url: '/home/'
      })
          .then(res => {
            this.alertMessage(res.message);
            this.indexList = res.result.rows || [];
          })
          .catch(e => {
            this.alertMessage(e);
          })
    },
    scrolling() {
      // 滚动条距文档顶部的距离
      let scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
      // 滚动条滚动的距离
      let scrollStep = scrollTop - this.oldScrollTop;
      // console.log("header 滚动距离 ", scrollTop);
      // 更新——滚动前，滚动条距文档顶部的距离
      this.oldScrollTop = scrollTop;

      //变量windowHeight是可视区的高度
      let windowHeight =
          document.documentElement.clientHeight || document.body.clientHeight;
      //变量scrollHeight是滚动条的总高度
      let scrollHeight =
          document.documentElement.scrollHeight || document.body.scrollHeight;

      //滚动条到底部的条件
      if (scrollTop + windowHeight == scrollHeight) {
        //你想做的事情
        // console.log("你已经到底部了");
        // 加载后面的数据
        // this.getDataById();
      }
      if (scrollStep < 0) {
        // console.log("滚动条向上滚动了！");
      } else {
        // console.log("滚动条向下滚动了！");
      }
      // 判断是否到了最顶部
      if (scrollTop <= 0) {
        // console.log("header 到了最顶部")
      }
    },
  },
  created() {
    // 查询分页数据
    this.initData();
    // @date 2023/5/5 , @author icestone
    // TODO 获取首页所有文章 count
    this.initCount();
  },
  mounted() {
    // window.addEventListener('scroll', this.handleScroll)
    window.addEventListener("scroll", this.scrolling);
  },
  // 组件销毁前
  beforeDestroy() {
    // window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener("scroll", this.scrolling);
  },
}
</script>

<style scoped lang="less">
.index {
  display: flex;
  flex-direction: row;
  padding-top: 3rem;
  padding-bottom: 10rem;
  min-height: 90vh;
  justify-content: center;
  flex-wrap: wrap;
  @media (max-width: 1200px) {
    //flex-direction: column;
    flex-direction: column-reverse !important;
    .left {
      width: 100% !important;
    }
  }

  .left {
    padding-left: .3rem;
    display: flex;
    flex-direction: column;
    max-width: 100%;
    width: 75%;
    min-width: 21rem;
  }

  .right {
    flex: 1;
    box-sizing: border-box;
    display: flex;
    height: 100%;
    min-width: 13rem;
    justify-content: center;
    flex-direction: column;
  }
}
</style>