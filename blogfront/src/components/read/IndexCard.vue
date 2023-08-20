<template>
  <div class="indexCard">
    <div class="card">
      <div class="card-body">
        <ice-title size="l">{{ markdownData.title }}</ice-title>
        <div class="userInfoDetail">
          <div class="imgLLim">
            <Avatar :imgUrl="userInf.avatar" :email="userInf.email"></Avatar>
          </div>
          <div class="info">
            <p class="name">
              <el-text tag="b" size="small">发布者:</el-text>
              <el-text tag="b" size="small">{{ userInf.username }}</el-text>
            </p>
            <p>
              <el-text tag="b" size="small">邮箱:</el-text>
              <el-text tag="b" size="small">{{ userInf.email }}</el-text>
            </p>
            <p class="time">
              <el-text tag="b" size="small">发布时间:</el-text>
              <el-text tag="b" size="small">{{ markdownData.createdAt }}</el-text>
            </p>
            <p class="icon">
              <el-text tag="b" size="small">浏览量:</el-text>
              <el-text tag="b" size="small">{{ markdownData.view }}</el-text>
            </p>
            <p class="icon">
              <slot></slot>
            </p>
          </div>
        </div>
        <span class="tags">
            <ice-button>tags</ice-button>
            <ice-link :tag="markdownData.tag1" v-if="markdownData.tag1"
                      :href="'#/read/readTag?tag1='+markdownData.tag1">
              {{ markdownData.tag1 }}
            </ice-link>

            <ice-link :tag="markdownData.tag2" v-if="markdownData.tag2"
                      :href="'#/read/readTag?tag1='+markdownData.tag2">
              {{ markdownData.tag2 }}
            </ice-link>
            <ice-link :tag="markdownData.tag3" v-if="markdownData.tag3"
                      :href="'#/read/readTag?tag1='+markdownData.tag3">
              {{ markdownData.tag3 }}
            </ice-link>
        </span>
        <div class="desLim" v-if="markdownData.description">
          <el-tag class="ml-2" type="info">description</el-tag>
          <el-text>{{ markdownData.description }}</el-text>
        </div>
        <div class="options m-t" v-if="showEditBtn">
          <el-button @click="gotoEditExperiment(markdownData.id)">前往编辑</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MarkdownTags from "@/components/common/MarkdownTags.vue"
import Avatar from '@/components/common/Avatar.vue'

export default {
  name: "indexCard",
  components: {
    MarkdownTags,
    Avatar
  },
  props: {
    title: {},
    userInf: {},
    markdownData: {},
    showEditBtn: '',
  },
  methods: {
    /* @author icestone , 16:02
     * @date 2023/5/6
     * 前往实验性功能的编辑
    */
    gotoEditExperiment (id) {
      const routeUrl = this.$router.resolve({
        path: "/edit/vMdEditor",
        query: { id }
      })
      window.open(routeUrl.href, '_blank')
    },
  }
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
