//md渲染组件
<script setup lang="ts">
import { MdPreview, MdCatalog } from 'md-editor-v3'
import 'md-editor-v3/lib/preview.css'
import { PropType, ref } from 'vue'

const id = 'preview-only'
const scrollElementRef = ref<HTMLElement | null>(null)

const props = defineProps({
  includeLevel: {
    type: Array,
    default: () => [3, 4],
  },
  content: {
    type: String,
    default: '',
  },
  mode: {
    type: String,
    default: 'preview',
  },
  copyCodeSuccess: {
    type: Function,
    default: () => {
    },
  },
  theme: {
    type: String as PropType<'light' | 'dark'>,
    default: 'light',
  },
  previewTheme: {
    type: String as PropType<'default' | 'github' | 'vuepress' | 'mk-cute' | 'smart-blue' | 'cyanosis'>,
    default: 'cyanosis'
  }
})

</script>
<template>
  <div class="mdRender">
    <MdPreview
        :editorId="id"
        :modelValue="content"
        v-if="!!content"
        :theme="theme"
        :previewTheme="previewTheme"
    />
    <!-- 使用 ref 获取元素 -->
    <div ref="scrollElementRef"></div>
    <MdCatalog :editorId="id" :scrollElement="scrollElementRef"/>
  </div>
</template>