<template>
  <div class="log container">
    <div v-if="notIsAdmin">
      <el-text class="mx-1">不是admin用户,无法查看</el-text>
    </div>
    <ul v-infinite-scroll="initData" class="infinite-list" style="overflow: auto">
      <li v-for="(item,index) in logList" :key="index" class="infinite-list-item">
        <div class="title">
          <pre>id</pre>
          {{ item.id }} |
          <pre>time</pre>
          {{ item.time }}
        </div>
        <br>
        <div class="detail">
          <pre>ip</pre>
          {{ item.ip }}
          <br>
          <pre>fileNameAndPath</pre>
          {{ item.fileNameAndPath }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import http from "@/common/api/request";
import {ElMessage} from "element-plus";
import {h} from "vue";

export default {
  name: "Log",
  data() {
    return {
      count: 0,
      logList: [],
      lastId: 0,
      notIsAdmin: false
    }
  },
  methods: {
    alertMessage(title, sub, color) {
      const useColor = color || 'red';
      ElMessage({
        message: h('p', null, [
          h('span', null, title),
          h('i', {style: `color: ${useColor}`}, sub),
        ]),
        grouping: true,
      })
    },
    /* @author icestone , 18:54
     * @date 2023/5/8
     * TODO 初始化一下数据
    */
    async initData() {
      const length = Object.keys(this.logList).length
      // length 为0,则为第一次进入页面
      if (length == 0) {
        // 发起请求,
        await http.$axios({
          url: '/admin/getLogs',
          method: 'POST',
          headers: {
            token: true
          }
        })
            .then(res => {
              this.logList = res.result;
              if (!res.success) {
                this.alertMessage(res.message)
                this.notIsAdmin = true;
              }
            })
            .catch(e => {
              this.alertMessage(e)
            })
      } else {
        await http.$axios({
          url: '/admin/getLogs',
          method: 'POST',
          headers: {
            token: true
          },
          data: {
            // @date 2023/5/9 , @author icestone
            // TODO 跳过的数量,这里根据 logList 的长度计算
            offset: length
          }
        })
            .then(res => {
              if (!res.success) {
                this.alertMessage(res.message)
              }
              // @date 2023/5/9 , @author icestone
              // TODO 合并对象
              this.logList.push(...res.result)
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
    },
    /* @author icestone , 14:33
     * @date 2023/5/9
     * TODO 获取log的信息,allCount之类的
    */
    getLogInfo() {

    }
  },
  created() {
    this.initData();
    this.getLogInfo();
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

    .title, .detail {
      display: flex;
      flex-direction: row;
    }
  }
}
</style>