<template>
  <div class="index container">
    <div class="right">
      <Recommend></Recommend>
    </div>
    <div class="left m-r ice-row">
      <div class="card" v-for="(item, index) in indexList"
           :key="index">
        <IndexCard :item="item"></IndexCard>
      </div>
      <ice-text v-if="indexList.length===0">
        当前数据为空
      </ice-text>
      <div class="btns m-b" v-if="indexList">
        <ice-pagination v-model="pageSize2" :total="allCount" :step="20"></ice-pagination>
        <br><br><br>
      </div>
    </div>
  </div>
</template>

<script setup>
import filters from "@/common/filter/time";
import {fun} from "@/hook/function";
import {ref, watch} from "vue";
import {useRouter} from "vue-router";
import markdownApi from "@/api/markdownFiles";
import api from "@/api";
import IndexCard from "@/components/index/IndexCard.vue";
import Recommend from "@/components/index/Recommend.vue";

let indexList = ref([]);
let allCount = ref(0);
let pageSize2 = ref(0);
const router = useRouter();
// 跳转阅读
const goToRead = (id) => {
  const routeUrl = router.resolve({
    path: "/read",
    query: {id}
  });
  window.open(routeUrl.href, "_blank");
};

// 分页按钮
const handleCurrentChange = (val) => {
  let id = pageSize2.value * val;
  if (val === 1) {
    // @date 2023/5/5 , @author icestone
    // 第一页,跳过为0
    id = 0;
  } else {
  }
  // @date 2023/5/5 , @author icestone
  // 请求分页数据
  api.postHomeData({
    id,
    limit: 20
  })
      .then(res => {
        if (res.result.length > 0) {
          indexList.value = res.result;
          fun.alert(res.message);
        } else {
          fun.alert("你到达了未知领域");
          indexList.value = [];
        }
      })
      .catch(e => {
        fun.alert(e);
      });
};
/*
 * 获取首页所有文章的统计
*/

const initCount = async () => {
  const res = await markdownApi.initCount();
  allCount.value = parseInt(res.result / 20) + 1;
};

const timeFormat = (data) => {
  return filters.timeFormat(data);
};
const initData = async (val = 1) => {
  let id = pageSize2.value * val;
  await api.postHomeData({
    id,
    limit: 20
  })
      .then(res => {
        if (res.result.length > 0) {
          indexList.value = res.result;
          fun.alert(res.message);
        } else {
          fun.alert("前方是未知领域");
          // indexList.value = [];
        }
      })
      .catch(e => {
        fun.alert(e);
      });
};
// 查询分页数据
initData();
// 获取首页所有文章 count
initCount();
watch(indexList, (newVal, oldVal) => {
  if (!newVal) {
    initData();
  }
});
watch(pageSize2, (newVal) => {
  if (newVal) {
    initData(20);
  }
});


</script>

<style scoped lang="less">
.index {
  display: flex;
  flex-direction: column;
  min-height: 90vh;
  justify-content: center;
  margin: 0 auto;
  flex-wrap: wrap;

  // 小屏
  @media (max-width: 1200px) {
    .left {
      overflow: hidden;
      margin: 0 !important;

      .indexCard {
        max-width: 100% !important;
        box-sizing: border-box;

        /deep/ .ice-card, .ice-row {
          margin: 0;
          padding: 0;
        }
      }
    }

    .right {
      display: none !important;
    }

    .recommend {
      display: none;
    }
  }
  @media (min-width: 1200px) {

  }

  .left {
    min-height: 70vh;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    max-width: 100%;
    width: 100%;
    justify-content: space-between;
    box-sizing: border-box;

    .card {
      width: 100%;
    }
  }

  .right {
    flex: 1;
    box-sizing: border-box;
    display: flex;
    height: 100%;
    min-width: 13rem;
    justify-content: center;
    flex-direction: column;
  }
}
</style>
