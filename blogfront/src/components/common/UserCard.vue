<template>
  <div class="lim">
    <ice-column>
      <Avatar :imgUrl="user.avatar" :allowClick=false></Avatar>
      <div class="card-body">
        <ice-row>
          <ice-tag>username</ice-tag>
          <ice-text>{{ user.username }}</ice-text>
        </ice-row>
        <ice-row>
          <ice-tag>email</ice-tag>
          <ice-text>{{ user.email }}</ice-text>
        </ice-row>
        <ice-row>
          <ice-tag>word</ice-tag>
          <ice-text>{{ user.word }}</ice-text>
        </ice-row>
        <ice-row>
          <ice-tag>githubUrl</ice-tag>
          <ice-text>{{ user.githubUrl }}</ice-text>
        </ice-row>
        <ice-row>
          <ice-tag>occupation</ice-tag>
          <ice-text>{{ user.occupation }}</ice-text>
        </ice-row>
      </div>
    </ice-column>
  </div>
</template>

<script setup>
import Avatar from "@/components/common/Avatar.vue";

const props = defineProps({
  user: {
    type: Object,
    required: true
  },
  allowClick: {
    type: Boolean,
    default: false
  }
});
</script>

<style scoped>

</style>
