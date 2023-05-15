<template>
  <div class="user container">
    <div class="userCard card">
      <div class="avatar">
        <Avatar :imgUrl="userInfo.avatar"></Avatar>
      </div>
      <div class="detail">
        <div class="name">
          <span class="align-middle">
          <el-text tag="b" size="small">name:</el-text>
            <p>
            {{ userInfo.username }}
            </p>
          </span>
          <div class="buttonGroup">
            <el-button @click="loginOut()">login out</el-button>
            <el-button @click="editUser()">编辑个人信息</el-button>
          </div>
        </div>

        <div class="otherInf">
        <span class="align-middle">
          <el-text tag="b" size="small">email:</el-text>
          <p>
            {{ userInfo.email }}
          </p>
          </span>
          <span>
          <el-text tag="b" size="small">id:</el-text>
          <p>
            {{ userInfo.id }}
          </p>
          </span>
        </div>
      </div>
      <div class="icon">
        <span v-if="Boolean(userInfo.githubUrl)">
          <el-text tag="b" size="small">github:</el-text>
            {{ userInfo.githubUrl }}
        </span>

        <span v-if="Boolean(userInfo.word)">
          <el-text tag="b" size="small">word:</el-text>
            {{ userInfo.word }}
        </span>
        <span v-if="Boolean(userInfo.occupation)">
          <el-text tag="b" size="small">occupation:</el-text>
            {{ userInfo.occupation }}
        </span>
      </div>
    </div>

    <div class="list">
      <el-tabs class="demo-tabs" v-model="activeName" @tab-click="initHistory">
        <el-tab-pane label="Article" name="article">
          <div class="options">
            <el-button @click="open">删除</el-button>
          </div>
          <!--bootstrap的card-->
          <div class="card" style="width: 100%;" v-for="(item,index) in articleList" :key="index">
            <indexCard :item="item" ref="indexCard" v-on:showAlert="getShowAlert"></indexCard>
            <div class="btns">
              <el-checkbox v-model="item.checked" border/>
            </div>
          </div>
          <!--展示选择tag的页面-->
          <el-drawer v-model="drawer" direction="ttb" size="75%" title="I am the title" :with-header="false">
            当前文章:
            <el-text tag="b" size="large">{{ currentInfo.title }}</el-text>

            <div class="tagsLim">
              <!--点击添加进已选中的tag并更改样式-->
              <div v-for="(item,index) in tagList" :key="index" class="tag">
                <el-tag size="large" v-bind:class="{ active:selectedList.indexOf(index)!=-1}" class="animation-time"
                        @click="addChecked(item,index)">{{ item }}
                </el-tag>
              </div>
            </div>
            <el-button @click="submitTags()">提交</el-button>

          </el-drawer>

        </el-tab-pane>
        <el-tab-pane label="History" name="history">
          <div class="card" style="width: 100%;" v-for="(item,index) in historyList" :key="index">
            <historyIndexCard :item="item"></historyIndexCard>
          </div>
        </el-tab-pane>
        <el-tab-pane label="DeletedFile" name="DeletedFile">
          <div class="options">
            <el-button @click="recover()">恢复所选文章</el-button>
          </div>
          <div class="card" style="width: 100%;" v-for="(item,index) in deletedFile" :key="index">
            <div class="btns">
              <el-checkbox v-model="item.checked" border/>
            </div>
            <historyIndexCard :item="item"></historyIndexCard>
          </div>

        </el-tab-pane>
        <el-tab-pane label="codeSnippet" name="codeSnippet">codeSnippet</el-tab-pane>
        <el-tab-pane label="feelings" name="feelings">feelings</el-tab-pane>

      </el-tabs>
    </div>
  </div>
</template>

<script>
import Avatar from '@/components/common/Avatar.vue'
import http from '../common/api/request'
import router from '@/router';
import {ElMessage, ElMessageBox} from 'element-plus';
import {h} from 'vue';
import IndexCard from "@/components/user/IndexCard.vue";
import HistoryIndexCard from "@/components/user/HistoryIndexCard.vue";

