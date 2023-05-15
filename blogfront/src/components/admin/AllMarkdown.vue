<template>
  <div class="allMarkdown container">
    <div v-if="notIsAdmin">
      <el-text class="mx-1">不是admin用户,无法查看</el-text>
    </div>
    <div class="operates" v-if="!notIsAdmin">
      <el-button @click="open">删除</el-button>
    </div>
    <ul v-infinite-scroll="initData" class="infinite-list" style="overflow: auto">
      <li v-for="(item,index) in indexList" :key="index" class="infinite-list-item">
        <div class="btns">
          {{ item.checked }}
          <el-checkbox v-model="item.checked" border/>
        </div>
        <indexCard :item="item"></indexCard>

      </li>
    </ul>
  </div>
</template>

<script>
import http from "@/common/api/request";
import {ElMessage, ElMessageBox} from "element-plus";
import {h} from "vue";
import IndexCard from "@/components/user/IndexCard.vue";

export default {
  name: "AllMarkdown",
  components: {IndexCard},
  data() {
    return {
      notIsAdmin: false,
      indexList: '',
      selectedItem: [],
    }
  },
  methods: {
    /* @author icestone , 18:09
     * @date 2023/5/9
     * TODO 获取选中的item
    */
    showSelectedItem() {
      this.indexList.forEach((item, index) => {
        if (item.checked) {
          this.selectedItem.push(item.id);
        }
      })
    },
    /* @author icestone , 18:06
     * @date 2023/5/9
     * TODO 执行删除
    */
    delSelectedItems() {
      // 获取一下选中
      this.showSelectedItem();
      console.log("this.selectedItem:")
      console.log(this.selectedItem)
      http.$axios({
        url: '/admin/markdownOperate',
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
            if (res.success) {
              // 成功,重新获取数据
              this.indexList = [];
              this.initData();
            }

            this.indexList.map(item => {
              item.checked = false;
            })
          })
          .catch(e => {
            console.log("删除失败:")
            console.log(e)
          })

    },
    /* @author icestone , 18:06
     * @date 2023/5/9
     * TODO 删除所选文章,弹窗
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
          .catch((e) => {
            console.log(e)
            ElMessage({
              type: 'info',
              message: 'Delete canceled',
            })
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
    async initData() {
      const length = Object.keys(this.indexList).length;

      // length 为0,则为第一次进入页面
      if (length == 0) {
        http.$axios({
          url: '/home/'
        })
            .then(res => {
              this.indexList = res.result.rows;
            })
            .catch(e => {
              this.alertMessage(e);
            })
      } else {
        await http.$axios({
          url: '/home/',
          method: 'POST',
          headers: {
            token: true
          },
          data: {
            // @date 2023/5/9 , @author icestone
            // TODO 跳过的数量,这里根据 indexList 的长度计算
            id: length,
            limit: 20
          }
        })
            .then(res => {
              if (!res.success) {
                this.alertMessage(res.message)
              }
              // @date 2023/5/9 , @author icestone
              // TODO 合并对象
              this.indexList.push(...res.result)
              ElMessage({
                message: res.message,
                grouping: true,
                type: 'success',
              })
            })
            .catch(e => {
              this.alertMessage(e)
            })
      }


    }
  },
  created() {
    this.initData();
  }
}
</script>

<style scoped lang="less">
.infinite-list {
  display: flex;
  flex-direction: column;
  height: 90vh;
  padding: 0;
  margin: 0;
  list-style: none;

  .infinite-list-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: auto;
    background: var(--el-color-primary-light-9);
    margin: .3rem;
    color: var(--el-color-primary);
    flex-direction: column;
    position: relative;

    .btns {
      position: absolute;
      top: 0.3rem;
      right: 0.3rem;
    }

    .title, .detail {
      display: flex;
      flex-direction: row;
    }
  }
}
</style>