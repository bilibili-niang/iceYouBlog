// 阅读文字
<template>
  <iceColumn class="read container">
    <ice-text v-if="!dataExist"> 文章不存在或已被删除</ice-text>
    <!--文章存在-->
    <ice-column v-if="dataExist">
      <ice-column width="100%">
        <IndexCard
          :showEditBtn="showEditBtn"
          :title="markdownData?.title || 'title'"
          :markdownData="markdownData"
          :userInf="userInf"
        >
          <ice-text>当前字数:{{ wordCount }}</ice-text>
        </IndexCard>

        <MdRender :content="markdownData.content" mode="preview" v-if="markdownData.content" />

        <ice-row class="m-t-l">
          <ice-row class="align-items-center" width="fit-content">
            <ice-input
              v-model="commentUser.name"
              :disabled="commentUser.name"
              placeholder="Please input name"
              v-if="!userInf?.email"
            />
            <ice-input v-model="userInf.username" placeholder="名字" disabled v-else />
          </ice-row>
          <ice-row class="align-items-center" width="fit-content">
            <ice-input v-model="commentUser.url" placeholder="你的url" />
          </ice-row>
        </ice-row>

        <Comment
          @refreshComments="refresh"
          :user="commentUser"
          :id="markdownData.id"
          :title="markdownData.title"
          type="blog"
        ></Comment>
        <ice-text>评论区</ice-text>
        <CommentArea :id="markdownData.id" :refresh="refreshFlag" v-if="markdownData.id" />
      </ice-column>
      <ice-column width="100%" v-if="!hideRecommend">
        <!--推荐-->
        <Recommend
          v-if="dataExist && markdownData.tag1"
          :id="id"
          :tags="[markdownData.tag1, markdownData.tag2, markdownData.tag3]"
          @recommendDataChange="dataChangeHandler"
        />
      </ice-column>
    </ice-column>
  </iceColumn>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import api from '../../api'
import { alert } from '@/hook/function'
import filters from '@/common/filter/time'
import IndexCard from '@/components/read/IndexCard/index.vue'
import Comment from '@/components/read/Comment/index.vue'
import MdRender from '@/components/MdRener/index.vue'
import CommentArea from '@/components/read/CommentArea/index.vue'
import { useStore } from 'vuex'

const store = useStore()

console.log('store')
console.log(store.state)

interface markdownDataType {
  url: object
  email: string
  id: number
  title: string
  createdAt: string
  description: string
  tag1: string
  tag2: string
  tag3: string
  view: string
  content: string
  headImg: string
  updatedAt: string
}

const markdownData = ref<Partial<markdownDataType>>({})
const userInf = ref({
  username: '',
  email: ''
})
const dataExist = ref(true)
const article = ref('')
const showEditBtn = ref(false)
const id = ref<string | number>('')
const commentUser = ref({
  name: '',
  url: ''
})
const refreshFlag = ref(true)
const wordCount = ref('')
const hideRecommend = ref(false)
const route = useRoute()

const timeFormat = () => {
  markdownData.value.createdAt = filters.timeFormat(markdownData.value.createdAt)
}

const init = () => {
  id.value = route.query?.id
  if (!id.value) {
    return void 0
  }
  api.getMarkdown({ id: id.value }).then(res => {
    if (res.success) {
      dataExist.value = true
      const flag = JSON.stringify(res.result).length < 3 ? false : true

      if (flag) {
        // 即将渲染的文章数据
        markdownData.value = res.result

        timeFormat()
        const content = res.result.content || 'null'
        if (content.length > 10) {
          // 文章数据存在时渲染
          article.value = res.result.content
        }
        userInf.value = res.userInf
        timeFormat()
        alert('load success')
        showEdit()
      } else {
        // 失败
        dataExist.value = false
        alert('加载不出来了', '文章不存在或需要从原来的博客网站爬取,可以试试刷新')
      }
    }
  })
}

const handleCopyCodeSuccess = code => {
  alert('复制成功')
}
const dataChangeHandler = flag => {
  hideRecommend.value = flag
}

function refresh(val) {
  // 评论发表成功
  if (val) {
    refreshFlag.value = !refreshFlag.value
  }
}

function showEdit() {
  const email = JSON.parse(localStorage.getItem('userInfo')) || ''
  if (!Boolean(email)) {
    // 没有email时
  } else {
    if (email.email == userInf.value?.email) {
      showEditBtn.value = true
    }
  }
}

onMounted(() => init())
</script>
<style lang="less" scoped>
@import './index';

.tab-item {
  width: 100%;
}
</style>
