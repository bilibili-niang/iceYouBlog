<template>
  <div class="lim">
    <ice-card :border="false">
      <template v-slot:header>
        <ice-title size="l">
          {{ item.title }}
        </ice-title>
        <ice-button @click="goToRead(item.id)">read</ice-button>
      </template>
      <template v-slot:body>
        <ice-text size="s">
          <div>
            {{ splitStr(item.description) }}
          </div>
        </ice-text>
        <ice-text>
          <ice-tag v-if="item.tag1">
            {{ item.tag1 }}
          </ice-tag>
          <ice-tag v-if="item.tag2">
            {{ item.tag2 }}
          </ice-tag>
          <ice-tag v-if="item.tag3">
            {{ item.tag3 }}
          </ice-tag>
        </ice-text>
      </template>
    </ice-card>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router"

const props = defineProps(['item'])
const router = useRouter()

// 跳转阅读
const goToRead = (id) => {
  router.push({
    path: '/read',
    query: {
      id
    }
  })
}
/**
 * 切割字符串,保留前面30个字
 */
const splitStr = (str) => {
  console.log(str.length)
  try {

    if (str.length > 30) {
      return str.substring(0, 30) + '...'
    } else {
      return str
    }
  } catch (e) {
    console.log(str)
  }
}

</script>
<style scoped lang="less">
.lim {
  display: flex;
  flex-direction: column;

  .el-tag {
    border: 0;
    padding: .3rem;
  }

  .tags {
    display: flex;
    flex-direction: row;
  }
}
</style>
