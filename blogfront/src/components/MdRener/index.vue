//md渲染组件
<script setup lang="ts">
import { MdCatalog, MdEditor, MdPreview } from 'md-editor-v3'
import 'md-editor-v3/lib/preview.css'
import { PropType, ref } from 'vue'
import 'md-editor-v3/lib/style.css'

const id = 'preview-only'
const scrollElementRef = ref<HTMLElement | null>(null)

const props = defineProps({
  includeLevel: {
    type: Array,
    default: () => [3, 4]
  },
  content: {
    type: String,
    default: ''
  },
  mode: {
    type: String as PropType<'preview' | 'edit'>,
    default: 'preview'
  },
  copyCodeSuccess: {
    type: Function,
    default: () => {}
  },
  previewTheme: {
    type: String as PropType<'default' | 'github' | 'vuepress' | 'mk-cute' | 'smart-blue' | 'cyanosis'>,
    default: 'cyanosis'
  },
  value: {
    type: String,
    default: ''
  }
})

const content = ref('')

const init = () => {
  content.value = props.content || props.value
}

init()
</script>
<template>
  <div class="mdRender">
    <MdPreview
      :editorId="id"
      :mode="props.mode"
      :modelValue="content"
      v-if="!!content && props.mode === 'preview'"
      theme="dark"
      :previewTheme="previewTheme"
    />
    <MdEditor v-if="props.mode === 'edit'" v-model="props.value" theme="dark" />
    <!-- 使用 ref 获取元素 -->
    <div ref="scrollElementRef"></div>
    <MdCatalog :editorId="id" :scrollElement="scrollElementRef" />
  </div>
</template>
