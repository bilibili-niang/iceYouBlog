<template>
  <div class="markdownTags">
    <el-link :href="href" target="_blank" :underline="false" v-if="click">
      <el-tag>{{ tag }}</el-tag>
    </el-link>
    <el-tag v-if="!click">{{ tag }}</el-tag>
  </div>
</template>

<script>
export default {
  name: "markdownTags",
  props: {
    tag: '',
    click: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      href: '',
    }
  },
  created() {
    // 允许点击
    this.href = '#/read/readTag?tag1=' + this.tag;
  }
}
</script>
