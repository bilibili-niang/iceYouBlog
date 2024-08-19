<template>
  <div class="searchHistory container">
    <div class="ice-row">
      <ice-button v-for="(item,index) in searchList" :key="index" @click="searchTrigger(item.key)">{{ item.key }}
      </ice-button>
      <ice-text>当前有{{ searchList.length }}条记录</ice-text>
    </div>
    <ice-row>
      <ice-input v-model="key" placeholder="Please input search key"/>
      <ice-button @click="getResultByKey">search</ice-button>
    </ice-row>
    <ul class="list-group list-group-flush">
      <div class="ice-column" v-for="(item,index) in searchResult"
           :key="index">
        <indexCard :item="item"></indexCard>
      </div>
      <empty v-if="searchResult.length===0"></empty>
    </ul>
  </div>
</template>

<script setup>
import {ref,} from "vue";
import http from "@/api/request";
import IndexCard from "@/components/index/IndexCard.vue";
import store from "@/store";
import api from "@/api";
import Empty from "@/components/common/empty.vue";

let searchList = ref([]);
let key = ref("");
let searchResult = ref("");
const alertMessage = (title, sub, color) => {
  console.log(title, sub, color);
};

const getResultByKey = () => {
  http.$axios({
    url: "/markdownFile/search",
    method: "POST",
    headers: {
      token: true
    },
    data: {
      key: key.value,
    }
  })
      .then(res => {
        if (res.result.length == 0) {
          // 没有搜索结果
          alertMessage("没有搜索结果", "换个词搜索试试?", "rgba(255,0,0,0.5)");
        } else {
          // 有搜索结果
          searchResult.value = res.result;
        }
      })
      .catch(e => {
        console.log("失败:");
        console.log(e);
      });
};

const searchTrigger = (keyWord) => {
  key.value = keyWord;
  getResultByKey();
};

const initSearchHistory = async () => {
  if (!store.state.user.loginStatus) {
    return false;
  }
  await api.getHistory()
      .then(res => {
        if (res.result.length > 0) {
          searchList.value = res.result;
        } else {
        }
      })
      .catch(e => {
        console.log("失败");
        console.log(e);
      });

};
console.log(store.state.user);
initSearchHistory();

</script>
<style scoped lang="less">
.searchHistory {
  padding-top: 1rem;

  .ice-row {
    flex-wrap: wrap;
  }
}
</style>
