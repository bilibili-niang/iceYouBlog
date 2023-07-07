<template>
  <div class="lim">
    <div v-if="message" class="detailList">
      <span class="m-b">
        <el-tag type="info" class="m-r">title</el-tag>
        <el-text>
          {{ resData.title }}
        </el-text>
      </span>
      <span class="tags">
        <el-tag type="info">tags</el-tag>
        <markdownTags :tag="resData.tag1" v-if="resData.tag1"></markdownTags>
        <markdownTags :tag="resData.tag2" v-if="resData.tag2"></markdownTags>
        <markdownTags :tag="resData.tag3" v-if="resData.tag3"></markdownTags>
      </span>
      <span class="content">
        <el-collapse v-model="activeNames">
        <el-collapse-item title="查看文章" name="2">
          <v-md-editor
              :include-level="[3,4]"
              v-model="resData.content"
              mode="preview"
          ></v-md-editor>
        </el-collapse-item>
    </el-collapse>
      </span>
    </div>
    <div v-else>
      <el-text>
        文章不存在或无法查看
      </el-text>
    </div>

  </div>
</template>

<script setup>
import http from '@/common/api/request'
import { ref } from 'vue'
import MarkdownTags from '@/components/common/MarkdownTags.vue'

const props = defineProps(['id', 'type'])
let resData = ref('')
let message = ref('')
const initData = async (id) => {
  await http.$axios({
    url: '/markdownFile/getData',
    method: 'POST',
    headers: {
      token: true
    },
    data: {
      id
    }
  })
      .then(res => {
        console.log('请求的数据:')
        console.log(res)
        resData.value = res.result
        message.value = res.success
      })
}
const activeNames = ref(['1'])

initData(props.id)

</script>
<style scoped lang="less">
.lim {
  display: flex;
  width: 100%;

  .detailList {
    display: flex;
    width: 100%;
    flex-direction: column;

    .tags {
      display: flex;
      flex-direction: row;
      margin-left: 0;
      align-items: center;
    }

    .content, .el-collapse {
      display: flex;
      width: 100%;
    }

    .el-collapse-item, .is-active {
      display: flex;
      width: 100%;
      flex-direction: column;
    }
  }
}

</style>
