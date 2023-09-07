import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

const useThemeStore = defineStore(
  'theme',
  () => {
    const theme = ref('light')

    function updateTheme(modeState: 'light' | 'dark') {
      theme.value = modeState
    }

    return { theme, updateTheme }
  },
  {
    persist: {
      key: 'invoice-app-theme-store'
    }
  }
)

export default useThemeStore
