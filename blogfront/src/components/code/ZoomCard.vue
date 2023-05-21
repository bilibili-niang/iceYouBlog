<template>
  <div class="zoomCard hvr-glow m-t">
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
      <el-button class="m-r" round @click="goToRead(item.id)">read</el-button>
      <markdownTags :tag="item.tag1" :click="true" v-if="item.tag1"></markdownTags>
      <markdownTags :tag="item.tag2" :click="true" v-if="item.tag2"></markdownTags>
      <markdownTags :tag="item.tag3" :click="true" v-if="item.tag3"></markdownTags>
      <span><el-button round>time</el-button> <el-text>{{ item.createdAt }}</el-text></span>
    </div>
  </div>
</template>

<script>
import {ElMessage} from "element-plus";
import {h} from "vue";
import MarkdownTags from "@/components/common/MarkdownTags.vue";

export default {
  name: "ZoomCard",
  components: {MarkdownTags},
  props: {
    item: {},
  },
  methods: {
    handleCopyCodeSuccess() {
      this.alertMessage("复制成功")
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
    // 点击后跳转详情
    goToRead(id) {
      const routeUrl = this.$router.resolve({
        path: "/code/detail",
        query: {id}
      });
      window.open(routeUrl.href, '_blank');
    },

  }

}
</script>

<style scoped lang="less">
.zoomCard {
  padding: .3rem;
  border-radius: .5rem;
  display: flex;
  flex-direction: column;

}
</style>