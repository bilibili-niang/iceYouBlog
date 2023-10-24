<template>
  <div class="lim ice-column border-n m-b">
    <ice-row class="space-between">
      <ice-text>
        {{ item.title }}
      </ice-text>
      <ice-button @click="goToRead(item.id)">read</ice-button>
    </ice-row>
    <ice-column>
      <ice-text>
        {{ des }}
      </ice-text>
      <ice-text>
        <ice-link v-if="item.tag1" :href="'#/read/readTag?tag1='+item.tag1">
          {{ item.tag1 }}
        </ice-link>
        <ice-link v-if="item.tag2" :href="'#/read/readTag?tag1='+item.tag2">
          {{ item.tag2 }}
        </ice-link>
        <ice-link v-if="item.tag3" :href="'#/read/readTag?tag1='+item.tag3">
          {{ item.tag3 }}
        </ice-link>
      </ice-text>
    </ice-column>
  </div>
</template>

<script setup>
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import fun from "@/hook/function";

const props = defineProps(["item"]);
const router = useRouter();

// 跳转阅读
const goToRead = (id) => {
  router.push({
    path: "/read",
    query: {
      id
    }
  });
};

let des = ref("");
onMounted(() => {
  des.value = fun.splice(props.item.description);
});

</script>
<style scoped lang="less">
.header {
}
</style>
