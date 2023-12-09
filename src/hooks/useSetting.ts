import { ref } from 'vue'
import { getGeneralSetting, setGeneralSetting } from '@/util/cookie'

export const generalSetting = ref({
  showTotalValue: false
})

export const fetchGeneralSetting = () => {
  const data = getGeneralSetting()
  if (data) generalSetting.value = data
  else setGeneralSetting(generalSetting.value)
}
