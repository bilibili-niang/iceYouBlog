<template>
  <div class="readTag container">
    <ice-text content-position="left">关于标签: {{ tag.tag1 }}
      <div v-if="tag.tag2">{{ tag.tag2 }},</div>
      <div v-if="tag.tag3">{{ tag.tag3 }}</div>
      的信息
    </ice-text>

    <!--
       <div class="card-body">
            <ice-text>{{ item.title }}</ice-text>
            <ice-text>{{ item.createdAt }}</ice-text>
            <ice-text>{{ item.description }}</ice-text>
    <div class="bottomLim">
        <span>
          <ice-button round @click="goToRead(item.id)">read</ice-button>
        </span>
      <span>
          <ice-button round>view</ice-button>
          <ice-text>
            {{ item.view }}
          </ice-text>
        </span>
      <span>
          <ice-button round>id</ice-button>
           <ice-text>
            {{ item.id }}
          </ice-text>
        </span>
      <ice-divider direction="vertical"/>
      <span class="tags">
            <markdownTags :tag="item.tag1" :click="false" v-if="item.tag1"></markdownTags>
            <markdownTags :tag="item.tag2" :click="false" v-if="item.tag2"></markdownTags>
            <markdownTags :tag="item.tag3" :click="false" v-if="item.tag3"></markdownTags>
          </span>
    </div>
  </div>
  -->

    <div class="card" style="width: 100%;" v-for="(item,index) in resultData"
         :key="index">
      <IndexCard :item="item"></IndexCard>
    </div>
    <div v-if="aboutMarkdownIsNull">
      <ice-text>没有与之相关的文章</ice-text>
    </div>

  </div>
</template>

<script>
import http from "@/api/request";
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
    };
  },
  methods: {
    // 跳转阅读
    goToRead(id) {
      const routeUrl = this.$router.resolve({
        path: "/read",
        query: {id}
      });
      window.open(routeUrl.href, "_blank");
    },
    alertMessage(title, sub, color) {
      console.log(title, sub, color);
    },
    /* @author icestone , 18:05
     * @date 2023/5/5
     * 初始化获取查询的tag
    */
    initData() {
      const {tag1 = "", tag2 = "", tag3 = ""} = this.$route.query;
      this.tag.tag1 = tag1;
      this.tag.tag2 = tag2;
      this.tag.tag3 = tag3;

      if (this.tag) {
        http.$axios({
          url: "/tag/aboutTag",
          method: "POST",
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
                item.createdAt = timeFormat.timeFormat(item.createdAt) || "";
              });
            })
            .catch(e => {
            });
      } else {
        this.alertMessage("tag不存在");
      }
    }
  }
};
</script>

<style scoped lang="less">
.card-body {
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
