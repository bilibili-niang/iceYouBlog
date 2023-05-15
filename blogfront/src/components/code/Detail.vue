<template>
  <div class="detail container">
    <div class="card-body">
      <el-text tag="b" size="large">{{ codeClipsData.title }}</el-text>
      <el-text>{{ codeClipsData.createdAt }}</el-text>
      <el-text>{{ codeClipsData.description }}</el-text>
      <el-divider content-position="left">
        <el-text>tags</el-text>
      </el-divider>
      <span class="tags">
        <markdownTags :tag="codeClipsData.tag1" :click="true" v-if="codeClipsData.tag1"></markdownTags>
        <markdownTags :tag="codeClipsData.tag2" :click="true" v-if="codeClipsData.tag2"></markdownTags>
        <markdownTags :tag="codeClipsData.tag3" :click="true" v-if="codeClipsData.tag3"></markdownTags>

      </span>
      <el-divider content-position="left">
        <el-text>code</el-text>
      </el-divider>
      <pre>
        <code>
          {{ codeClipsData.content }}
        </code>
      </pre>
    </div>
  </div>
</template>

<script>
import http from '@/common/api/request';
import IndexCard from "@/components/index/IndexCard.vue";
import MarkdownTags from "@/components/common/MarkdownTags.vue";

export default {
  name: "Detail",
  components: {MarkdownTags, IndexCard},
  data() {
    return {
      codeClipsId: '',
      codeClipsData: ''
    }
  },
  methods: {
    initData() {
      console.log('initData')
      this.codeClipsId = this.$route.query.id || '0';
      console.log("this.codeClipsId")
      console.log(this.codeClipsId)
      http.$axios({
        url: '/code/getCodeClipsData',
        method: 'POST',
        headers: {
          token: true
        },
        data: {
          id: this.codeClipsId
        }
      })
          .then(res => {
            console.log(res)
            if (res.success) {
              this.codeClipsData = res.result[0];
            }
          })
          .catch(e => {
            console.log(e);
          })

    }
  },
  created() {
    this.initData();
    // @date 2023/5/5 , @author icestone
    // TODO 第一次创建子组件并接收到值时需要格式化下时间
    // this.codeClipsData.createdAt = timeFormat.timeFormat(this.codeClipsData.createdAt) || '';
  }
}
</script>

<style scoped lang="less">
.card-body {
  padding-top: 0.35rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .bottomLim {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    span {
      display: flex;
      align-items: center;
    }
  }
}
</style>