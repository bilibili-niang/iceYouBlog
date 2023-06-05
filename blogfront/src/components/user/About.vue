<template>
  <div class="about container">
{{ email }}

  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()

const email = route.query.email || '0'
console.log(`email:${email}`)


</script>

<style scoped>

</style>
