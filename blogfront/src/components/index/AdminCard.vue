<template>
  <div class="adminCard">
    这里放admin管理员的信息
  </div>
</template>

<script>
import http from '@/common/api/request';

export default {
  name: "AdminCard",
  data() {
    return {
      info: {}
    }
  },
  created() {
    this.getAdminInfo();
  },
  methods: {
    getAdminInfo() {
      // http.$axios({})
    }
  }

}
</script>

<style scoped>

</style>