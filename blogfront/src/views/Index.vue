<template>
  <div class="index container">
    <div class="left m-r" v-loading="indexList.length == 0">
      <div class="card" style="width: 100%;" v-for="(item, index) in indexList"
           :key="index">
        <IndexCard :item="item"></IndexCard>
      </div>
      <div class="btns m-b" v-if="value">
        <el-pagination v-model:current-page="currentPage2" v-model:page-size="pageSize2" :page-sizes="[10, 20, 30, 40]"
                       :small="small" :disabled="disabled" :background="background" layout="sizes, prev, pager, next"
                       :total="allCount" @current-change="handleCurrentChange"/>
      </div>
    </div>
    <div class="right">
      <AdminCard></AdminCard>
      <Recommend></Recommend>
    </div>
  </div>
</template>

<script setup>
import filters from '@/common/filter/time'
import fun from '@/hook/function'
import IndexCard from "@/components/index/IndexCard.vue"
import AdminCard from "@/components/index/AdminCard.vue"
import Recommend from "@/components/index/Recommend.vue"
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import markdownApi from '@/common/api/markdownFiles'
import api from '@/common/api/index'

let indexList = reactive([])
let allCount = ref(0)
let disabled = ref(false)
let small = ref(false)
let background = ref(false)
let value = ref(true)
let pageSize2 = ref(10)
let currentPage2 = ref(1)

const router = useRouter()
// 跳转阅读
const goToRead = (id) => {
  const routeUrl = router.resolve({
    path: "/read",
    query: { id }
  })
  window.open(routeUrl.href, '_blank')
}

// 分页按钮
const handleCurrentChange = (val) => {
  let id = pageSize2.value * val
  if (val === 1) {
    // @date 2023/5/5 , @author icestone
    // 第一页,跳过为0
    id = 0
  } else {
  }
  // @date 2023/5/5 , @author icestone
  // 请求分页数据
  api.postHomeData({
    id,
    limit: pageSize2.value
  })
      .then(res => {
        if (res.result.length > 0) {
          indexList = res.result
          fun.alert(res.message)
        } else {
          fun.alert("你到达了未知领域")
          indexList = []
        }
      })
      .catch(e => {
        fun.alert(e)
      })
}
/* @author icestone , 15:41
 * @date 2023/5/5
 * 获取首页所有文章的统计
*/

const initCount = async () => {
  const res = await markdownApi.initCount()
  allCount.value = parseInt(res.result)
}

const timeFormat = (data) => {
  return filters.timeFormat(data)
}
const initData = () => {
  api.getHomeData()
      .then(res => {
        fun.alert(res.message, 'success')
        indexList = res.result.rows || []
      })
      .catch(e => {
        fun.alert(e)
      })
}
// 查询分页数据
initData()
// @date 2023/5/5 , @author icestone
// 获取首页所有文章 count
initCount()
</script>

<style scoped lang="less">
.index {
  display: flex;
  flex-direction: row;
  padding-top: 3rem;
  padding-bottom: 10rem;
  min-height: 90vh;
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: 1200px) {
    flex-direction: column-reverse !important;

    .left {
      width: 100% !important;
    }

    .recommend {
      display: none;
    }
  }

  .left {
    min-height: 70vh;
    padding-left: .3rem;
    display: flex;
    flex-direction: column;
    max-width: 100%;
    width: 75%;
    min-width: 21rem;

    .card {
      border-bottom-right-radius: 1.5rem;
      border-top-left-radius: 1.5rem;
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
