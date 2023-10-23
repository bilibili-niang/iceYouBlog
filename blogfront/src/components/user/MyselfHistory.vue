<template>
  <div class="myselfHistory container">
    <div class="card" v-for="(item,index) in historyList"
         :key="index">
      <indexCard :item="item"></indexCard>
    </div>
  </div>
</template>

<script>
import http from "@/common/api/request";
import IndexCard from "@/components/index/IndexCard.vue";

export default {
  name: "MyselfHistory",
  components: {IndexCard},
  data() {
    return {
      historyList: [],
    };
  },
  methods: {
    goToRead(id) {
      const routeUrl = this.$router.resolve({
        path: "/read",
        query: {id}
      });
      window.open(routeUrl.href, "_blank");
    },
    // 获取用户历史留言记录
    async initHistory(tab, event) {
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
      }).then(res => {
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
    },
  },
  created() {
    this.initHistory();
  }
};
</script>

<style scoped lang="less">
.myselfHistory {
  padding-top: 3rem;
  padding-bottom: 3rem;
}

.card {
  margin-bottom: 1rem;
}
</style>