<template>
  <view class="search ice-column container">
    <div class="ice-column searchHeader">
      <ice-row>
        <ice-input placeholder="输入搜索~" v-model="keyWord"/>
        <ice-button @click="search">搜索</ice-button>
      </ice-row>
    </div>
    <div class="itemLim" v-if="searchResult.length!==0">
      <div class="item" v-for="(item,index) in searchResult">
        <IndexCard :item="item"></IndexCard>
      </div>
    </div>
    <empty v-else></empty>
  </view>
</template>
<script setup>
import {ref} from "vue";
import api from "@/api";
import {useRouter} from "vue-router";
import IndexCard from "@/components/index/IndexCard.vue";
import empty from "@/components/common/empty.vue";

let keyWord = ref("");
let searchResult = ref([]);
const search = async () => {
  if (keyWord.value === "") {
    return;
  }
  await api.searchByKey({
    key: keyWord.value
  })
      .then(res => {
        if (res.success) {
          searchResult.value = res.result;
        }
      })
      .catch(e => {
        console.log("e:");
        console.log(e);
      });
};

const router = useRouter();
const goToRead = (id) => {
  const routeUrl = router.resolve({
    path: "/read",
    query: {id}
  });
  window.open(routeUrl.href, "_blank");
};
search();

</script>
<style lang="less">

.searchHeader {
  padding-top: @p-normal;
  margin-top: @m-normal;
  margin-bottom: @m-normal;
}


</style>