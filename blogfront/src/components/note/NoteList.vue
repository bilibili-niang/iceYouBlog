<template>
  <div class="noteList">
<!--<code>
      {{ noteData.allowView }}
      {{ Boolean(noteData.allowView) }}
    </code>-->
    <div class="btns">
      <el-button @click="drawer = true">check all</el-button>
      <el-input class="m-r" v-model="noteData.note_title" placeholder="Please input"/>
      <el-button @click="showDrawer = true">share</el-button>
      <el-text v-if="noteData.allowView">公开分享</el-text>
      <el-text v-else>没有公开分享</el-text>

      <el-button @click="goToShareLink(noteData.id)" v-if="noteData.allowView">check share link
      </el-button>

      <el-select v-model="value" placeholder="Select">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>

    </div>
    <el-drawer v-model="showDrawer" title="是否分享你的笔记" size="50%">
      <div>
        noteData:
        { "id": 6, "note_title": "面试说的话", "allowView": 0, "content": "> type your first title!", "cover":
        "/images/cover/1.png", "icon": "/images/icon/default.png", "allowComment": 0, "allowEditUserList": null }
        <br>
        {{ noteData }}

        <el-button :@click="shareNoteById(noteData.id)">share</el-button>
      </div>
    </el-drawer>

    <el-drawer v-model="drawer" size="25%" direction="ltr" title="I am the title" :with-header="false">
      <el-text>my note list</el-text>
      <div class="left noteLim">
        <div class="newNote">
          <el-input v-model="title" placeholder="新建一个"/>
          <el-button @click="submitNewNote()">
            提交
          </el-button>
        </div>
        <el-divider/>
        <div class="noteListLim">
          <ul class="list-group list-group-flush">
            <li class="list-group-item" v-for="(item,index) in notesList" :key="index">
              <NoteListItem :item="item" :showNote="getItemId"></NoteListItem>
            </li>
          </ul>
        </div>
      </div>
    </el-drawer>
    <!--笔记的填充区域-->
    <div class="right noteLim" v-if="showRight">
      <v-md-editor
          :include-level="[3,4]"
          @save="saveNote"
          v-model="noteData.content"
          :disabled-menus="[]"
          :mode="value"
      ></v-md-editor>
    </div>
    <div class="imageLim">
      <div class="cover"
           v-bind:style="{backgroundImage:'url(' + noteData.cover + ')',backgroundRepeat:'no-repeat'}">
      </div>
    </div>
  </div>
</template>

<script>
import http from '../../common/api/request'
import { h } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import NoteListItem from "@/components/note/NoteListItem.vue"

