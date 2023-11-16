<template>
  <div class="demo-type" @click="goDetail(email)" v-if="allowClick">
    <div class="left">
      <ice-avatar :src="imgUrl" class="shadow"/>
    </div>
  </div>
  <div class="demo-type" :@click="allowClick? null: goDetail(email)" v-else>
    <div class="left">
      <ice-avatar :src="imgUrl" class="shadow"/>
    </div>
  </div>
</template>

<script setup>
import {useRouter} from "vue-router";

const router = useRouter();
const props = defineProps({
  email: {
    type: String,
    request: true,
  },
  imgUrl: String,
  allowClick: {
    type: Boolean,
    default: true
  }
});
const goDetail = email => {
  if (props.allowClick) {
    const routeUrl = router.resolve({
      path: "/user/about",
      query: {email}
    });
    window.open(routeUrl.href, "_blank");
  }
};
</script>
<style scoped lang="less">
.demo-type{
  margin: .3rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.demo-type div span{
  display: flex;
  width: 3rem;
  height: 3rem;
  transition: 0.5s;
  border-radius: 50%;

  :deep img{
    width: 100%;
    height: 100%;
    min-width: 2rem;
    min-height: 2rem;
  }
}
</style>
