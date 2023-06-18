<template>
  <div class="topArticle">
    <div class="card hvr-glow border-radius-small" style="width: 100%;" v-for="(item,index) in indexList.data"
         :key="index">
      <IndexCard :item="item"></IndexCard>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { reactive } from 'vue'
import markdownApi from '@/common/api/markdownFiles'
import IndexCard from "@/components/index/IndexCard.vue"

const store = useStore()
let userInfo = reactive({})
let indexList = reactive({
  data: {}
})

const initData = async () => {
  userInfo = store.state.user.userInfo
  const email = userInfo.email || null
  if (email) {
    const res = await markdownApi.getTopArticle({ email })
    console.log("res:")
    console.log(res)
    indexList.data = res.result
  }
}

initData()

</script>

<style scoped>

</style>
