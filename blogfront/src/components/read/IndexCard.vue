<template>
  <div class="indexCard">
    <div class="card hvr-glow">
      <div class="card-body">
        <el-text tag="b" size="large">
          <h5>{{ markdownData.title }}</h5>
        </el-text>
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
          </div>
          <div class="options" v-if="showEditBtn">
            <el-button @click="gotoEditExperiment(markdownData.id)">前往编辑</el-button>
          </div>

          <div class="dataAndViews">
            <div class="viewAdnTags">
              <p class="icon">
                <el-icon>
                  <View/>
                </el-icon>
                <el-text tag="b" size="small">{{ markdownData.view }}</el-text>
              </p>
            </div>
          </div>
        </div>
        <span class="tags">
          <markdownTags :tag="markdownData.tag1" v-if="markdownData.tag1"></markdownTags>
          <markdownTags :tag="markdownData.tag2" v-if="markdownData.tag2"></markdownTags>
          <markdownTags :tag="markdownData.tag3" v-if="markdownData.tag3"></markdownTags>
        </span>
        <div class="desLim" v-if="markdownData.description">
          <el-tag class="ml-2" type="info">description</el-tag>
          <el-text>{{ markdownData.description }}</el-text>
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
     * TODO 前往实验性功能的编辑
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
.indexCard {
  border-radius: .5rem;

  .card {
    width: 100%;
  }

  .card-body {
    display: flex;
    flex-direction: column;

    .userInfoDetail {
      display: flex;
      flex-direction: row;
      align-items: center;

      .info {
        margin-left: 0.3rem;
      }

      .dataAndViews {
        margin: .3rem;

        p {
          display: flex;
          align-items: center;
        }
      }
    }

    .tags {
      margin-left: 0;
    }
  }

  .desLim {
    .el-text {
      margin-left: .3rem;
    }
  }

  b, i {
    margin-right: 0.3rem;
  }
}
</style>
