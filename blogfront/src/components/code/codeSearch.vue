<template>
  <div class="codeSearch">
    <el-input v-model="key" placeholder="Please input"/>
    <el-divider content-position="left" v-if="searchResult.length">搜索结果</el-divider>
    <ul class="list-group list-group-flush">
      <li class="list-group-item hover-around-shadow animation-time" v-for="(item,index) in searchResult"
          :key="index">
        <el-divider content-position="left">{{ item.title }}</el-divider>
        <el-text tag="b" size="small" class="title-left-sm">描述:</el-text>
        <br>
        <el-text>{{ item.description }}</el-text>
        <br>
        <el-button round @click="goToRead(item.id)">read</el-button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { h, ref, watch } from 'vue'
import http from '@/common/api/request'
import { ElMessage } from 'element-plus'

const key = ref('')
const searchResult = ref('')
watch(key, (newVal, oldVal) => {
  console.log(newVal)
  if (newVal.length == 0) {
    searchResult.value = null
  } else {
    http.$axios({
      url: '/code/search',
      method: 'POST',
      headers: {
        token: true
      },
      data: {
        key: newVal
      }
    })
        .then(res => {
          if (res.result.length == 0) {
            // 没有搜索结果
            ElMessage({
              message: h('p', null, [
                h('span', null, '没有搜索结果'),
                h('i', { style: `color: rgba(255,0,0,0.5)` }, '换个词搜索试试'),
              ]),
            })
          } else {
            // 有搜索结果
            searchResult.value = res.result
          }
        })
        .catch(e => {
          console.log('失败:')
          console.log(e)
        })
  }
})
const goToRead = (id) => {
/*  const routeUrl = $router.resolve({
    path: "/read",
    query: { id }
  })
  window.open(routeUrl.href, '_blank')*/
}
</script>

<style scoped>

</style>
