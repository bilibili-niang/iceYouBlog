<!--user页面下的所有文章的选项卡-->
<template>
  <div class="indexCard">
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
        <span v-if="item.recommendLevel">
          <el-button round>recommendLevel</el-button>
           <el-text>
            {{ item.recommendLevel }}
          </el-text>
        </span>
        <el-divider direction="vertical"/>
        <span class="tags">
            <markdownTags :tag="item.tag1" :click="true" v-if="item.tag1"></markdownTags>
            <markdownTags :tag="item.tag2" :click="true" v-if="item.tag2"></markdownTags>
            <markdownTags :tag="item.tag3" :click="true" v-if="item.tag3"></markdownTags>
            <el-button v-if="!item.tag1||!item.tag2||!item.tag3" @click="addTag(item.id)"><el-icon><Plus/></el-icon></el-button>
          </span>
      </div>
    </div>

  </div>
</template>

<script>
import MarkdownTags from "@/components/common/MarkdownTags.vue";
import timeFormat from "@/common/filter/time";

export default {
  name: "indexCard",
  components: {MarkdownTags},
  props: {
    item: {}
  },
  data() {
    return {
      tags: {
        flag: true,
        tag1: '',
        tag2: '',
        tag3: '',
        title: this.item.title,
        id: this.item.id,
      }
    }
  },
  methods: {
    /* @author icestone , 2:09
     * @date 2023/5/7
     * 添加tag
    */
    addTag(id) {
      this.$emit('showAlert', this.tags);
    },
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
      // @date 2023/5/8 , @author icestone
      // 父组件重新获取数据时,再次格式化时间
      this.item.createdAt = timeFormat.timeFormat(newVal.createdAt) || '';
    }
  }
}
</script>

<style scoped lang="less">
.indexCard {
  .card-body {
    padding: .3rem;
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
