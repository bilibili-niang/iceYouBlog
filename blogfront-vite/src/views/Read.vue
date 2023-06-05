<template>
  <div class="read">
    <h1>你好</h1>
    <div v-if="!dataExist">
      文章不存在或已被删除
    </div>
    <!--文章存在-->
    <div class="dataContainer" v-if="dataExist">
      <div class="imgLim animation-time">
        <img :src="markdownData.headImg" alt="" v-if="markdownData.headImg">
        <img src="/images/cover/1.png" alt="" v-if="!markdownData.headImg">
        <div class="img"></div>
      </div>
      <indexCard :showEditBtn="showEditBtn" :title="markdownData.title" :markdownData="markdownData"
                 :userInf="userInf"></indexCard>
      <div class="articleCon">
        <v-md-editor
            :include-level="[3,4]"
            v-model="markdownData.content"
            mode="preview"
            @copy-code-success="handleCopyCodeSuccess"
        ></v-md-editor>
      </div>
    </div>
    <div class="otherOperates">
      <!--推荐:-->
      <h1>推荐:</h1>
      {{ markdownData }}
      <Recommend v-if="dataExist" :tags="markdownData.tag1"></Recommend>
    </div>
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item title="友善地评论" name="1">
        <div class="commentUserInf m-b f-c">
          <el-row>
            <el-col :span="4">
              <el-tag class="ml-2" type="info" cal>你的名字</el-tag>
            </el-col>
            <el-col :span="20">
              <el-input v-model="commentUser.name" placeholder="Please input name"/>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <el-tag class="ml-2" type="info">你的url</el-tag>
            </el-col>
            <el-col :span="20">
              <el-input v-model="commentUser.url" placeholder="Please input url"/>
            </el-col>
          </el-row>
        </div>
        <comment :user="commentUser" :id="markdownData.id" :title="markdownData.title" type="blog"></comment>
      </el-collapse-item>
      <el-collapse-item title="评论区" name="2">
        <CommentArea :id="markdownData.id" :refresh="refreshFlag"></CommentArea>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import http from '../common/api/request'
import filters from '../common/filter/time'
import Avatar from '@/components/common/Avatar.vue'
import { ElMessage } from 'element-plus'
import { h } from 'vue'
import MarkdownTags from "@/components/common/MarkdownTags.vue"
import IndexCard from "@/components/read/IndexCard.vue"
import comment from "@/components/read/Comment.vue"
import CommentArea from "@/components/read/CommentArea.vue"
import Recommend from '@/components/read/Recommend.vue'

export default {
  name: "Read",
  methods: {
    handleCopyCodeSuccess (code) {
      this.alertMessage("复制成功")
    },
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
    showEdit () {
      const email = JSON.parse(localStorage.getItem('userInfo')) || ""
      if (!Boolean(email)) {
        // 没有email时
      } else {
        if (email.email == this.userInf.email) {
          this.showEditBtn = true
        }
      }
    },
    alertMessage (title, sub, color) {
      const useColor = color || 'red'
      ElMessage({
        message: h('p', null, [
          h('span', null, title),
          h('i', { style: `color: ${ useColor }` }, sub),
        ]),
      })
    },
    timeFormat (data) {
      this.markdownData.createdAt = filters.timeFormat(this.markdownData.createdAt)
    },
    // 通过id获取初始化数据
    initMarkdownData () {
      this.id = this.$route.query.id || '0'
      http.$axios({
        url: '/markdownFile/getData',
        method: 'POST',
        headers: {
          token: true
        },
        data: {
          id: this.id,
        }
      })
          .then(
              res => {
                // 不成功
                if (!res.success) {
                  this.dataExist = !this.dataExist
                  this.alertMessage('加载不出来了', '你达到了不存在的领域')
                } else {
                  this.dataExist = true
                  const flag = JSON.stringify(res.result).length < 3 ? false : true
                  if (flag) {
                    // 即将渲染的文章数据
                    this.markdownData = res.result
                    this.timeFormat()
                    const content = res.result.content || 'null'
                    if (content.length > 10) {
                      // 文章数据存在时渲染
                      this.article = res.result.content
                    }
                    this.userInf = res.userInf
                    this.timeFormat()
                    this.alertMessage('load success', 'success', '#a1c4fd')
                    this.showEdit()
                  } else {
                    // 失败
                    this.dataExist = false
                    this.alertMessage('加载不出来了', '文章不存在或需要从原来的博客网站爬取,可以试试刷新')
                  }
                }
              }
          )
          .catch(e => {
            this.alertMessage(e)
          })
    },
  },
  components: {
    Recommend,
    CommentArea,
    IndexCard,
    Avatar,
    MarkdownTags,
    comment
  },
  data () {
    return {
      markdownData: {},
      userInf: {},
      dataExist: true,
      article: '',
      showArticle: '',
      loginEdEmail: '',
      showEditBtn: false,
      id: '',
      commentUser: {
        name: '',
        url: '',
      },
      refreshFlag: true,
      activeName: '2'
    }
  },
  created () {
    this.initMarkdownData()
  },
}
</script>

<style scoped lang="less">
@marginTop: 18rem;
.read {
  padding-bottom: 10rem;
  display: flex;
  justify-content: flex-start;
  margin: 0 auto;
  flex-direction: column;
  overflow: visible;
  min-height: 90vh;
  align-items: center;

  .imgLim {
    z-index: -1;
    max-height: 30%;
    min-height: 20rem;
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    filter: blur(.3rem) grayscale(80%);

    img {
      background-size: cover;
      display: flex;
      width: 100%;
      height: 100%;
    }
  }

  // 小屏
  @media screen and (max-width: 800px) {
    & {
      padding-left: 0.3rem;
      padding-right: 0.3rem;
      box-sizing: border-box;

      .card-body {
        padding: 0;

        .ownerDes {
          margin-left: 0 !important;
        }
      }

      .card {
        .card-body {
          .ownerDes {
            .dataAndViews {
              flex-direction: column !important;

            }
          }
        }

        .ownerDes {
          width: 100%;
        }
      }
    }
  }

  // 大屏
  @media screen and (min-width: 800px) {
    & {
      max-width: 1140px;
    }
  }

  .dataContainer {
    margin-top: @marginTop;
    display: flex;
    width: 100%;
    flex-direction: column;

    &:hover {
      .imgLim {
        filter: blur(0) grayscale(0);
      }
    }

    .articleCon {
      display: flex;
      width: 100%;
      flex-direction: column;
      margin-top: .3rem;
      z-index: 3;
      background: #ffffff;
      border-radius: 0.5rem;

      :deep .github-markdown-body {
        padding: 0.3rem;
      }
    }
  }

  .el-collapse {
    width: 100%;

    .el-row {
      align-items: center;
      margin-bottom: .3rem;
    }
  }

  .otherOperates {
    position: fixed;
    right: 3rem;
    margin-top: @marginTop;

  }

}
</style>
