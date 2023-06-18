<template>
  <div class="lim">
    <span>
      <el-tag class="ml-2" type="info">title</el-tag>
      <el-text>{{ item.title }}</el-text>
    </span>
    <span class="des" v-if="item.description">
      <el-text>
        <span class="d-inline-block text-truncate" style="max-width: 220px;"
              :title="item.description">{{ item.description }}</span>
      </el-text>
    </span>
    <span class="tags">
       <markdownTags :tag="item.tag1" v-if="item.tag1" size="small"></markdownTags>
       <markdownTags :tag="item.tag2" v-if="item.tag2" size="small"></markdownTags>
       <markdownTags :tag="item.tag3" v-if="item.tag3" size="small"></markdownTags>
    </span>
    <div class="bottom-btns">
      <el-button size="small" round @click="goToRead(item.id)">read</el-button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router"
import MarkdownTags from '@/components/common/MarkdownTags.vue'

const props = defineProps(['item'])
const router = useRouter()

// 跳转阅读
const goToRead = (id) => {
  router.push({
    path: '/read',
    query: {
      id
    }
  })
}

</script>
<style scoped lang="less">
.lim {
  display: flex;
  flex-direction: column;

  .el-tag {
    border: 0;
    padding: .3rem;
  }

  .tags {
    display: flex;
    flex-direction: row;
  }
}
</style>
