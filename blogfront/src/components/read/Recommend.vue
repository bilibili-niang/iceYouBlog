<template>
  <div class="recommend">
    <ice-text v-if="markdowns.length>0">推荐文章</ice-text>
    <div class="markdown scrollBar" v-if="markdowns">
      <!--推荐-->
      <ice-column>
        <template v-for="(item,index) in markdowns" :key="index">
          <MarkdownCard :item="item"></MarkdownCard>
        </template>
      </ice-column>
    </div>
  </div>
</template>

<script setup>
import {defineEmits, ref, watch} from "vue";
import api from "@/common/api";
import MarkdownCard from "@/components/read/MarkdownCard.vue";

const props = defineProps({
  tags: Object,
  id: String
});
const data = ref({});
const markdowns = ref([]);

const emits = defineEmits(["recommendDataChange"]);

watch(props, (nweProps) => {
  api.getRecommendByTags({tags: nweProps.tags, id: nweProps.id})
      .then(res => {
        markdowns.value = res.result;
        console.log("res.result.length", res.result.length);
        if (res.result.length === 0) {
          emits("recommendDataChange", true);
        }
      })
      .catch(e => {
        console.log("e:");
        console.log(e);
      });
});
</script>

<style scoped lang="less">
.recommend{
  overflow: hidden;
  border-radius: .3rem;

  .markdown{
    display: flex;
    max-height: 70vh;
    overflow-y: auto;
    border-radius: .3rem;
    overflow-x: hidden;


  }
}
</style>
