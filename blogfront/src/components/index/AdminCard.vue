<template>
  <div class="adminCard" v-if="info">
    <div class="card hvr-glow" style="width: 100%;">
      <img :src="info.avatar">
      <div class="lim">
        <Avatar :imgUrl="info.avatar" :email="info.email" allowClick="true"></Avatar>
      </div>
      <div class="card-body">
        <div>
          <el-tag class="ml-2" type="info">username</el-tag>
          <el-text class="mx-1">{{ info.username }}</el-text>
        </div>
        <div>
          <el-tag class="ml-2" type="info">email</el-tag>
          <el-text class="mx-1">{{ info.email }}</el-text>
        </div>
        <div>
          <el-tag class="ml-2" type="info">word</el-tag>
          <el-text class="mx-1">{{ info.word }}</el-text>
        </div>
        <div>
          <el-tag class="ml-2" type="info">浏览量</el-tag>
          <el-text class="mx-1">{{ view }}</el-text>
        </div>
        <div>
          <el-text>
            githubUrl
          </el-text>
          <a :href="info.githubUrl" target="_blank">
            <el-text>
              去看看
            </el-text>
          </a>
        </div>
        <div>
          <el-tag class="ml-2" type="info">occupation</el-tag>
          <el-text class="mx-1">{{ info.occupation }}</el-text>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Avatar from "@/components/common/Avatar.vue"
import { reactive, ref } from 'vue'
import api from '@/common/api'

let info = reactive({})

let view = ref('')
const getAdminInfo = async () => {
  const res = await api.getAdminInfo()
  info = res.result
  const views = await api.getAllViews()
  view.value = views.result
}

getAdminInfo()

</script>

<style scoped lang="less">
.card {
  position: relative;
  overflow: hidden;
  width: 100%;
  margin-bottom: .3rem;

  .card-body {
    padding: .3rem;
  }

  span.el-text {
    transition: .2s;
  }

  img {
    position: absolute;
    display: flex;
    width: 100%;
    height: 100%;
    background-size: contain;
    opacity: 0;
    transition: .2s;
    z-index: -1;
  }

  &:hover {
    img {
      opacity: .8;
      filter: blur(1.5rem);
    }

    span.el-text {
      color: #ffffff;
    }
  }
}
</style>
