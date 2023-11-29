import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const showSideBar = ref<boolean>(false)
  const currency = ref<string>('usd')

  const setShowSideBar = (payload: boolean) => {
    showSideBar.value = payload
  }

  const setCurrency = (payload: string) => {
    currency.value = payload
  }

  return { showSideBar, currency, setCurrency, setShowSideBar }
})
