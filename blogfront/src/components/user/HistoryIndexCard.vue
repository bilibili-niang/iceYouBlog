<template>
  <div class="historyIndexCard">
    <div class="card-body">
      <el-text tag="b">{{ item.title }}</el-text>
      <el-text>{{ item.createdAt }}</el-text>
      <el-text>{{ item.description }}</el-text>
      <!--goToDetail-->
      <div class="bottomLim">
        <span>
          <el-button round @click="goToRead(item.id)">read</el-button>
        </span>
        <el-divider direction="vertical"/>
        <span v-if="item.view">
          <el-button round>view</el-button>
          <el-text>
            {{ item.view }}
          </el-text>
          <el-divider direction="vertical"/>
        </span>
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
  <hr>
</template>

<script>
import MarkdownTags from "@/components/common/MarkdownTags.vue";
import timeFormat from "@/common/filter/time";

export default {
  name: "historyIndexCard",
  components: {MarkdownTags},
  props: {
    item: {}
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
  },
  created() {
    // @date 2023/5/5 , @author icestone
    // 第一次创建子组件并接收到值时需要格式化下时间
    this.item.createdAt = timeFormat.timeFormat(this.item.createdAt) || '';
  },
  watch: {
    item(newVal) {
      this.item.createdAt = timeFormat.timeFormat(newVal.createdAt) || '';
    }
  }
}
</script>

<style scoped lang="less">
.historyIndexCard {
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
}
</style>
