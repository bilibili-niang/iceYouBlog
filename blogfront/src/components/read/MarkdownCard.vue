<template>
  <div class="lim">
    <ice-card :border="false">
      <template v-slot:header>
        <ice-text size="s">
          {{ item.title }}
        </ice-text>
        <ice-button @click="goToRead(item.id)" size="s">read</ice-button>
      </template>
      <template v-slot:body>
        <ice-text size="s">
            {{ des }}
        </ice-text>
        <ice-text>
          <ice-link v-if="item.tag1" :href="'#/read/readTag?tag1='+item.tag1" size="s">
            {{ item.tag1 }}
          </ice-link>
          <ice-link v-if="item.tag2" :href="'#/read/readTag?tag1='+item.tag2" size="s">
            {{ item.tag2 }}
          </ice-link>
          <ice-link v-if="item.tag3" :href="'#/read/readTag?tag1='+item.tag3" size="s">
            {{ item.tag3 }}
          </ice-link>
        </ice-text>
      </template>
    </ice-card>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router"
import { onMounted, ref } from 'vue'
import fun from '@/hook/function'
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

let des=ref('')
onMounted(()=>{
  des.value=fun.splice(props.item.description)
})

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
