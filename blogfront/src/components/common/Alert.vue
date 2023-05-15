<template>
  <div class="alert" v-if="show">
    <el-alert :title="msg" type="info" center show-icon/>
  </div>
</template>

<script>
export default {
  name: "Alert",
  props: ['msg', 'show'],
}
</script>

<style scoped lang="less">

.alert {
  display: flex;
  width: 300px;
  position: fixed;
  bottom: 10px;
  right: 10px;

  .alertLim {
    display: flex;
    width: 100%;
  }
}
</style>