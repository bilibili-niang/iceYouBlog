<template>
  <div class="indexCard">
    <ice-column>
      <ice-column>
        <ice-row clss="flex-align-center">
          <Avatar :imgUrl="userInf?.avatar" v-if="userInf?.avatar" :email="userInf.email"></Avatar>
          <ice-column>
            <ice-row>
              <ice-text>发布者:</ice-text>
              <ice-text>{{ userInf?.username }}</ice-text>
            </ice-row>
            <ice-row>
              <ice-text>邮箱:</ice-text>
              <ice-text>{{ userInf?.email }}</ice-text>
            </ice-row>
          </ice-column>
        </ice-row>
        <div class="ice-row" v-if="showEditBtn">
          <ice-button @click="gotoEditExperiment(markdownData.id)">前往编辑</ice-button>
        </div>
      </ice-column>

      <ice-column>
        <ice-title size="l"
          ><h1>{{ markdownData.title }}</h1></ice-title
        >
        <ice-row>
          <ice-text>发布时间:</ice-text>
          <ice-text>{{ markdownData.createdAt }}</ice-text>
        </ice-row>
        <ice-row>
          <ice-text>浏览量:</ice-text>
          <ice-text>{{ markdownData.view }}</ice-text>
        </ice-row>
        <ice-row>
          <slot></slot>
        </ice-row>

        <div class="ice-row" v-if="markdownData.description">
          <el-tag class="ml-2" type="info">description</el-tag>
          <ice-text>{{ markdownData.description }}</ice-text>
        </div>
        <ice-row v-if="markdownData.tag1 || markdownData.tag2 || markdownData.tag3">
          <ice-button>tags</ice-button>
          <ice-link :tag="markdownData.tag1" v-if="markdownData.tag1" :href="'#read/readTag?tag1=' + markdownData.tag1">
            {{ markdownData.tag1 }}
          </ice-link>

          <ice-link :tag="markdownData.tag2" v-if="markdownData.tag2" :href="'#read/readTag?tag1=' + markdownData.tag2">
            {{ markdownData.tag2 }}
          </ice-link>
          <ice-link :tag="markdownData.tag3" v-if="markdownData.tag3" :href="'#read/readTag?tag1=' + markdownData.tag3">
            {{ markdownData.tag3 }}
          </ice-link>
        </ice-row>
      </ice-column>
    </ice-column>
  </div>
</template>

<script setup lang="ts">
import Avatar from '@/components/common/Avatar.vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  markdownData: Object,
  showEditBtn: Boolean,
  userInf: {
    type: Object,
    default: () => ({})
  }
})

const router = useRouter()

const gotoEditExperiment = (id: string) => {
  router.push({
    path: '/edit/vMdEditor',
    query: { id }
  })
}
</script>
<style scoped lang="less">
@media (min-width: 1200px) {
  .userInfoDetail {
    display: flex;
    flex-direction: row;
  }
}

@media (max-width: 1200px) {
  .userInfoDetail {
    display: flex;
    flex-direction: column;
  }
}
</style>
