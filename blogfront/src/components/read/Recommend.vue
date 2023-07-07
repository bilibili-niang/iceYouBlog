<template>
  <div class="recommend">
    <el-tag class="ml-2 m-b m-l" type="info" v-if="markdowns.length>0">推荐文章</el-tag>
    <div class="markdown" v-if="markdowns">
      <!--推荐-->
      <ul class="list-group list-group-flush p-small">
        <li class="list-group-item hvr-glow p-none m-b" v-for="(item,index) in markdowns" :key="index">
          <MarkdownCard :item="item"></MarkdownCard>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import markdownApi from '@/common/api/markdownFiles'
import MarkdownCard from '@/components/read/MarkdownCard.vue'

const props = defineProps({
  tags: Object,
  id: String
})
const data = ref({})
const markdowns = ref([])

watch(props, (nweProps) => {
  markdownApi.getRecommendByTags({ tags: nweProps.tags, id: nweProps.id })
      .then(res => {
        console.log("res:")
        console.log(res)
        markdowns.value = res.result
      })
      .catch(e => {
        console.log("e:")
        console.log(e)
      })
})
</script>

<style scoped lang="less">
.recommend {
  overflow: hidden;
  border-radius: .3rem;

  .markdown {
    display: flex;
    max-height: 70vh;
    overflow-y: auto;
    border-radius: .3rem;
    overflow-x: hidden;

    &::-webkit-scrollbar {
      width: 5px;
    }

    &::-webkit-scrollbar-track {
      background: #f6f5f5;
      border-radius: 2px;
    }

    &::-webkit-scrollbar-thumb {
      background: rgb(224, 217, 217);
      border-radius: 5px;
    }
  }

  .list-group {
    border-radius: .3rem;

    .list-group-item {
      border-radius: .3rem;
      margin-bottom: .3rem;
      padding: .1rem;
    }
  }
}
</style>
