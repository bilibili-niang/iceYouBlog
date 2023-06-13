<template>
  <li class="indexCard list-group-item  hvr-glow">
    <el-divider content-position="left">id:{{ item.id }}</el-divider>
    <el-row>
      <el-tag class="ml-2" type="info">title</el-tag>
      <el-text>{{ item.title }}</el-text>
    </el-row>
    <el-row>
      <el-tag class="ml-2" type="info">description</el-tag>
      <el-text>{{ item.description }}</el-text>
    </el-row>

    <div class="text">
      <v-md-editor
          :include-level="[3,4]"
          v-model="item.content"
          mode="preview"
          @copy-code-success="handleCopyCodeSuccess"
      ></v-md-editor>
    </div>
    <div class="tags">
      <el-button class="m-r m-t" round @click="zoomFun(item.id)">放大看看</el-button>
      <el-button class="m-r m-t" round @click="goToRead(item.id)">read</el-button>
      <markdownTags :tag="item.tag1" :click="true" v-if="item.tag1"></markdownTags>
      <markdownTags :tag="item.tag2" :click="true" v-if="item.tag2"></markdownTags>
      <markdownTags :tag="item.tag3" :click="true" v-if="item.tag3"></markdownTags>
      <span class="m-t"><el-button round>time</el-button> <el-text>{{ item.createdAt }}</el-text></span>
    </div>
  </li>
</template>

<script>
import MarkdownTags from "@/components/common/MarkdownTags.vue"
import timeFormat from "@/common/filter/time"
import { ElMessage } from "element-plus"
import { h } from "vue"

export default {
  name: "IndexCard",
  components: { MarkdownTags },
  props: {
    item: {},
    zoomFun: { type: Function }
  },
  methods: {
    handleCopyCodeSuccess () {
      this.alertMessage("复制成功")
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
    // 点击后跳转详情
    goToRead (id) {
      const routeUrl = this.$router.resolve({
        path: "/code/detail",
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
    // @date 2023/5/5 , @author icestone
    // TODO 第一次创建子组件并接收到值时需要格式化下时间
    this.item.createdAt = timeFormat.timeFormat(this.item.createdAt) || ''
  }
}
</script>

<style scoped lang="less">
.list-group-item {
  padding: .3rem;
  margin-bottom: .3rem;

  div.el-row {
    margin-bottom: .3rem;
  }

  .tags {
    flex-wrap: wrap;
  }
}
</style>
