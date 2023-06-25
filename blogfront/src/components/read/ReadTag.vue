<template>
  <div class="readTag container">
    <el-divider content-position="left">关于标签: {{ tag.tag1 }}
      <div v-if="tag.tag2">{{ tag.tag2 }},</div>
      <div v-if="tag.tag3">{{ tag.tag3 }}</div>
      的信息
    </el-divider>
    <div class="card animation-time hover-around-shadow" style="width: 100%;" v-for="(item,index) in resultData"
         :key="index">
      <div class="card-body">
        <el-text tag="b" size="large">{{ item.title }}</el-text>
        <el-text>{{ item.createdAt }}</el-text>
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
            <markdownTags :tag="item.tag1" :click="false" v-if="item.tag1"></markdownTags>
            <markdownTags :tag="item.tag2" :click="false" v-if="item.tag2"></markdownTags>
            <markdownTags :tag="item.tag3" :click="false" v-if="item.tag3"></markdownTags>
          </span>
        </div>
      </div>
    </div>
    <div v-if="aboutMarkdownIsNull">
      <el-text>没有与之相关的文章</el-text>
    </div>

  </div>
</template>

<script>
import http from '@/common/api/request'
import {ElMessage} from "element-plus";
import {h} from "vue";
import IndexCard from "@/components/index/IndexCard.vue";
import MarkdownTags from "@/components/common/MarkdownTags.vue";
import timeFormat from "@/common/filter/time";

export default {
  name: "ReadTag",
  components: {MarkdownTags, IndexCard},
  created() {
    this.initData();
  },
  data() {
    return {
      tag: {
        tag1: null,
        tag2: null,
        tag3: null,
      },
      resultData: "",
      aboutMarkdownIsNull: false,
    }
  },
  methods: {
    // 跳转阅读
    goToRead(id) {
      const routeUrl = this.$router.resolve({
        path: "/read",
        query: {id}
      });
      window.open(routeUrl.href, '_blank');
    },
    alertMessage(title, sub, color) {
      const useColor = color || 'red';
      ElMessage({
        message: h('p', null, [
          h('span', null, title),
          h('i', {style: `color: ${useColor}`}, sub),
        ]),
      })
    },
    /* @author icestone , 18:05
     * @date 2023/5/5
     * 初始化获取查询的tag
    */
    initData() {
      const {tag1 = '', tag2 = '', tag3 = ''} = this.$route.query;
      this.tag.tag1 = tag1;
      this.tag.tag2 = tag2;
      this.tag.tag3 = tag3;

      if (this.tag) {
        http.$axios({
          url: '/tag/aboutTag',
          method: 'POST',
          data: {
            tags: [tag1, tag2, tag3]
          }
        })
            .then(res => {
              this.resultData = res.result;
              if (res.result.length == 0) {
                // 没有文章信息
                this.aboutMarkdownIsNull = true;
              }
              // @date 2023/5/8 , @author icestone
              // 格式化时间
              this.resultData.map(item => {
                item.createdAt = timeFormat.timeFormat(item.createdAt) || '';
              })
            })
            .catch(e => {
            })
      } else {
        this.alertMessage('tag不存在')
      }
    }
  }
}
</script>

<style scoped lang="less">
.card-body {
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
</style>
