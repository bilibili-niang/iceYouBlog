<template>
  <ice-card :border="false">
    <template v-slot:header>
      <ice-text>
        <ice-tag>title:</ice-tag>
        {{ item.title }}
      </ice-text>
    </template>
    <template v-slot:body>
      <ice-text>
        <ice-tag>description:</ice-tag>
        {{ item.description || "-" }}
      </ice-text>
    </template>
    <template v-slot:bottom>
      <ice-column>
        <v-md-editor :include-level="[3, 4]" v-model="item.content" mode="preview"
                     @copy-code-success="handleCopyCodeSuccess"></v-md-editor>
        <ice-row>
          <ice-button class="m-r m-t" round @click="zoomFun(item.id)">放大看看</ice-button>
          <ice-button class="m-r m-t" round @click="goToRead(item.id)">read</ice-button>
          <markdownTags :tag="item.tag1" :click="true" v-if="item.tag1"></markdownTags>
          <markdownTags :tag="item.tag2" :click="true" v-if="item.tag2"></markdownTags>
          <markdownTags :tag="item.tag3" :click="true" v-if="item.tag3"></markdownTags>
          <ice-text>time:{{ item.createdAt }}</ice-text>
        </ice-row>
      </ice-column>
    </template>
  </ice-card>

</template>

<script>
import MarkdownTags from "@/components/common/MarkdownTags.vue";
import timeFormat from "@/common/filter/time";
import fun from "@/hook/function";

export default {
  name: "IndexCard",
  components: {MarkdownTags},
  props: {
    item: {},
    zoomFun: {type: Function}
  },
  data() {
    return {
      showFlag: false
    };
  },
  methods: {
    handleCopyCodeSuccess() {
      fun.alert("复制成功", "success");
    },
    // 点击后跳转详情
    goToRead(id) {
      this.$router.push({path: "/code/detail", query: {id}});
    },
  },
  watch: {
    item(newVal) {
      this.item.createdAt = timeFormat.timeFormat(newVal.createdAt) || "";
    }
  },
  created() {
    this.item.createdAt = timeFormat.timeFormat(this.item.createdAt) || "";
  }
};
</script>

<!--<script setup>
</script>-->
