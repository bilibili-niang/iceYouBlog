<template>
  <el-button text @click="dialogTableVisible = true">
    保存草稿
  </el-button>

  <!-- Form -->
  <el-button text @click="dialogFormVisible = true">
    发布
  </el-button>

  <el-dialog v-model="dialogFormVisible" title="发布文章">
    <el-form :model="form">
      <el-form-item label="文章摘要">
        <el-input v-model="form.name" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="文章tag:">
        <el-input v-model="form.tag1"/>
        <el-input v-model="form.tag2"/>
        <el-input v-model="form.tag3"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="subMitForm()">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import {reactive, ref} from 'vue'

const dialogTableVisible = ref(false)
const form = reactive({
  name: '',
  type: [],
  // 文章描述
  desc: '',
  tag1: '',
  tag2: '',
  tag3: ''
})

function subMitForm() {
  this.dialogFormVisible = false
  console.log(this.form)
}

</script>
<style scoped>
.el-button--text {
  margin-right: 15px;
}

.el-select {
  width: 300px;
}

.el-input {
  width: 300px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>