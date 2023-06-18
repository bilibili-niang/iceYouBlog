<template>
  <div class="about container">
    <UserCard :user="user"></UserCard>
    <div class="article" v-if="true">
      <div class="card hvr-glow border-radius-small" style="width: 100%;" v-for="(item,index) in markdownFile"
           :key="index">
        <IndexCard :item="item"></IndexCard>
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