export default {
  name: "noteList",
  components: { NoteListItem },
  data () {
    return {
      notesList: [],
      title: '',
      noteData: {},
      showRight: false,
      // 当前被点击的id
      nowId: '',
      drawer: false,
      // 分享的弹窗
      showDrawer: false,
      value: 'preview',
      options: [
        {
          value: 'edit',
          label: 'edit',
        },
        {
          value: 'editable',
          label: 'editable',
        },
        {
          value: 'preview',
          label: 'preview',
        }
      ]
    }
  },
  created () {
    this.initNotesList()
  },
  methods: {
    /* @author icestone , 20:24
     * @date 2023/5/16
     * 前往分享链接
    */
    goToShareLink (id) {
      console.log(`分享id:${ id }`)
    },
    /* @author icestone , 21:31
     * @date 2023/5/15
     * 点击设置分享权限该文章
    */
    shareNoteById (id) {
      console.log(`将要分享的id:${ id }`)
      http.$axios({
        url: '/note/publicNote',
        method: 'POST',
        headers: {
          token: true
        },
        data: {
          id,
        }
      }).then(res => {
        this.alertMessage(res.message)
      })
          .catch(e => {
            this.alertMessage(e)
          })

    },
    // 提交二级笔记的service
    submitChildrenNote (title, fatherId) {
      http.$axios({
        url: '/'
      })
    },
    // 添加子笔记
    addNewChildrenNote (obj) {
      console.log('---addNewChildrenNote---')
      console.log("obj;")
      console.log(obj)
      ElMessageBox.prompt(`将会在 ${ obj.note_title } 下新建笔记`, '新建一个笔记', {
        confirmButtonText: '就这个了',
        cancelButtonText: '算了',
        inputPattern: /[\u4e00-\u9fa5_a-zA-Z0-9_]{4,10}/,
        inputErrorMessage: '只能是数字,字母,特殊字符',
        inputValidator: (val) => {
          return true
        }
      })
          .then(({ value }) => {
            // 通过value和id新建二级笔记
            const { id: fatherId } = obj
            console.log(fatherId)
            this.submitChildrenNote(value, fatherId)
            ElMessage({
              type: 'success',
              message: `Your email is:${ value }`,
            })
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: 'Input canceled',
            })
          })
    },
    alertMessage (title, sub, color) {
      const useColor = color || 'red'
      ElMessage({
        message: h('p', null, [
          h('span', null, title),
          h('i', { style: `color: ${ useColor }` }, sub),
        ]),
        grouping: true,
      })
    },
    getItemId (id) {
      this.showNote(id)
    },
    // 检测在按下ctrl+s时进行保存
    saveNote () {
      console.log('this.noteData')
      console.log(this.noteData)
      http.$axios({
        url: '/note/saveNote',
        method: 'POST',
        headers: {
          token: true
        },
        data: {
          id: this.noteData.id,
          data: this.noteData
        }
      })
          .then(res => {
            console.log(res.message)
            this.initNotesList()
            this.alertMessage(res.message, 'success', '#a1c4fd')
          })
          .catch(e => {
            console.log('失败')
            console.log(e)
          })
    },
    async handleEvent (event) {
      switch (event.keyCode) {
        case 83:
          event.preventDefault()
          // 阻止直接保存网页
          event.returnValue = false
          this.saveNote()
          break
      }
    },
    // 点击显示该笔记的内容
    showNote (id) {
      this.nowId = id
      http.$axios({
        url: '/note/getNote',
        method: 'POST',
        headers: {
          token: true
        },
        data: {
          id
        }
      })
          .then(res => {
            if (res.success) {
              /* @author icestone , 17:20
               * @date 2023/5/15
               * 如果content为null,v-md-editor会报错,这里判断一下
              */
              if (res.result.content == null) {
                res.result.content = `> type your first title!`
                this.noteData = res.result
              } else {
                this.noteData = res.result
              }
            } else {
              console.log('笔记获取失败')
            }
          })
          .catch(e => {
            console.log(e)
          })

    },
    // 提交新建的文章
    submitNewNote () {
      console.log('submitNewNote')
      http.$axios({
        url: "/note/addNote",
        method: 'POST',
        headers: {
          token: true
        },
        data: {
          note_title: this.title
        }
      })
          .then(res => {
            console.log("res:")
            console.log(res)
            if (res.success) {
              // 成功
              this.initNotesList()
              this.title = ''
            }
          })
          .catch(e => {
            console.log("e:")
            console.log(e)
          })

    },
    initNotesList () {
      http.$axios({
        url: '/note/allNotes',
        method: 'POST',
        headers: {
          token: true
        },
      })
          .then(res => {
            console.log("res.result:")
            console.log(res.result)
            console.log(res.result.length)
            if (res.success & res.result.length != 0) {
              this.showRight = true
              this.notesList = res.result
              // 如果存在id,那么获取一下第一篇note的数据
              if (this.notesList[0].id) {
                if (this.nowId) {
                  this.showNote(this.nowId)
                } else {
                  this.showNote(this.notesList[0].id)
                }
              }
            } else {
              this.alertMessage(res.message, '数据渲染失败咯', '#a1c4fd')
              this.showRight = false
            }
          })
    }
  },
  mounted () {
    window.addEventListener('keydown', this.handleEvent)
  },
  beforeDestroy () {
    window.removeEventListener('keydown', this.handleEvent) // 在页面销毁的时候记得解除
  }
}
</script>
<style scoped lang="less">
.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.noteList {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .btns {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    margin-bottom: 0.5rem;

    div.el-input {
      max-width: 13rem;
    }

    button {
      margin-right: .3rem;
    }
  }

  // 左侧展开的列表
  :deep .el-drawer__body {
    padding: .3rem;

  }

  .noteLim {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .left {
    width: 100%;
    display: flex;
    padding: 0;

    .newNote {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;

      button {
        margin-left: 0.5rem;
      }
    }

    .noteListLim {
      display: flex;
      flex-direction: column;
      width: 100%;

      .list-group {
        .list-group-item {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          margin: 0.2rem;
          border-radius: 0.5rem;
          padding: 0.5rem;
          transition: 0.2s;

          &:hover {
            background: rgba(142, 197, 252, 0.5);
          }

          .iconList {
            button {
              font-size: 1.3rem;
            }
          }

          .title {
            width: 5rem;
            display: flex;
            height: 100%;
            align-items: center;
            flex: 1;
            justify-content: center;
            white-space: nowrap;
          }
        }
      }
    }
  }

  .right {
    display: flex;
    width: 100%;
    margin-bottom: 3rem;

    .v-md-editor {
      min-height: 85vh;
    }
  }

  .imageLim {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    opacity: 0;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;

    .cover {
      display: flex;
      width: 100%;
      height: 100%;
      background-size: cover;
      filter: blur(0.1rem);
    }
  }
}
</style>
