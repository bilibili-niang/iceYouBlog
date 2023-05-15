<template>

</template>

<script>
import {ElMessage} from 'element-plus';
import {h} from 'vue';

export default {
  name: "ElAlert",
  props: {
    title: '',
    sub: '',
    color: ''
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
  },
  watch: {
    title(old, newVal) {
      console.log(newVal)
      this.alertMessage(newVal)
    }
  },
  created() {
    console.log('alert子组件')
  }
}
</script>

<style scoped>

</style>