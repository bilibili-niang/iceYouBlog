import { defineComponent, ref } from 'vue'
import { iceButton } from 'icepro'
import { storeToRefs } from 'pinia'
import { themeStore } from '@stores/config.ts'

// 使用具名导出而不是默认导出
export default defineComponent({
  name: 'Header',
  setup() {
    const store = themeStore()

    const { isDark } = storeToRefs(store)

    const { changeTheme } = store

    const change = ref()

    const handleClick = () => {
      change.value?.()
      console.log('改变主题')
    }

    return () => (
      <div class='index-header'>
        <iceButton onClick={changeTheme}>change</iceButton>
        <iceText>我是一个头</iceText>
      </div>
    )
  }
})
