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
        <span class="ice-row">
          <ice-text>email:</ice-text>
            <ice-text>
            {{ userInfo.email }}
            </ice-text>
          </span>
          <span>
          <ice-text>id:</ice-text>
            <ice-text>
            {{ userInfo.id }}
            </ice-text>
          </span>
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
      <el-tabs class="demo-tabs" v-model="activeName" @tab-click="initHistory">
        <el-tab-pane label="所有文章" name="article">
          <div class="options">
            <ice-button @click="open">删除</ice-button>
            <ice-button @click="setAsRecommend">置顶</ice-button>
          </div>

          <el-drawer v-model="showRecommendLevel" direction="ttb" title="选择你的推荐等级" :with-header="false">
            <el-select v-model="recommendLevel" class="m-2" placeholder="Select" size="large">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
            <ice-button @click="subMitRecommend">决定这个了</ice-button>
          </el-drawer>

          <div class="card" v-for="(item,index) in articleList" :key="index">
            <indexCard :item="item" ref="indexCard" v-on:showAlert="getShowAlert"></indexCard>
            <div class="btns">
              <el-checkbox v-model="item.checked" border/>
            </div>
          </div>
          <!--展示选择tag的页面-->
          <el-drawer v-model="drawer" direction="ttb" size="75%" title="I am the title" :with-header="false">
            当前文章:
            <ice-text ice-text size="large">{{ currentInfo.title }}</ice-text>

            <div class="tagsLim">
              <!--点击添加进已选中的tag并更改样式-->
              <div v-for="(item,index) in tagList" :key="index" class="tag">
                <ice-tag size="large" v-bind:class="{ active:selectedList.indexOf(index)!=-1}" class="animation-time"
                         @click="addChecked(item,index)">{{ item }}
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
        </el-tab-pane>

        <el-tab-pane label="已置顶文章" name="topArticle">
          <ice-text>已置顶文章</ice-text>
          <ice-button @click="getSelect">获取已选</ice-button>
          <TopArticle operate="selectOperate"></TopArticle>
        </el-tab-pane>

        <el-tab-pane label="历史记录" name="history">
          <div class="card" v-for="(item,index) in historyList" :key="index">
            <indexCard :item="item"></indexCard>
          </div>
        </el-tab-pane>

        <el-tab-pane label="伪删除的文章" name="DeletedFile">
          <div class="options">
            <ice-button @click="recover()">恢复所选文章</ice-button>
          </div>
          <div class="card" v-for="(item,index) in deletedFile" :key="index">
            <div class="btns">
              <el-checkbox v-model="item.checked" border/>
            </div>
            <indexCard :item="item"></indexCard>
          </div>
        </el-tab-pane>
        <el-tab-pane label="others" name="others">
          <dvi class="others">
          <span>
            <ice-text>
            查看头图
            </ice-text>
            <ice-text>
              <a href="#/user/headImg">HeadImg</a>
            </ice-text>
          </span>
            <span>
            <ice-text>
            我的评论
            </ice-text>
            <ice-text>
              <a href="#/user/postedComments">已发布的评论</a>
            </ice-text>
          </span>
          </dvi>
        </el-tab-pane>
        <el-tab-pane label="feelings" name="feelings">feelings</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import Avatar from "@/components/common/Avatar.vue";
import http from "@/common/api/request";
import router from "@/router";
import {ElMessage, ElMessageBox} from "element-plus";
import IndexCard from "@/components/user/IndexCard.vue";
import HistoryIndexCard from "@/components/user/HistoryIndexCard.vue";
import TopArticle from "@/components/user/TopArticle.vue";
import indexCard from "@/components/index/IndexCard.vue";

