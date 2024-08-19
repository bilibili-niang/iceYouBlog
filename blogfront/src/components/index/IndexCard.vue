<template>
  <div class="indexCard" :ref="randomRef">
    <ice-card :border="false">
      <template v-slot:header>
        <ice-title>
          {{ item.title }}
        </ice-title>
        <ice-button @click="goToRead(item.id)">read</ice-button>
      </template>
      <template v-slot:body>
        <div class="ice-column">
          <ice-text>
            <div v-if="item.description" class="ice-column">
              <ice-tag>描述</ice-tag>
              <code>
                {{ item.description }}
              </code>
            </div>
          </ice-text>
          <ice-text v-if="item.view">
            <ice-tag>浏览量</ice-tag>
            {{ item.view }}
          </ice-text>
          <ice-text>
            <ice-tag>更新时间</ice-tag>
            {{ item.updatedAt }} - 最后修改于{{ oldData }}天
          </ice-text>
          <ice-text>
            <ice-link :tag="item.tag1" v-if="item.tag1" :href="'#/read/readTag?tag1='+item.tag1">
              {{ item.tag1 }}
            </ice-link>
            <ice-link :tag="item.tag2" v-if="item.tag2" :href="'#/read/readTag?tag1='+item.tag2">
              {{ item.tag2 }}
            </ice-link>
            <ice-link :tag="item.tag3" v-if="item.tag3" :href="'#/read/readTag?tag1='+item.tag3">
              {{ item.tag3 }}
            </ice-link>
          </ice-text>
        </div>
      </template>
    </ice-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import timeFormat from '@/common/filter/time'
import { useRouter } from 'vue-router'

const props = defineProps({
  item: {},
  selectOperate: {
    type: String
  },
  showOperate: {
    type: Boolean,
    default: false
  }
})

const oldData = ref('')

const randomRef = Math.random() * 1000

const DateDiffer = (Date_end) => {
  //date1结束时间
  let date1 = new Date(Date_end)
  //date2当前时间
  let date2 = new Date()
  date1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate())
  date2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate())
  const diff = date1.getTime() - date2.getTime() //目标时间减去当前时间
  //计算当前时间与结束时间之间相差天数
  oldData.value = diff / (24 * 60 * 60 * 1000)
}


const router = useRouter()
// 跳转阅读
const goToRead = (id) => {
  console.log('id', id)
  router.push({
    name: 'markDownRead',
    query: {
      id
    }
  })
}
const init = () => {
  DateDiffer(props.item.updatedAt)
  // 第一次创建子组件并接收到值时需要格式化下时间
  props.item.updatedAt = timeFormat.timeFormat(props.item.updatedAt) || ''
}
init()
</script>

<style scoped lang="less">
.indexCard {
  width: 100%;
  box-sizing: border-box;
}

.indexCard {
  overflow: hidden;
  background: @bac-dark-bleak;
  margin-bottom: @m-normal;
  border-radius: @radio-n;
}

// 小屏
@media (max-width: 1200px) {
  .indexCard {
    max-width: 100%;
  }
}

@media (min-width: 1200px) {
  .indexCard {
  }
}

</style>
