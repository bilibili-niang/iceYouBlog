<template>
  <li class="indexCard list-group-item  hvr-glow">
    <div class="close" v-if="showFlag">
      <div class="btns" @click="fun.alert('点击关闭')" title="点击关闭">
        <el-icon>
          <CloseBold />
        </el-icon>
      </div>
    </div>
    <el-row>
      <el-tag class="ml-2" type="info">title</el-tag>
      <el-text>{{ item.title }}</el-text>
    </el-row>
    <el-row>
      <el-tag class="ml-2" type="info">description</el-tag>
      <el-text>{{ item.description }}</el-text>
    </el-row>
    <div class="text" :class="{ showAll: showFlag == true }">
      <div class="coverMask" @click="showFlag = !showFlag" title="点击显示全部代码"></div>
      <v-md-editor :include-level="[3, 4]" v-model="item.content" mode="preview"
        @copy-code-success="handleCopyCodeSuccess"></v-md-editor>
    </div>
    <div class="tags">
      <el-button class="m-r m-t" round @click="zoomFun(item.id)">放大看看</el-button>
      <el-button class="m-r m-t" round @click="goToRead(item.id)">read</el-button>
      <markdownTags :tag="item.tag1" :click="true" v-if="item.tag1"></markdownTags>
      <markdownTags :tag="item.tag2" :click="true" v-if="item.tag2"></markdownTags>
      <markdownTags :tag="item.tag3" :click="true" v-if="item.tag3"></markdownTags>
      <span class="m-t"><el-button round>time</el-button> <el-text>{{ item.createdAt }}</el-text></span>
    </div>
  </li>
</template>

<script>
import MarkdownTags from "@/components/common/MarkdownTags.vue"
import timeFormat from "@/common/filter/time"
import fun from '@/hook/function'

export default {
  name: "IndexCard",
  components: { MarkdownTags },
  props: {
    item: {},
    zoomFun: { type: Function }
  },
  data() {
    return {
      showFlag: false
    }
  },
  methods: {
    handleCopyCodeSuccess() {
      fun.alert('复制成功', 'success')
    },
    // 点击后跳转详情
    goToRead(id) {
      const routeUrl = this.$router.resolve({
        path: "/code/detail",
        query: { id }
      })
      window.open(routeUrl.href, '_blank')
    },
  },
  watch: {
    item(newVal) {
      // @date 2023/5/5 , @author icestone
      // 分页数据更改时数据会更改,再次格式化时间
      this.item.createdAt = timeFormat.timeFormat(newVal.createdAt) || ''
    }
  },
  created() {
    // @date 2023/5/5 , @author icestone
    // 第一次创建子组件并接收到值时需要格式化下时间
    this.item.createdAt = timeFormat.timeFormat(this.item.createdAt) || ''
  }
}
</script>

<style scoped lang="less">
.list-group-item {
  background: rgba(255, 255, 255, .2);
  padding: .3rem;
  margin-bottom: .3rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;

  .close {
    position: absolute;
    top: 0.3rem;
    right: 0.3rem;
    display: flex;
    width: 2.3rem;
    height: 2.3rem;
    transition: 0.5s;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 0 0 #918f8f;

    .el-icon {
      font-size: 1.3rem !important;
    }

    &:hover {
      box-shadow: 0 0 15px 2px #918f8f;
    }
  }

  div.el-row {
    margin-bottom: .3rem;
  }

  .tags {
    flex-wrap: wrap;
    align-items: center;
  }

  .text {
    max-height: 10vh;
    overflow: hidden;
    position: relative;
    transition-duration: 1.3s;

    .coverMask {
      opacity: 1;
      position: absolute;
      display: flex;
      width: 100%;
      height: 50%;
      bottom: 0;
      left: 0;
      background: linear-gradient(to bottom, rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 1));
      z-index: 3;
      transition-duration: 1.4s;
      border-top-left-radius: 50%;
      border-top-right-radius: 50%;
    }
  }

  .showAll {
    max-height: 100vh !important;

    .coverMask {
      opacity: 0;
      z-index: -1;
      scale: 10;
      top: 25%;
      background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0));
    }
  }
}
</style>
