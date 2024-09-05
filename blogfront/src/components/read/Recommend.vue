<template>
  <div class="recommend">
    <ice-text v-if="markdowns.length > 0">推荐文章</ice-text>
    <div class="markdown scrollBar" v-if="markdowns">
      <!--推荐-->
      <ice-column>
        <template v-for="(item, index) in markdowns" :key="index">
          <MarkdownCard :item="item"></MarkdownCard>
        </template>
      </ice-column>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import api from '@/api'
import MarkdownCard from '@/components/read/MarkdownCard.vue'

const props = defineProps({
  tags: Object,
  id: String
})
const data = ref({})
const markdowns = ref([])

const emits = defineEmits(['recommendDataChange'])

onMounted(() => {
  console.log('props', props)

  console.log('props.id', props.id)

  if (!props || props.id === 1) return void 0
  api
    .getRecommendByTags({ tags: props.tags, id: props.id })
    .then(res => {
      markdowns.value = res.result
      if (res.result.length === 0) {
        emits('recommendDataChange', true)
      }
    })
    .catch(e => {
      console.log('e:')
      console.log(e)
    })
})
</script>

<style scoped lang="less">
.recommend {
  overflow: hidden;

  .markdown {
    display: flex;
    max-height: 70vh;
    overflow-y: auto;
    border-radius: 0.3rem;
    overflow-x: hidden;
  }
}
</style>