export default {
  name: "User",
  components: {HistoryIndexCard, IndexCard, Avatar},
  data() {
    return {
      userInfo: {},
      sequence: 0,
      sequenceSize: 20,
      articleList: [],
      historyList: [],
      activeName: 'article',
      checked: false,
      selectedItem: [],
      deletedFile: [],
      deletedFileSelectedItem: [],
      drawer: false,
      tagList: {},
      selectedList: [],
      // 当前需要添加tag的文章的信息
      currentInfo: {},
    }
  },
  methods: {
    /* @author icestone , 14:19
     * @date 2023/5/7
     * TODO 将传入的id存储到 selectedList 中
    */
    addChecked(item, id) {
      // @date 2023/5/7 , @author icestone
      // TODO 如果存在该id,弹出指定id
      if (this.selectedList.indexOf(id) != -1) {
        this.selectedList.splice(this.selectedList.indexOf(id))
      } else {
        // @date 2023/5/7 , @author icestone
        // TODO 如果 selectedList 的长度大于等于3,已满,替换掉第一个
        if (this.selectedList.length >= 3) {
          this.selectedList.splice(0, 1, id);
        } else {
          // @date 2023/5/7 , @author icestone
          // TODO 未满,增加
          this.selectedList.push(id);
        }
      }
    },

    /* @author icestone , 13:30
     * @date 2023/5/7
     * TODO 提交选中的tags
    */
    submitTags: function () {
      const tags = [];
      Object.values(this.selectedList).map(item => {
        tags.push(this.tagList[item])
      })
      http.$axios({
        url: "/markdownFile/updateSomething",
        method: 'POST',
        headers: {
          token: true
        },
        data: {
          operate: 'updateTags',
          tags: {
            tag1: tags[0],
            tag2: tags[1],
            tag3: tags[2],
          },
          id: this.currentInfo.id,
        }
      })
          .then(res => {
            this.alertMessage(res.message);
            this.drawer = false;
            this.getUserArticle();
          })
          .catch(e => {
            this.alertMessage(e);
          })
    },
    /* @author icestone , 15:31
     * @date 2023/5/7
     * TODO 接收子组件传给父组件的值
    */
    getShowAlert(val) {
      this.currentInfo = val;
      this.drawer = val.flag;
    },
    /**
     * @Description:
     * @author icestone
     * @date 2023/5/5
     * TODO 初始化获取用户已删除的文章数据
     */
    async getDeletedFiles() {
      // 发起请求,
      await http.$axios({
        url: '/markdownFile/deletedFile',
        method: 'POST',
        headers: {
          token: true
        },
      })
          .then(res => {
            this.alertMessage(res.message);
            if (res.success) {
              this.deletedFile = res.result;
              this.deletedFile.map(item => {
                item.checked = false;
              })
            } else {
              console.log('error')
            }
          })
          .catch(e => {
            this.alertMessage(e);
          })
    },
    /**
     * @Description:
     * @author icestone
     * @date 2023/5/4
     * TODO 恢复所选的文章
     */
    async recover() {
      // @date 2023/5/4 , @author icestone
      // TODO 清空一下所选的id数组
      this.selectedItem = [];
      // @date 2023/5/4 , @author icestone
      // TODO 获取删除文章中所选择的id
      this.deletedFile.forEach((item, index) => {
        if (item.checked) {
          this.selectedItem.push(item.id);
        }
      })
      console.log('所选择的id:');
      console.log(this.selectedItem);
      if (this.selectedItem.length > 0) {
        await http.$axios({
          url: '/markdownFile/operate',
          method: 'POST',
          headers: {
            token: true
          },
          data: {
            operate: 'recover',
            ids: this.selectedItem
          }
        })
            .then(res => {
              console.log(res)
              this.alertMessage(res.message)
              // @date 2023/5/5 , @author icestone
              // TODO 重新获取数据
              this.getDeletedFiles();
            })
            .catch(e => {
              this.alertMessage(e)
            })
      } else {
        this.alertMessage("请选中")
      }


    },
    /**
     * @Description:
     * @author icestone
     * @date 2023/5/4
     * TODO 伪删除所选文章
     */
    open() {
      ElMessageBox.confirm(
          '确定要删除吗?',
          'Warning',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }
      )
          .then(() => {
            this.delSelectedItems();
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: 'Delete canceled',
            })
          })
    },
    /**
     * @Description:
     * @author icestone
     * @date 2023/5/5
     * TODO 伪删除文章
     */
    delSelectedItems() {
      // 获取一下选中
      this.showSelectedItem();
      http.$axios({
        url: '/markdownFile/operate',
        method: 'POST',
        headers: {
          token: true
        },
        data: {
          operate: 'del',
          ids: this.selectedItem
        }
      })
          .then(res => {
            console.log("res:")
            console.log(res)
            ElMessage({
              type: res.success,
              message: res.message,
            })
            // @date 2023/5/3 , @author icestone
            // TODO 删除之后重新获取数据
            this.getUserArticle();
            // @date 2023/5/5 , @author icestone
            // TODO 将所有的选中取消
            this.articleList.map(item => {
              item.checked = false;
            })
          })
          .catch(e => {
            console.log("删除失败:")
            console.log(e)
          })

    },
    /**
     * @Description:
     * @author icestone
     * @date 2023/5/4
     * TODO 获取选中的item,存储在 selectedItem 中
     */
    showSelectedItem() {
      this.articleList.forEach((item, index) => {
        if (item.checked) {
          this.selectedItem.push(item.id);
        }
      })
    },
    alertMessage(title, sub, color) {
      const useColor = color || 'red';
      ElMessage({
        message: h('p', null, [
          h('span', null, title),
          h('i', {style: `color: ${useColor}`}, sub),
        ]),
      })
    },
    // 跳转编辑个人信息
    editUser() {
      this.$router.push('/editUser');
    },
    /**
     * @Description:
     * @author icestone
     * @date 2023/5/5
     * TODO 点击不同的选项卡
     */
    async initHistory(tab, event) {
      this.selectedItem = [];

      if (tab.props.name == 'history') {
        if (JSON.stringify(this.historyList).length > 10) {
          return
        }
        // 发起请求,
        await http.$axios({
          url: '/history/userAllHistory',
          method: 'POST',
          headers: {
            token: true
          }
        })
            .then(res => {
              console.log("res:")
              console.log(res)
              if (res.success) {
                this.historyList = res.result;
              } else {
                console.log('error')
              }
            })
            .catch(e => {
              console.log("e:")
              console.log(e)
            })
      } else if (tab.props.name == 'DeletedFile') {
        this.getDeletedFiles();
      }
    },
    // 退出登录
    loginOut() {
      localStorage.removeItem("userInfo");
      this.$router.push('/');
    },
    // 初始化时判断是否有用户登陆
    initUser() {
      const user = localStorage.getItem("userInfo") || '';
      if (user.length < 10) {
        router.push({path: '/'});
        this.alertMessage('当前没有用户登录')
      } else {
        this.alertMessage('有用户登录')
        // 由用户存在
        this.userInfo = JSON.parse(user);
      }
    },
    goToRead(id) {
      const routeUrl = this.$router.resolve({
        path: "/read",
        query: {id}
      });
      window.open(routeUrl.href, '_blank');
    },
    // 获取该用户的文章
    getUserArticle() {
      http.$axios({
        url: '/markdownFile/getUserArticle',
        method: 'POST',
        headers: {
          token: true
        },
        data: {
          // 提交分页id和分页数量
          sequence: this.sequence,
          sequenceSize: this.sequenceSize
        },
      })
          .then(res => {
            this.alertMessage(res.message)
            if (JSON.stringify(res.result).length > 10) {
              // articleList数据
              this.articleList = res.result;
              this.articleList.map(item => {
                item.checked = false;
              })
            }
          })
          .catch(e => {
            this.alertMessage(e)
          })
    }
  },
  created() {
    this.initUser();
    this.getUserArticle();
  },
  watch: {
    drawer(newVal) {
      // flag更新,获取tag
      if (newVal) {
        http.$axios({
          url: '/markdownFile/getAllTags',
          method: 'POST',
          headers: {
            token: true
          },
        })
            .then(res => {
              this.alertMessage(res.message)
              this.tagList = res.result;
            })
            .catch(e => {
              this.alertMessage(e)
            })
      }
    }
  }
}
</script>

