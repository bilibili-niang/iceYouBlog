<template>
  <div class="codeClips container">
    <codeSearch></codeSearch>
    <InputCard v-if="userInfoStore.loginStatus"></InputCard>
    <div class="cardsLim">
      <div class="codeZoomCard" v-if="showZoomCard">
        <el-button @click="showZoomCard=false">close</el-button>
        <ZoomCard :item="nowItem[0]"></ZoomCard>
      </div>
      <ul v-else class="list-group list-group-flush" v-for="(item,index) in codeList" :key="index">
        <IndexCard :item="item" :zoomFun="zoom"></IndexCard>
      </ul>
    </div>
  </div>
</template>

<script>
import InputCard from '@/components/code/InputCard.vue'
import http from '@/common/api/request'
import { ElMessage } from 'element-plus'
import { h } from 'vue'
import IndexCard from '@/components/code/IndexCard.vue'
import ZoomCard from "@/components/code/ZoomCard.vue"
import CodeSearch from '@/components/code/codeSearch.vue'

export default {
  name: "CodeIndex",
  data () {
    return {
      codeList: [],
      showDelFlag: false,
      showZoomCard: false,
      nowItem: {},
    }
  },
  computed: {
    userInfoStore () {
      return this.$store.state.user
    }
  },
  components: { CodeSearch, ZoomCard, InputCard, IndexCard },
  methods: {
    /* @author icestone , 23:54
     * @date 2023/5/19
     * 代码card放大看看
    */
    zoom (val) {
      console.log(val)
      this.showZoomCard = true
      console.log(this.codeList)
      this.nowItem = this.codeList.filter(item => {
        return item.id == val
      })


    },
    alertMessage (title, sub, color) {
      const useColor = color || 'red'
      ElMessage({
        message: h('p', null, [
          h('span', null, title),
          h('i', { style: `color: ${ useColor }` }, sub),
        ]),
      })
    },

    async initCodeClips () {
      // 发起请求
      await http.$axios({
        url: '/code/getCodeClips',
        method: 'GET'
      }).then(res => {
        this.alertMessage(res.message)
        if (res.success) {
          this.historyList = res.result
          this.codeList = res.result
        } else {
        }
      })
          .catch(e => {
            this.alertMessage(e)
          })
    }
  },
  created () {
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
