<template>
  <div class="recommend">
    <!--推荐-->
    推荐~~~~~~~~~~~~~~~data:
    <br>
    {{ data }}
    <br>
    {{ tags }}
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  tags: Object,
})
console.log("props:")
console.log(props)

const data = ref({})
/* @author icestone , 11:38
 * @date 2023/5/31
 * TODO 获取与此tag相关的文章
*/
const initData = () => {
  watch(tags, (newVal, oldVal) => {
    console.log(newVal)
  })
  /*  api.getRecommendByTags({ tag1: tag1._key, tag2: tag2._key, tag3: tag3._key })
      .then(res => {
        console.log("res:")
        console.log(res)
      })
      .catch(e => {
        console.log("e:")
        console.log(e)
      })*/
}

initData()

</script>

<style scoped lang="less">
.recommend {

}
</style>
