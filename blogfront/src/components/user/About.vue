<template>
  <div class="about container">
    <UserCard :user="user"></UserCard>
    <div class="article" v-if="true">
      <ice-text>所有文章</ice-text>
      <div v-for="(item,index) in markdownFile"
           :key="index">
        <IndexCard :item="item"></IndexCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useRoute} from "vue-router";
import userApi from "@/api/user";
import {ref} from "vue";
import UserCard from "@/components/common/UserCard.vue";
import IndexCard from "@/components/index/IndexCard.vue";

const route = useRoute();
let user = ref({});
let markdownFile = ref({});

const initData = async () => {
  const email = route.query?.email || "admin";
  const res = await userApi.getUserInfoByEmail({
    email,
    type: "all"
  });
  user.value = res.result || null;
  await userApi.getUserAllMarkdownByEmail({
    email
  })
      .then(res => {
        if (res.success) {
          markdownFile.value = res.result;
        }
      })
      .catch(e => {
        console.log("e:");
        console.log(e);
      });
};
initData();
</script>
