<template>
  <div class="search">
    <ice-link @click="drawer = true" :disabled="true">搜索</ice-link>
    <br>
    <el-drawer v-model="drawer" direction="ttb" size="70%" title="搜索一下" :with-header="false">
      <div class="searchLim ice-column">
        <ice-input class="input" v-model="key" placeholder="开始搜索!"></ice-input>
        <ice-button @click="getResultByKey">search</ice-button>
      </div>
      <ul class="list-group">
        <li class="list-group-item" v-for="(item,index) in searchResult"
            :key="index">
          <el-divider content-position="left">{{ item.title }}</el-divider>
          <ice-text tag="b" size="small" class="title-left-sm">描述:</ice-text>
          <br>
          <el-text>{{ item.description }}</el-text>
          <br>
          <ice-button round @click="goToRead(item.id)">read</ice-button>
        </li>
      </ul>
    </el-drawer>
  </div>
</template>

<script setup>

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/common/api'

const key = ref('')
const searchResult = ref('')
const getResultByKey = async () => {
  const res = await api.searchByKey({
    key: key.value
  })

  if (res.result.length == 0) {
    // 没有搜索结果
    console.log('没有搜索结果')
  } else {
    // 有搜索结果
    searchResult.value = res.result
  }

}

const router = useRouter()
const goToRead = (id) => {
  const routeUrl = router.resolve({
    path: "/read",
    query: { id }
  })
  window.open(routeUrl.href, '_blank')
}

const drawer = ref(false)


</script>

<style scoped lang="less">
.search {
  position: relative;
  z-index: 5;

  :deep .el-drawer__body {
    padding: 1rem;
  }

  .searchBtn {
    position: absolute;
    top: 0;
    left: 0;
    margin-left: 0.5rem;
  }

  .list-group {
    .list-group-item {
      padding: 0.5rem;
      border-radius: 0.5rem;
      margin-bottom: 1.3rem;
    }
  }
}
</style>
