<template>
  <div class="indexCard hover" id="element">
    <div class="imgLim">
      <!--      <img :src="item.headImg" alt="">-->
      <el-image :src="item.headImg" lazy fit="fit">
        <!--加载失败:-->
        <template #error>
          <el-image src="/images/headImg/defaultHeadImg.png" lazy fit="fit"/>
        </template>
      </el-image>
    </div>
    <div class="card-body">
      <el-text tag="b" size="large">
        <h5>{{ item.title }}</h5>
      </el-text>
      <el-text>{{ item.createdAt }}</el-text>
      <el-text>{{ item.description }}</el-text>
      <!--goToDetail-->
      <div class="bottomLim">
        <span>
          <el-button round @click="goToRead(item.id)">read</el-button>
        </span>
        <el-divider direction="vertical"/>
        <span @click="support(item.id)">
          <el-button round circle>赞</el-button>
           <el-text>
            {{ item.praise }}
          </el-text>
        </span>
        <el-divider direction="vertical"/>
        <span>
          <el-button round>view</el-button>
          <el-text>
            {{ item.view }}
          </el-text>
        </span>
        <el-divider direction="vertical"/>
        <span>
          <el-button round>id</el-button>
           <el-text>
            {{ item.id }}
          </el-text>
        </span>
        <el-divider direction="vertical"/>
        <span class="tags">
            <markdownTags :tag="item.tag1" :click="true" v-if="item.tag1"></markdownTags>
            <markdownTags :tag="item.tag2" :click="true" v-if="item.tag2"></markdownTags>
            <markdownTags :tag="item.tag3" :click="true" v-if="item.tag3"></markdownTags>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import MarkdownTags from "@/components/common/MarkdownTags.vue";
import timeFormat from "@/common/filter/time";
import http from "@/common/api/request";
import {ElMessage} from "element-plus";
import {h} from "vue";

export default {
  name: "indexCard",
  components: {MarkdownTags},
  props: {
    item: {}
  },
  mounted() {
    // 倍数
    // 妈的不好用,太抖了
    /*const multiple = 15;
    document.querySelectorAll(".indexCard").forEach(item => {
      item.addEventListener("mousemove", function (e) {
        // console.log(e.layerX, e.layerY)
        let box = item.getBoundingClientRect();
        // console.log(`box`)
        // console.log(box);
        let calcX = (e.clientY - box.y - (box.height / 2)) / multiple * -1;
        let calcY = (e.clientX - box.x - (box.width / 2)) / multiple * -1;
        item.style.transform = "rotateX(" + calcX + "deg) " + "rotateY(" + calcY + "deg)";
        console.log("calcX:")
        console.log(calcX)
      })
    })*/

  },
  methods: {
    alertMessage(title, sub, color) {
      const useColor = color || 'red';
      ElMessage({
        message: h('p', null, [
          h('span', null, title),
          h('i', {style: `color: ${useColor}`}, sub),
        ]),
      })
    },
    // 赞
    async support(id) {
      const res = await http.$axios({
        url: '/home/support',
        method: 'POST',
        data: {
          id
        },
        headers: {
          token: true
        }
      });
      this.alertMessage(res.message);
      this.item.praise++;
    },
    // 跳转阅读
    goToRead(id) {
      const routeUrl = this.$router.resolve({
        path: "/read",
        query: {id}
      });
      window.open(routeUrl.href, '_blank');
    },
  },
  watch: {
    item(newVal) {
      // @date 2023/5/5 , @author icestone
      // TODO 分页数据更改时数据会更改,再次格式化时间
      this.item.createdAt = timeFormat.timeFormat(newVal.createdAt) || '';
    }
  },
  created() {
    // @date 2023/5/5 , @author icestone
    // TODO 第一次创建子组件并接收到值时需要格式化下时间
    this.item.createdAt = timeFormat.timeFormat(this.item.createdAt) || '';
  },
}
</script>

<style scoped lang="less">
.indexCard {
  position: relative;
  display: flex;
  width: 100%;
  overflow: hidden;
  border-radius: .3rem;
  @media (max-width: 1200px) {

    .card-body {
      margin-left: 0 !important;
    }

    .imgLim {
      width: 100% !important;
      height: 100%;

      img {
        opacity: .5;
      }
    }
  }

  &:hover {
    .imgLim {
      filter: blur(1rem);
      width: 100% !important;
    }

    .card-body {
      //margin-left: 20% !important;
      //margin-right: 20%;
      //background: rgb(255, 255, 255, .1);

      background: rgba(255, 255, 255, .7);
      border-radius: .5rem !important;
      color: #ffffff;
    }
  }

  .imgLim {
    z-index: -1;
    position: absolute;
    transition: .5s;
    top: 0;
    left: 0;
    width: 40%;
    overflow: hidden;

    img {
      display: flex;
      width: 100%;
      height: 100%;
    }
  }

  .card-body {
    border-radius: 0;
    transition: .5s;
    margin-left: 40%;
    padding-top: 0.35rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background: rgba(255, 255, 255, 0);

    .bottomLim {
      display: flex;
      align-items: center;
      flex-wrap: wrap;

      span {
        display: flex;
        align-items: center;
      }
    }
  }
}

</style>
