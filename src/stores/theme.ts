import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

const useThemeStore = defineStore('theme', () => {
  const theme = ref(JSON.parse(localStorage.getItem('theme') || 'light'))

  function updateTheme(modeState: 'light' | 'dark') {
    theme.value = modeState
  }

  watch(theme, (state) => {
    // persist the whole state to the local storage whenever it changes
    localStorage.setItem('theme', JSON.stringify(state))
  })

  return { theme, updateTheme }
})

export default useThemeStore
