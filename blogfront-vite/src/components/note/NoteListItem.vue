<template>
  <div class="noteListItem">
    <el-row>
      <el-col :span="4">
        <div class="icon"><img :src="item.icon" alt=""></div>
      </el-col>
      <el-col :span="20">
        <el-text truncated @click="showNote(item.id)" class="hvr-shadow">{{ item.note_title }}</el-text>
      </el-col>
    </el-row>

    <el-row class="iconList">

      <el-col :span="4">
        <!--点击展开子目录-->
        <el-button link>
          <el-icon>
            <ArrowRight/>
          </el-icon>
        </el-button>
      </el-col>

      <el-col :span="4">
        <el-button link>
          <el-icon>
            <More/>
          </el-icon>
        </el-button>
      </el-col>

      <el-col :span="4">

        <!--添加子笔记的按钮-->
        <el-button link @click="addNewChildrenNote(item)">
          <el-icon>
            <Plus/>
          </el-icon>
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "NoteListItem",
  props: {
    item: {
      type: Object
    },
    showNote: {
      type: Function,
      default: () => {
      },
    }
  },
  data() {

  },
  methods: {
    addNewChildrenNote(item) {
      console.log("addNewChildrenNote")
      console.log(item)
    },
  }
}
</script>

<style scoped lang="less">
.noteListItem {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;

  .el-row {
    display: flex;
    width: 100%;

    .el-col {
      display: flex;
      align-items: center;
    }
  }

  .icon {
    img {
      display: flex;
      width: 1.5rem;
      height: 1.5rem;
    }
  }
}
</style>