<template>
  <div class="markdownTags">
    <ice-link :href="href" target="_blank" :underline="false" v-if="click">
      <ice-tag :size="size">{{ tag }}</ice-tag>
    </ice-link>
    <ice-tag v-if="!click">{{ tag }}</ice-tag>
  </div>
</template>

<script>
export default {
  name: "markdownTags",
  props: {
    tag: "",
    click: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: "normal"
    }
  },
  data() {
    return {
      href: "",
    };
  },
  created() {
    // 允许点击
    this.href = "#/read/readTag?tag1=" + this.tag;
  }
};
</script>
