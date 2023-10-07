<template>
  <div class="userDetail">
    <ice-button @click="getUserArticle">getUserArticle</ice-button>
    <template v-for="(item,index) in dataList" :key="index">
      <IndexCard :item="item"></IndexCard>
    </template>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import api from '@/common/api'
import IndexCard from "@/components/index/IndexCard.vue";
import {useRoute} from "vue-router";

let dataList = ref()
const route = useRoute()
// console.log('route', route)
// const email = route.query.email;
const getUserArticle = async () => {
  const res = await api.getUserAllArticle({
    email: route.query.email
  })
  console.log('res', res)
  dataList.value = res.result.rows
}
/*setTimeout(() => {
  getUserArticle()
})*/

</script>

<style scoped lang="less">

</style>