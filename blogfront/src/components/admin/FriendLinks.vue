<template>
  <div class="friendLinks">
    <div class="card" v-for="(item, index) in links" :key="index">
      <el-text tag="b" size="large">{{ item.title }}</el-text>
      <div class="lim">
        <span>
          <el-button round>id</el-button>
          <el-text>
            {{ item.id }}
          </el-text>
        </span>
        <span>
          <el-button round>
            <el-link :href="item.url" target="_blank">url</el-link>
          </el-button>
          <el-text>{{ item.url }}</el-text>
        </span>
        <el-image style="width: 100px; height: 100px" :src="item.img" :fit="fit" />
      </div>
    </div>
    <!--下面添加三个空白的是为样式考虑-->
    <div class="card"></div>
    <div class="card"></div>
    <div class="card"></div>
  </div>
</template>

<script>
export default {
  name: "FriendLinks",
  props: {
    links: {}
  },
  data() {
    return {
      linkList: []
    }
  },

}
</script>

<style scoped lang="less">
.friendLinks {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow: visible;
  justify-content: space-between;

  .card {
    border: none;
    display: flex;
    max-width: 20rem;
    min-width: 30%;
    width: 30%;
    padding: .3rem;
    margin: .3rem;
    box-sizing: border-box;
    justify-content: space-between;
    background: rgba(0,0,0,.1);

    .lim {
      display: flex;
      flex-direction: column;

      span {
        margin: .3rem;
      }
    }
  }
}
</style>