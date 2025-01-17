<template>
  <div class="user container">
    <div class="userCard card p-small">
      <div class="avatar">
        <Avatar :imgUrl="userInfo.avatar"></Avatar>
      </div>
      <div class="detail">
        <div class="name">
          <ice-row>
            <ice-text>name:</ice-text>
            <ice-text nowrap>
              {{ userInfo.username }}
            </ice-text>
          </ice-row>
          <div class="ice-column">
            <ice-button @click="loginOut">login out</ice-button>
            <ice-button @click="editUser">编辑个人信息</ice-button>
          </div>
        </div>

        <div class="ice-column">
          <ice-row>
            <ice-text>email:</ice-text>
            <ice-text>
              {{ userInfo.email }}
            </ice-text>
          </ice-row>

          <ice-row>
            <ice-text>id:</ice-text>
            <ice-text>
              {{ userInfo.id }}
            </ice-text>
          </ice-row>
        </div>
      </div>
      <div class="icon">
        <span v-if="Boolean(userInfo.githubUrl)" class="ice-row">
          <ice-text>github:</ice-text>
          <ice-text>
            {{ userInfo.githubUrl }}
          </ice-text>
        </span>

        <span v-if="Boolean(userInfo.word)" class="ice-row">
          <ice-text ice-text>word:</ice-text>
          <ice-text>
            {{ userInfo.word }}
          </ice-text>
        </span>
        <span v-if="Boolean(userInfo.occupation)" class="ice-row">
          <ice-text ice-text>occupation:</ice-text>
          <ice-text>
            {{ userInfo.occupation }}
          </ice-text>
        </span>
      </div>
    </div>

    <div class="list">
      <ice-tabs v-model="activeName">
        <ice-tab-item label="article" name="所有文章">
          <div class="options">
            <ice-button @click="open">删除</ice-button>
            <ice-button @click="setAsRecommend">置顶</ice-button>
          </div>

          <el-drawer v-model="showRecommendLevel" direction="ttb" title="选择你的推荐等级" :with-header="false">
            <el-select v-model="recommendLevel" class="m-2" placeholder="Select" size="large">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <ice-button @click="subMitRecommend">决定这个了</ice-button>
          </el-drawer>

          <div class="card" v-for="(item, index) in articleList" :key="index">
            <indexCard :item="item" ref="indexCard" v-on:showAlert="getShowAlert"></indexCard>
            <div class="btns">
              <el-checkbox v-model="item.checked" border />
            </div>
          </div>
          <!--展示选择tag的页面-->
          <el-drawer v-model="drawer" direction="ttb" size="75%" title="I am the title" :with-header="false">
            当前文章:
            <ice-text ice-text size="large">{{ currentInfo.title }}</ice-text>

            <div class="tagsLim">
              <!--点击添加进已选中的tag并更改样式-->
              <div v-for="(item, index) in tagList" :key="index" class="tag">
                <ice-tag
                  size="large"
                  v-bind:class="{ active: selectedList.indexOf(index) != -1 }"
                  class="animation-time"
                  @click="addChecked(item, index)"
                  >{{ item }}
                </ice-tag>
              </div>
            </div>
            <ice-button @click="submitTags()">提交</ice-button>
          </el-drawer>
          <div class="btns">
            <!--<ice-button @click="getDataById()">下一页</ice-button>-->
            <el-pagination
              v-model:current-page="currentPage2"
              v-model:page-size="pageSize2"
              :page-sizes="[10, 20, 30, 40]"
              small="small"
              :disabled="disabled"
              layout="sizes, prev, pager, next"
              :total="allCount"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </ice-tab-item>

        <ice-tab-item label="topArticle" name="已置顶文章">
          <ice-text>已置顶文章</ice-text>
          <ice-button @click="getSelect">获取已选</ice-button>
          <TopArticle operate="selectOperate"></TopArticle>
        </ice-tab-item>

        <ice-tab-item label="history" name="历史记录">
          <div class="card" v-for="(item, index) in historyList" :key="index">
            <indexCard :item="item"></indexCard>
          </div>
        </ice-tab-item>

        <ice-tab-item label="deletedFile" name="伪删除的文章">
          <div class="options">
            <ice-button @click="recover()">恢复所选文章</ice-button>
          </div>
          <div class="card" v-for="(item, index) in deletedFile" :key="index">
            <div class="btns">
              <el-checkbox v-model="item.checked" border />
            </div>
            <indexCard :item="item"></indexCard>
          </div>
        </ice-tab-item>

        <ice-tab-item label="others" name="其他配置">
          <dvi class="others">
            <span>
              <ice-text> 查看头图 </ice-text>
              <ice-text>
                <a href="#/user/headImg">HeadImg</a>
              </ice-text>
            </span>
            <span>
              <ice-text> 我的评论 </ice-text>
              <ice-text>
                <a href="#/user/postedComments">已发布的评论</a>
              </ice-text>
            </span>
          </dvi>
        </ice-tab-item>
      </ice-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { fun } from '@/hook/function'
import { useRouter } from 'vue-router'
import Avatar from '@/components/common/Avatar.vue'

const router = useRouter()
const activeName = ref('article')
const userInfo = ref({})

const init = () => {
  const user = localStorage.getItem('userInfo') || ''
  if (user.length < 10) {
    router.push({ path: '/' })
    fun.alert('当前没有用户登录')
  } else {
    fun.alert('有用户登录')
    // 由用户存在
    userInfo.value = JSON.parse(user)
  }
}

const loginOut = () => {
  localStorage.removeItem('userInfo')
  router.push('/')
}
const goToRead = id => {
  const routeUrl = router.resolve({
    path: '/read',
    query: { id }
  })
  window.open(routeUrl.href, '_blank')
}

init()
</script>

<style scoped lang="less"></style>
