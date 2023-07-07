<template>
  <div class="lim container">
    <ul class="list-group list-group-flush">
      <li class="list-group-item hvr-glow m-t" :key="index" v-for="(item,index) in commendList">
        <span class="m-r">
          <el-tag type="info" class="m-r">createdAt</el-tag>
          <el-text>{{ filter.timeFormat(item.createdAt) }}</el-text>
        </span>
        <span class="m-r">
          <el-tag type="info" class="m-r">文章id</el-tag>
          <el-text>{{ item.from }}</el-text>
        </span>
        <span class="content m-t">
          <el-tag class="m-r">评论内容</el-tag>
          <el-text>{{ item.content }}</el-text>
        </span>
        <span class="detailLim m-t">
        <el-button>
          <el-link :href="'#/read?id='+item.from" target="_blank">read</el-link>
        </el-button>
          <!--<detail :id="item.from" type="blog"></detail>-->
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import http from '@/common/api/request'
import { useStore } from 'vuex'
import { ref } from 'vue'
import router from '@/router'
import timeFormat from "@/common/filter/time"

const store = useStore()
let commendList = ref([])
const { email = null } = store.state.user.userInfo
const initData = () => {
  http.$axios({
    url: '/user/getUserAllPostedComments',
    method: 'POST',
    headers: {
      token: true
    },
    data: {
      email
    }
  })
      .then(res => {
        commendList.value = res.result
      })
      .catch(e => {
        console.log("e:")
        console.log(e)
      })
}

const goToRead = (id) => {
  if (id != - 1) {
    router.push({
      path: '/read',
      query: {
        id
      }
    })
  } else {
    // -1为友链

  }
}
const filter = timeFormat
initData()
</script>

<style scoped lang="less">
.list-group-item {
  border-radius: .3rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  .content {
    display: flex;
    width: 100%;
  }

  .detailLim {
    display: flex;
    width: 100%;
  }
}

.dark {
  .list-group-item {
    background: rgba(255, 255, 255, .3);
  }
}
</style>
