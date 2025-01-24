import { defineStore } from 'pinia'
import { ref } from 'vue'

const themeStore = defineStore('config', () => {
  const isDark = ref(false)

  const changeTheme = () => {
    isDark.value = !isDark.value
    if (isDark.value) {
      document.querySelector('html').classList.remove('light')
      document.querySelector('html').classList.add('dark')
    } else {
      document.querySelector('html').classList.remove('dark')
      document.querySelector('html').classList.add('light')
    }
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  }

  const init = () => {
    const savedTheme = localStorage.getItem('theme')
    isDark.value = savedTheme === 'dark'
    if (isDark.value) {
      document.querySelector('html').classList.add('dark')
    } else {
      document.querySelector('html').classList.add('light')
    }
  }

  init()

  return {
    isDark,
    changeTheme
  }
})

export { themeStore }