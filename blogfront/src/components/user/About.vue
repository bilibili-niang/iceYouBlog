<template>
  <div class="about container">
    <UserCard :user="user"></UserCard>
    <div class="article" v-if="true">
      <el-switch v-model="value" active-text="list" inactive-text="timeLine"/>
      <div class="card hvr-glow border-radius-small" style="width: 100%;" v-for="(item,index) in markdownFile"
           :key="index" v-if="value">
        <IndexCard :item="item"></IndexCard>
      </div>
      <div class="timeLine" v-if="!value">
        <el-timeline>
          <el-timeline-item center :timestamp="item.createdAt" placement="top" v-for="(item,index) in markdownFile"
                            :key="index">
            <h5>{{ item.title }}</h5>
            <p>{{ item.description }}</p>
            <span class="tags">
                  <markdownTags :tag="item.tag1" :click="true" v-if="item.tag1"></markdownTags>
                  <markdownTags :tag="item.tag2" :click="true" v-if="item.tag2"></markdownTags>
                  <markdownTags :tag="item.tag3" :click="true" v-if="item.tag3"></markdownTags>
              </span>
            <span>
                <el-button round @click="goToRead(item.id)">read</el-button>
              </span>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import userApi from '@/common/api/user'
import { ref } from 'vue'
import UserCard from '@/components/common/UserCard.vue'
import IndexCard from '@/components/index/IndexCard.vue'
import MarkdownTags from '@/components/common/MarkdownTags.vue'

const route = useRoute()
const email = route.query.email || 'admin'
let user = ref({})
let markdownFile = ref({})
const value = ref(true)
const router = useRoute()

const initData = async () => {
  const res = await userApi.getUserInfoByEmail({
    email,
    type: 'all'
  })
  user.value = res.result || null
  const allMarkdown = await userApi.getUserAllMarkdownByEmail({
    email
  })
  markdownFile.value = allMarkdown.result
  console.log(allMarkdown.result)
}
const goToRead = (id) => {
  const routeUrl = router.resolve({
    path: "/read",
    query: { id }
  })
  window.open(routeUrl.href, '_blank')
}

initData()
</script>

<style scoped>

</style>
