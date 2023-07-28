<template>
  <div class="codeClips container">
    <codeSearch></codeSearch>
    <InputCard v-if="userInfoStore.loginStatus"></InputCard>
    <div class="cardsLim">
      <div class="codeZoomCard" v-if="showZoomCard">
        <el-button @click="showZoomCard = false">close</el-button>
        <ZoomCard :item="nowItem[0]"></ZoomCard>
      </div>
      <ul v-else class="list-group list-group-flush">
        <div class="lim" v-for="(item, index) in codeList" :key="index">
          <IndexCard :item="item" :zoomFun="zoom"></IndexCard>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import InputCard from '@/components/code/InputCard.vue'
import IndexCard from '@/components/code/IndexCard.vue'
import ZoomCard from "@/components/code/ZoomCard.vue"
import CodeSearch from '@/components/code/codeSearch.vue'
import fun from '@/hook/function'
import markdownFiles from '@/common/api/markdownFiles'

export default {
  name: "CodeIndex",
  data() {
    return {
      codeList: [],
      showDelFlag: false,
      showZoomCard: false,
      nowItem: {},
    }
  },
  computed: {
    userInfoStore() {
      return this.$store.state.user
    }
  },
  components: { CodeSearch, ZoomCard, InputCard, IndexCard },
  methods: {
    /* @author icestone , 23:54
     * @date 2023/5/19
     * 代码card放大看看
    */
    zoom(val) {
      console.log(val)
      this.showZoomCard = true
      console.log(this.codeList)
      this.nowItem = this.codeList.filter(item => {
        return item.id == val
      })
    },
    async initCodeClips() {
      // 发起请求
      const res = await markdownFiles.getCodeClipsList()
      fun.alert(res.message, 'success:' + res.success)

      this.historyList = res.result
      this.codeList = res.result

      // await http.$axios({
      //   url: '/code/getCodeClips',
      //   method: 'GET'
      // }).then(res => {
      //   fun.alert(res.message)
      //   if (res.success) {
      //     this.historyList = res.result
      //     this.codeList = res.result
      //   } else {
      //   }
      // })
    }
  },
  created() {
    this.initCodeClips()
  }
}
</script>

<style scoped lang="less">
.codeClips {
  padding-bottom: 3rem;

  .cardsLim {
    padding-top: .3rem;

    .list-group {
      animation: fadeIn .3s;
      background: none;

      .lim {
        display: flex;
        width: 100%;
      }

      .list-group-item {
        border-radius: 0.5rem;
        margin-bottom: 1rem;

        .text {
          //background-image: linear-gradient(to right bottom, #a8edea 0%, #fed6e3 100%);
          background-image: linear-gradient(to right bottom, #f5f7fa 0%, #c3cfe2 100%);
          padding: 0.5rem;
          border-radius: 0.3rem;
          margin-top: 1rem;
          margin-bottom: 1rem;

        }

        span {
          button {
            margin-right: 0.3rem;
          }
        }

        .tags {
          margin-bottom: 0.3rem;
          margin-top: 0.3rem;
        }
      }
    }
  }

  .codeZoomCard {
    animation: fadeIn .3s;
  }

}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
