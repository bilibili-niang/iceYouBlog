<template>
  <div class="indexCard">
    <div class="card-body">
      <el-text tag="b" size="large">
        <h5>{{ item.title }}</h5>
      </el-text>
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
            <markdownTags :tag="item.tag1" :click="true" v-if="item.tag1"></markdownTags>
            <markdownTags :tag="item.tag2" :click="true" v-if="item.tag2"></markdownTags>
            <markdownTags :tag="item.tag3" :click="true" v-if="item.tag3"></markdownTags>
          </span>
      </div>
    </div>
  </div>
</template>

<script>
import MarkdownTags from "@/components/common/MarkdownTags.vue";
import timeFormat from "@/common/filter/time";
import http from "@/common/api/request";
import {ElMessage} from "element-plus";
import {h} from "vue";

export default {
  name: "indexCard",
  components: {MarkdownTags},
  props: {
    item: {}
  },
  methods: {
    alertMessage(title, sub, color) {
      const useColor = color || 'red';
      ElMessage({
        message: h('p', null, [
          h('span', null, title),
          h('i', {style: `color: ${useColor}`}, sub),
        ]),
      })
    },
    // 赞
    async support(id) {
      const res = await http.$axios({
        url: '/home/support',
        method: 'POST',
        data: {
          id
        },
        headers: {
          token: true
        }
      });
      this.alertMessage(res.message);
      this.item.praise++;
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
  watch: {
    item(newVal) {
      // @date 2023/5/5 , @author icestone
      // TODO 分页数据更改时数据会更改,再次格式化时间
      this.item.createdAt = timeFormat.timeFormat(newVal.createdAt) || '';
    }
  },
  created() {
    // @date 2023/5/5 , @author icestone
    // TODO 第一次创建子组件并接收到值时需要格式化下时间
    this.item.createdAt = timeFormat.timeFormat(this.item.createdAt) || '';
  }
}
</script>

<style scoped lang="less">
.indexCard {
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