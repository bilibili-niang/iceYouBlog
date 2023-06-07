<template>
  <div class="lim">
    <div class="card hvr-glow">
      <Avatar :imgUrl="user.avatar" allowClick=false></Avatar>
      <div class="card-body">
        <div>
          <el-tag class="ml-2" type="user">username</el-tag>
          <el-text class="mx-1">{{ user.username }}</el-text>
        </div>
        <div>
          <el-tag class="ml-2" type="user">email</el-tag>
          <el-text class="mx-1">{{ user.email }}</el-text>
        </div>
        <div>
          <el-tag class="ml-2" type="user">word</el-tag>
          <el-text class="mx-1">{{ user.word }}</el-text>
        </div>
        <div>
          <el-tag class="ml-2" type="user">githubUrl</el-tag>
          <el-text class="mx-1">{{ user.githubUrl }}</el-text>
        </div>
        <div>
          <el-tag class="ml-2" type="user">occupation</el-tag>
          <el-text class="mx-1">{{ user.occupation }}</el-text>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Avatar from '@/components/common/Avatar.vue'

const props = defineProps({
  user: {
    type: Object,
    required: true
  },
  allowClick: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>

</style>