<style scoped lang="less">
.user {
  .card {
    padding: 0.5rem;
    width: 100%;
    margin-bottom: 1rem;
    position: relative;

    .btns {
      position: absolute;
      top: 0.3rem;
      right: 0.3rem;
    }

    .card-body {
      .card-text {

      }
    }
  }

  .userCard {
    display: flex;
    flex-direction: column;

    @media screen and (max-width: 800px) {
      & {
        flex-direction: column !important;

        .avatar {
          justify-content: center;
        }
      }
    }

    .avatar {
      display: flex;
      align-items: center;
      padding-right: 0.5rem;
      flex-direction: row;
      justify-content: space-between;
    }

    .detail {
      display: flex;
      flex-direction: column;
      width: 100%;

      .name {
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: space-between;
        align-items: center;
      }

      span {
        padding-top: 0.5rem;
        display: flex;
        align-items: center;
      }

      .otherInf {
        display: flex;
        flex-direction: row;

        span {
          margin-right: 1.5rem;
        }
      }
    }

    .icon {
      display: flex;
      flex-direction: column;
      line-height: 2rem;
    }
  }

  .list {
    .options {
      margin-bottom: 0.3rem;
    }
  }

  .tagsLim {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    .tag {
      margin: 0.3rem;
    }
  }
}

.active {
  margin-top: 0; /*和hover的margin-top有对比，原无30,现在0，相当于上移了,30px*/
  box-shadow: 0 0 15px 2px #918f8f; /*盒子阴影*/
  transition: all 0.2s; /*持续时间*/
}
</style>