<template>
  <div class="about container">
    <UserCard :user="user"></UserCard>

  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import userApi from '@/common/api/user'
import { ref } from 'vue'
import UserCard from '@/components/common/UserCard.vue'

const route = useRoute()
const email = route.query.email || '0'
let user = ref({})

const initData = async () => {
  const res = await userApi.getUserInfoByEmail({
    email,
    type: 'all'
  })
  user.value = res.result
  console.log(user)
}

initData()
</script>

<style scoped>

</style>
