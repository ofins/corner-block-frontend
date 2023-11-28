import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const showSideBar = ref<boolean>(false)

  const setShowSideBar = (payload: boolean) => {
    showSideBar.value = payload
  }

  return { showSideBar, setShowSideBar }
})
