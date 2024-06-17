<template>
  <ice-column class="read container">
    <ice-text v-if="!dataExist">
      文章不存在或已被删除
    </ice-text>
    <!--文章存在-->
    <ice-column v-if="dataExist">
      <ice-column width="100%">
        <IndexCard :showEditBtn="showEditBtn" :title="markdownData?.title||'title'" :markdownData="markdownData"
                   :userInf="userInf">
          <ice-text>当前字数:{{ wordCount }}</ice-text>
        </IndexCard>
        <div class="articleCon">
          <v-md-editor :include-level="[3, 4]" v-model="markdownData.content" mode="preview"
                       @copy-code-success="handleCopyCodeSuccess"/>
        </div>

        <ice-row class="m-t-l">
          <ice-row class="align-items-center" width="fit-content">
            <ice-input v-model="commentUser.name" :disabled="commentUser.name" placeholder="Please input name"
                       v-if="!userInf.email"/>
            <ice-input v-model="userInf.username" placeholder="名字" disabled v-else/>
          </ice-row>
          <ice-row class="align-items-center" width="fit-content">
            <ice-input v-model="commentUser.url" placeholder="你的url"/>
          </ice-row>
        </ice-row>

        <Comment @refreshComments="refresh" :user="commentUser" :id="markdownData.id" :title="markdownData.title"
                 type="blog"></Comment>
        <ice-text>评论区</ice-text>
        <CommentArea :id="markdownData.id" :refresh="refreshFlag"/>
      </ice-column>
      <ice-column width="100%" v-if="!hideRecommend">
        <!--推荐-->
        <Recommend
            v-if="dataExist"
            :id="id"
            :tags="[markdownData.tag1, markdownData.tag2, markdownData.tag3]"
            @recommendDataChange="dataChangeHandler"/>
      </ice-column>
    </ice-column>
  </ice-column>
</template>

<script setup>
import {ref} from "vue";
import {useRoute} from "vue-router";
import api from "@/common/api";
import {alert} from "@/hook/function";
import filters from "@/common/filter/time";
import IndexCard from "@/components/read/IndexCard";
import Comment from '@/components/read/Comment'
import Recommend from '@/components/read/Recommend.vue'

const markdownData = ref({})
const userInf = ref({})
const dataExist = ref(true)
const article = ref('')
const showEditBtn = ref(false)
const id = ref('')
const commentUser = ref({
  name: "",
  url: "",
})
const refreshFlag = ref(true)
const wordCount = ref('')
const hideRecommend = ref(false)
const route = useRoute();

const timeFormat = () => {
  markdownData.value.createdAt = filters.timeFormat(markdownData.value.createdAt);
}

const init = () => {
  id.value = route.query.id || 0;
  if (id.value === 0) {
    return void 0;
  }
  api.getMarkdown({id: id.value})
      .then(res => {
        if (res.success) {
          dataExist.value = true;
          const flag = JSON.stringify(res.result).length < 3 ? false : true;

          if (flag) {
            // 即将渲染的文章数据
            markdownData.value = res.result;
            timeFormat();
            const content = res.result.content || "null";
            if (content.length > 10) {
              // 文章数据存在时渲染
              article.value = res.result.content;
            }
            userInf.value = res.userInf;
            timeFormat();
            alert("load success");
            showEdit();
          } else {
            // 失败
            dataExist.value = false;
            alert("加载不出来了", "文章不存在或需要从原来的博客网站爬取,可以试试刷新");
          }
        }
      })
}

const handleCopyCodeSuccess = (code) => {
  alert("复制成功");
}
const dataChangeHandler = (flag) => {
  hideRecommend.value = flag;
}

function refresh(val) {
  // 评论发表成功
  if (val) {
    refreshFlag.value = !refreshFlag.value;
  }
}

function showEdit() {
  const email = JSON.parse(localStorage.getItem("userInfo")) || "";
  if (!Boolean(email)) {
    // 没有email时
  } else {
    console.log('email.email',email.email)
    console.log('userInf.value.email',userInf.value.email)
    if (email.email == userInf.value.email) {
      showEditBtn.value = true;
    }
  }
}


init()
</script>

<style scoped lang="less">
@marginTop: 1rem;

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
    z-index: -10;
    height: 100vh;
    overflow: hidden;
    position: fixed;
    background-repeat: no-repeat !important;
    background-size: cover !important;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    transform: scale(2, 2);
    filter: blur(1.5rem);
  }

  .contentLim {
    display: flex;
    max-width: 100%;
    width: 100%;

    .otherOperates {
      display: flex;
      width: 25%;
      margin-top: @marginTop;
    }
  }

  // 小屏
  @media screen and (max-width: 1200px) {
    .contentLim {
      flex-direction: column;
    }

    .dataContainerLim {
      width: 100% !important;
      max-width: 100% !important;
      flex: 1 !important;
    }

    .right {
      display: none;
    }

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
  @media screen and (min-width: 1200px) {
    .contentLim {

      .ice-row {
        width: 100%;
      }
    }
  }

  .dataContainer {
    margin-top: @marginTop;
    display: flex;
    width: 100%;
    flex-direction: column;

    .articleCon {
      display: flex;
      width: 100%;
      flex-direction: column;
      margin-top: .3rem;
      z-index: 3;
      border-radius: 0.5rem;
    }
  }

  .right {
    margin-top: @marginTop;
    overflow: hidden;
  }

  .ice-collapse {
    width: 100%;
    border-radius: .3rem;
    overflow: hidden;

    /deep/ .ice-collapse-item__header,
    .ice-collapse-item__wrap {
      padding-left: .5rem;

      .ice-collapse-item__content {
        padding: .3rem;
      }
    }

    .ice-row {
      align-items: center;
      margin-bottom: .3rem;
    }
  }
}
</style>
