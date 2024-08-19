<template>
  <div class="lim" v-loading="loading">
    <div class="btns">
      <div class="selection">
        <el-select v-model="registerValue" placeholder="Select">
          <el-option v-for="item in registerFlag" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </div>
      <el-text>
        选择一个想要查看的数据库
      </el-text>
      <div class="selection">
        <el-select v-model="tableValue" placeholder="Select">
          <el-option v-for="item in table" :key="item" :label="item" :value="item"/>
        </el-select>
      </div>
      <div class="btns" v-if="tableValue">
        <el-text>
          当前选择的value: {{ tableValue }}
        </el-text>
        <div class="selection-item" v-if="databaseDetail.totalData">
          <el-text>当前所选数据库有{{ databaseDetail.totalData[0].length }}条数据</el-text>
        </div>

        <el-button roun @click="backup">备份</el-button>


      </div>
      <div class="allData" v-if="tableValue">
        <el-text>所有数据:</el-text>
        <div class="markdownfiles" v-if="tableValue == 'markdownfiles'">
          <template v-for="(item) in databaseDetail.totalData[0]">
            <markdownCard :item="item"></markdownCard>
          </template>
        </div>

        <div class="markdown_histories" v-else-if="tableValue == 'markdown_histories'">
          <template v-for="(item) in databaseDetail.totalData[0]">
            <historyIndexCard :item="item"></historyIndexCard>
          </template>
        </div>

        <div class="others" v-else>
          <code v-if="databaseDetail.totalData">
            {{ databaseDetail.totalData[0] }}
          </code>
          <!-- <template v-for="(item) in databaseDetail.totalData[0]">
            <el-text>
              {{ item }}
            </el-text>
          </template> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, watch} from 'vue'
import admin from '@/api/admin'
import {useStore} from 'vuex'
import {reactive} from 'vue'
import historyIndexCard from '@/components/user/HistoryIndexCard.vue'
import markdownCard from '@/components/admin/config/markdownCard.vue'
import {fun} from '../../hook/function'

const registerValue = ref('')
const registerFlag = [
  {
    value: '1',
    label: '开启注册',
  },
  {
    value: '0',
    label: '关闭注册',
  },
]
const loading = ref(false)
const table = ref()
// 选中数据库后该数据库的具体信息
let databaseDetail = reactive({
  totalData: ''
})
let tableValue = ref()
watch(registerValue, async () => {
  loading.value = true
  const res = await admin.postConfig({
    registerFlag: registerValue.value
  })
  loading.value = false
  if (res.success) {
    fun.alert(res.message)
  }
})
watch(tableValue, async () => {
  loading.value = true
  const res = await admin.postConfig({
    table: tableValue.value
  })
  databaseDetail = res.result;
  loading.value = false
})
const store = useStore()
const initConfig = async () => {
  // 获取是否 开启注册
  registerValue.value = store.state.config.registerFlag
  // 获取所有的数据库
  const res = await admin.getDatabases()
  table.value = res.result.tables
  fun.alert(res.message)
}

const backup = async () => {
  const res = await admin.postConfig({
    backupTable: tableValue.value
  })
  fun.alert(res.message)
}

initConfig()
</script>

<style scoped lang="less">
.lim {
  display: flex;
  flex-direction: column;

  .btns {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .el-text {
      width: 100%;
    }
  }

  .selection {
    display: flex;
    flex-direction: column;
  }
}
</style>
