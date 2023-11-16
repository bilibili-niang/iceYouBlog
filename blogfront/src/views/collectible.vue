<script setup>
import CollectibleCard from "@/components/collectible/card/index.vue";

let imgList = [{
  img: "/collectible/ding.png"
}];

</script>

<template>
  <div class="collectible">
    <ice-column>
      <ice-row class="cardContainer">
        <template v-for="(item,index) in imgList" :key="index">
          <collectibleCard :item="item"></collectibleCard>


        </template>

      </ice-row>


    </ice-column>
  </div>
</template>

<style scoped lang="less">
.collectible{
  max-width: 75vw;
  box-sizing: border-box;
  margin: 0 auto;

  .cardContainer{
    box-sizing: border-box;
  }
}
</style>