export default {
  name: "User",
  components: {HistoryIndexCard, IndexCard, Avatar, TopArticle, indexCard},
  data() {
    return {
      userInfo: {},
      sequence: 0,
      sequenceSize: 20,
      articleList: [],
      historyList: [],
      activeName: "article",
      checked: false,
      selectedItem: [],
      deletedFile: [],
      deletedFileSelectedItem: [],
      drawer: false,
      tagList: {},
      selectedList: [],
      // 当前需要添加tag的文章的信息
      currentInfo: {},
      pageSize2: 10,
      currentPage2: 1,
      allCount: 0,
      disabled: false,
      // @date 2023/5/20 , @author icestone
      // 展示设置文章推荐等级的抽屉
      showRecommendLevel: false,
      options: [
        {
          value: "0",
          label: "level 0 不设置置顶",
        }, {
          value: 1,
          label: "level 1",
        },
        {
          value: 2,
          label: "level 2",
        },
        {
          value: 3,
          label: "level 3",
        },
        {
          value: 4,
          label: "level 4",
        },
        {
          value: 5,
          label: "level 5",
        },
      ],
      recommendLevel: null,
      selectOperate: ""
    };
  },
  methods: {
    /* @author 张嘉凯
     * @date 2023/6/19 @time
     *  获取已选item
    */
    getSelect() {
      this.selectOperate = "get";
    },
    /* @author icestone , 15:46
     * @date 2023/5/20
     * 设置置顶文章
    */
    subMitRecommend() {
      http.$axios({
        url: "/markdownFile/setRecommend",
        method: "POST",
        headers: {
          token: true
        },
        data: {
          ids: this.selectedItem,
          level: this.recommendLevel
        }
      })
          .then(res => {
            this.alertMessage(res.message);
            this.showRecommendLevel = false;
            this.getUserArticle();
          })
          .catch(e => {
            this.alertMessage(e);
            this.showRecommendLevel = false;
            this.getUserArticle();
          });
    },
    /* @author icestone , 15:26
     * @date 2023/5/20
     * 显示设置置顶文章的可选等级
    */
    setAsRecommend() {
      // 获取一下选中
      this.showSelectedItem();
      // @date 2023/5/20 , @author icestone
      // 选择id不为0才展开
      if (this.selectedItem.length != 0) {
        this.showRecommendLevel = true;
      } else {
        this.alertMessage("请选中再操作", "当前没有选中item", "red");
      }
    },
    /* @author icestone , 23:52
     * @date 2023/5/15
     * 分页按钮
    */
    handleCurrentChange(val) {
      let id = this.pageSize2 * val;
      // @date 2023/5/15 , @author icestone
      //   请求数据
      http.$axios({
        url: "/markdownFile/getUserArticle",
        method: "POST",
        headers: {
          token: true
        },
        data: {
          limit: 20,
          id
        }
      })
          .then(res => {
            console.log("请求的数据");
            console.log(res);
            // @date 2023/5/16 , @author icestone
            // 如果返回的有数据:
            if (Boolean(res.result.rows.length)) {
              this.alertMessage(res.message);
              this.articleList = res.result.rows;
              // 取消一下选中
              this.articleList.map(item => {
                item.checked = false;
              });
            } else {
              this.alertMessage("你已查询到尽头辣!");
            }
          })
          .catch(e => {
            console.log("e:");
            console.log(e);
          });

    },
    handleSizeChange(val) {
      // console.log(`${val} items per page`)
    },
    /* @author icestone , 14:19
     * @date 2023/5/7
     * 将传入的id存储到 selectedList 中
    */
    addChecked(item, id) {
      // @date 2023/5/7 , @author icestone
      // 如果存在该id,弹出指定id
      if (this.selectedList.indexOf(id) != -1) {
        this.selectedList.splice(this.selectedList.indexOf(id));
      } else {
        // @date 2023/5/7 , @author icestone
        // 如果 selectedList 的长度大于等于3,已满,替换掉第一个
        if (this.selectedList.length >= 3) {
          this.selectedList.splice(0, 1, id);
        } else {
          // @date 2023/5/7 , @author icestone
          // 未满,增加
          this.selectedList.push(id);
        }
      }
    },

    /* @author icestone , 13:30
     * @date 2023/5/7
     * 提交选中的tags
    */
    submitTags: function () {
      const tags = [];
      Object.values(this.selectedList).map(item => {
        tags.push(this.tagList[item]);
      });
      http.$axios({
        url: "/markdownFile/updateSomething",
        method: "POST",
        headers: {
          token: true
        },
        data: {
          operate: "updateTags",
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
          });
    },
    /* @author icestone , 15:31
     * @date 2023/5/7
     * 接收子组件传给父组件的值
    */
    getShowAlert(val) {
      this.currentInfo = val;
      this.drawer = val.flag;
    },
    /**
     * @Description:
     * @author icestone
     * @date 2023/5/5
     * 初始化获取用户已删除的文章数据
     */
    async getDeletedFiles() {
      // 发起请求,
      await http.$axios({
        url: "/markdownFile/deletedFile",
        method: "POST",
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
              });
            } else {
              console.log("error");
            }
          })
          .catch(e => {
            this.alertMessage(e);
          });
    },
    /**
     * @Description:
     * @author icestone
     * @date 2023/5/4
     * 恢复所选的文章
     */
    async recover() {
      // @date 2023/5/4 , @author icestone
      // 清空一下所选的id数组
      this.selectedItem = [];
      // @date 2023/5/4 , @author icestone
      // 获取删除文章中所选择的id
      this.deletedFile.forEach((item, index) => {
        if (item.checked) {
          this.selectedItem.push(item.id);
        }
      });
      console.log("所选择的id:");
      console.log(this.selectedItem);
      if (this.selectedItem.length > 0) {
        await http.$axios({
          url: "/markdownFile/operate",
          method: "POST",
          headers: {
            token: true
          },
          data: {
            operate: "recover",
            ids: this.selectedItem
          }
        })
            .then(res => {
              console.log(res);
              this.alertMessage(res.message);
              // @date 2023/5/5 , @author icestone
              // 重新获取数据
              this.getDeletedFiles();
            })
            .catch(e => {
              this.alertMessage(e);
            });
      } else {
        this.alertMessage("请选中");
      }


    },
    /**
     * @Description:
     * @author icestone
     * @date 2023/5/4
     * 伪删除所选文章
     */
    open() {
      // 获取一下选中
      this.showSelectedItem();
      // @date 2023/5/20 , @author icestone
      // 选中才会显示
      if (this.selectedItem.length != 0) {
        ElMessageBox.confirm(
            "确定要删除吗?",
            "Warning",
            {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            }
        )
            .then(() => {
              this.delSelectedItems();
            })
            .catch(() => {
              ElMessage({
                type: "info",
                message: "Delete canceled",
              });
            });
      } else {
        this.alertMessage("请选中再操作", "当前没有选中item", "red");
      }
    },
    /**
     * @Description:
     * @author icestone
     * @date 2023/5/5
     * 伪删除文章
     */
    delSelectedItems() {
      http.$axios({
        url: "/markdownFile/operate",
        method: "POST",
        headers: {
          token: true
        },
        data: {
          operate: "del",
          ids: this.selectedItem
        }
      })
          .then(res => {
            console.log("res:");
            console.log(res);
            ElMessage({
              type: res.success,
              message: res.message,
            });
            // @date 2023/5/3 , @author icestone
            // 删除之后重新获取数据
            this.getUserArticle();
            // @date 2023/5/5 , @author icestone
            // 将所有的选中取消
            this.articleList.map(item => {
              item.checked = false;
            });
          })
          .catch(e => {
            console.log("删除失败:");
            console.log(e);
          });

    },
    /**
     * @Description:
     * @author icestone
     * @date 2023/5/4
     * 获取选中的item,存储在 selectedItem 中
     */
    showSelectedItem() {
      this.articleList.forEach((item, index) => {
        if (item.checked) {
          this.selectedItem.push(item.id);
        }
      });
    },
    alertMessage(title, sub, color) {
      console.log("title, sub, color", title, sub, color);
    },
    // 跳转编辑个人信息
    editUser() {
      this.$router.push("/editUser");
    },
    /**
     * @Description:
     * @author icestone
     * @date 2023/5/5
     * 点击不同的选项卡
     */
    async initHistory(tab, event) {
      this.selectedItem = [];

      if (tab.props.name == "history") {
        if (JSON.stringify(this.historyList).length > 10) {
          return;
        }
        // 发起请求,
        await http.$axios({
          url: "/history/userAllHistory",
          method: "POST",
          headers: {
            token: true
          }
        })
            .then(res => {
              if (res.success) {
                this.historyList = res.result;
              } else {
                console.log("error");
              }
            })
            .catch(e => {
              console.log("e:");
              console.log(e);
            });
      } else if (tab.props.name == "DeletedFile") {
        this.getDeletedFiles();
      }
    },
    // 退出登录
    loginOut() {
      localStorage.removeItem("userInfo");
      this.$router.push("/");
    },
    // 初始化时判断是否有用户登陆
    initUser() {
      const user = localStorage.getItem("userInfo") || "";
      if (user.length < 10) {
        router.push({path: "/"});
        this.alertMessage("当前没有用户登录");
      } else {
        this.alertMessage("有用户登录");
        // 由用户存在
        this.userInfo = JSON.parse(user);
      }
    },
    goToRead(id) {
      const routeUrl = this.$router.resolve({
        path: "/read",
        query: {id}
      });
      window.open(routeUrl.href, "_blank");
    },
    // 获取该用户的文章
    getUserArticle() {
      http.$axios({
        url: "/markdownFile/getUserArticle",
        method: "POST",
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
            this.alertMessage(res.message);
            if (JSON.stringify(res.result.rows).length > 10) {
              // articleList数据
              this.articleList = res.result.rows;
              // @date 2023/5/15 , @author icestone
              // 所有文章的数量,用作分页
              this.allCount = res.result.count;
              this.articleList.map(item => {
                item.checked = false;
              });
            }
          })
          .catch(e => {
          });
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
          url: "/markdownFile/getAllTags",
          method: "POST",
          headers: {
            token: true
          },
        })
            .then(res => {
              this.alertMessage(res.message);
              this.tagList = res.result;
            })
            .catch(e => {
              this.alertMessage(e);
            });
      }
    }
  }
};
</script>

<style scoped lang="less">
</style>
