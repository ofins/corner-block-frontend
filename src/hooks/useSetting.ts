import { ref } from 'vue'
import { getGeneralSetting } from '@/util/cookie'

export const generalSetting = ref({
  showTotalValue: true
})

export const fetchGeneralSetting = () => {
  generalSetting.value = getGeneralSetting()
  console.log(generalSetting.value)
}
