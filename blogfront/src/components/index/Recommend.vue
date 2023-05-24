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
        <img :src="item.headImg" class="imageCover">
        <div>
          <el-tag class="ml-2" type="info">id</el-tag>
          <el-text class="mx-1">{{ item.id }}</el-text>
        </div>
        <div>
          <el-tag class="ml-2" type="info">title</el-tag>
          <el-text class="mx-1">{{ item.title }}</el-text>
        </div>
        <div>
          <el-tag class="ml-2" type="info">description</el-tag>
          <el-text class="mx-1">
            <div class="descriptions" :title="item.description">{{ item.description }}</div>
          </el-text>
        </div>
        <div class="btns">
          <el-button round @click="goToRead(item.id)" class="m-r">read</el-button>
          <span class="tags" v-if="item.recommendLevel">
        <el-tag class="ml-2" type="info">recommendLevel</el-tag>
        <el-tag class="ml-2" type="info" v-if="item.recommendLevel">{{ item.recommendLevel }}</el-tag>
        </span>
        </div>
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
import http from '@/common/api/request'
import MarkdownTags from "@/components/common/MarkdownTags.vue";

export default {
  name: "Recommend",
  components: {MarkdownTags},
  data() {
    return {
      markdownList: ''
    }
  },
  methods: {
    getRecommendData() {
      http.$axios({
        url: '/markdownFile/getRecommend',
        method: 'GET',
      })
          .then(res => {
            console.log("res:")
            console.log(res)
            this.markdownList = res.result;
          })
          .catch(e => {
            console.log("e:")
            console.log(e)
          })
    },
    goToRead(id) {
      const routeUrl = this.$router.resolve({
        path: "/read",
        query: {id}
      });
      window.open(routeUrl.href, '_blank');
    },
  },
  created() {
    this.getRecommendData();
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

      .btns {
        flex-direction: row;
        display: flex;
      }

      .descriptions {
        //整体超出部分隐藏
        overflow: hidden;
        //文本超出部分以...形式展示，同第一行样式代码
        text-overflow: ellipsis;
        //display 块级元素展示
        display: -webkit-box;
        //设置文本行数为2行
        -webkit-line-clamp: 2;
        //设置文本行数为2行
        line-clamp: 2;
        //从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式）
        -webkit-box-orient: vertical;

      }


      &:hover {
        .imageCover {
          filter: blur(1.5rem);
          opacity: .8;
        }

        span.el-text {
          color: #ffffff;
        }
      }

      .imageCover {
        transition: all .2s;
        transform-style: preserve-3d;
        position: absolute;
        z-index: -1;
        display: flex;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        opacity: 0;
      }
    }
  }
}
</style>