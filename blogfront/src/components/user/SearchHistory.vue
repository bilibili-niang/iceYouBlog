<template>
  <div class="searchHistory container">
    <div class="btns">
      <el-button v-for="(item,index) in searchList" :key="index" class="hover-around-shadow animation-time"
                 @click="searchTrigger(item.key)">{{ item.key }}
      </el-button>
    </div>
    <el-input v-model="key" placeholder="Please input search key"/>
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

<script>
import http from '@/common/api/request';
import {ElMessage} from 'element-plus';
import {h} from 'vue';

export default {
  name: "SearchHistory",
  data() {
    return {
      searchList: [],
      key: '',
      searchResult: ''
    }
  },
  created() {
    this.initSearchHistory();
  },
  methods: {
    alertMessage(title, sub, color) {
      const useColor = color || 'red';
      ElMessage({
        message: h('p', null, [
          h('span', null, title),
          h('i', {style: `color: ${useColor}`}, sub),
        ]),
      })
    },
    getResultByKey(key) {
      http.$axios({
        url: '/markdownFile/search',
        method: 'POST',
        headers: {
          token: true
        },
        data: {
          key,
        }
      })
          .then(res => {
            if (res.result.length == 0) {
              // 没有搜索结果
              this.alertMessage('没有搜索结果', '换个词搜索试试?', 'rgba(255,0,0,0.5)')
            } else {
              // 有搜索结果
              this.searchResult = res.result;
            }
          })
          .catch(e => {
            console.log('失败:')
            console.log(e)
          })
    },
    searchTrigger(key) {
      console.log('key')
      console.log(key)
      this.key = key;
    },
    initSearchHistory() {
      http.$axios({
        url: '/history/userAllSearchHistory',
        method: 'POST',
        headers: {
          token: true
        }
      })
          .then(res => {
            if (res.result.length > 0) {
              this.searchList = res.result;
            } else {

            }
          })
          .catch(e => {
            console.log('失败')
            console.log(e)
          })

    }
  },
  watch: {
    key(item1, item2) {
      // item1为新值，item2为旧值
      this.getResultByKey(item1)

    }
  }
}
</script>

<style scoped lang="less">
.searchHistory {
  padding-top: 1rem;

  button {
    margin: 0.5rem;
  }

  .el-input {
    margin-top: 1.3rem;
    margin-bottom: 1.3rem;
  }

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
