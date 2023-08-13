<template>
  <div class="index">
    <ice-button @click="init">按钮</ice-button>
    <div class="list">
      <div class="list-item" v-for="(item,index) in listData" :key="index">
        <ice-card>
          <template v-slot:header>
            <ice-title>
              {{ item.title }}
            </ice-title>
          </template>
          <template v-slot:body>
            <ice-text>
              <ice-tag>description</ice-tag>
              {{ item.description }}
            </ice-text>
          </template>
        </ice-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import api from '@/api'

let listData = reactive({})
const init = async () => {
  const res = await api.getHomeData()
  listData = res.result.rows
}

init()

</script>

<style scoped lang="less">


</style>
