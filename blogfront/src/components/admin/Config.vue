<template>
  <div class="lim">
    <div class="btns">
      <el-select v-model="registerValue" placeholder="Select">
        <el-option
            v-for="item in registerFlag"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
    </div>

  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import admin from '@/common/api/admin'
import { useStore } from 'vuex'

const fun = require('@/hook/function')

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
watch(registerValue, async () => {

  const res = await admin.postConfig({
    registerFlag: registerValue.value
  })
  console.log('值改变了')
  console.log(res)
  if (res.success) {
    fun.alert(res.message)
  }
})
const store = useStore()
const initConfig = () => {
  registerValue.value = store.state.config.registerFlag
}
initConfig()

</script>

<style scoped lang="less">
.lim {
  display: flex;
  flex-direction: column;
}
</style>
