import TheBlock from '@/components/TheBlock.vue'
import MainBlock from '@/components/MainBlock.vue'
import { onMounted, ref, computed } from 'vue'
import { useTicker } from '@/hooks/useTicker'
import { defaultTickerList } from '@/settings/tickerList'

export const useBlock = () => {
  const { fetchTickerPriceDataByName, fetchTickerDetailByName } = useTicker()

  const tickerList = ref(defaultTickerList)
  const toggleBlockDetail = ref<boolean>()
  const tickerList_medium = ref([])
  const tickerList_small_one = ref([])
  const blockDetailData = ref()

  const MAIN_SLOT = 1

  const updateAllTickers = (fetchedTickersObject: any) => {
    for (const key in fetchedTickersObject) {
      if (fetchedTickersObject.hasOwnProperty(key)) {
        for (const item of tickerList.value) {
          if (item.ticker === key) {
            item.price = fetchedTickersObject[key]['usd']
          }
        }
      }
    }
  }

  const retrieveFromLocalStorage = (dataName: string) => {
    const data = localStorage.getItem(dataName)
    if (data) {
      console.log('Data retrieved from localStorage:')
      return JSON.parse(data)
    } else {
      console.log('localStorage Empty, set default list.')
      localStorage.setItem('tickerList', JSON.stringify(tickerList.value))
      updateAllTickers(tickerList.value)
      window.location.reload()
    }
  }

  tickerList.value = retrieveFromLocalStorage('tickerList')

  tickerList_medium.value = tickerList.value.slice(1, 5)
  tickerList_small_one.value = tickerList.value.slice(5, 11)

  const handleInputNewTicker = async (value: string, tickerSlot: number) => {
    for (const item of tickerList.value) {
      if (item.tickerSlot === tickerSlot) {
        const data = await fetchTickerDetailByName(value)
        item.ticker = data.name
        item.tickerSymbol = data.symbol.toUpperCase()
        item.price = data.market_data.current_price.usd
        item.isShowInput = false
      }
    }
    localStorage.setItem('tickerList', JSON.stringify(tickerList.value))
    handleToggleBlockDetail(tickerSlot)
  }

  const handleIsShowInput = (tickerSlot: number) => {
    for (const item of tickerList.value) {
      item.isShowInput = item.tickerSlot === tickerSlot
    }
  }

  const hideAllInputs = () => {
    tickerList.value.forEach((item) => {
      item.isShowInput = false
    })
  }

  const changeTickerListIntoStrings = (list: any) => {
    return list
      .filter((item: any) => item.ticker)
      .map((item: any) => item.ticker)
      .join(',')
  }

  const getTickerDetailBySlot = (val: number): Promise<any> => {
    const ticker = tickerList.value.find((item) => item.tickerSlot === val)

    if (!ticker) {
      return Promise.reject(new Error('Ticker not found for the given slot.'))
    }

    return fetchTickerDetailByName(ticker.ticker)
      .then((data) => Promise.resolve(data))
      .catch((error) => Promise.reject(error))
  }

  const handleToggleBlockDetail = async (tickerSlot: number) => {
    console.log(tickerSlot)
    blockDetailData.value = await getTickerDetailBySlot(tickerSlot)

    tickerList.value.forEach((item) => {
      item.isBlockSelected = item.tickerSlot === tickerSlot
    })

    toggleBlockDetail.value = tickerSlot === MAIN_SLOT ? !toggleBlockDetail.value : true
  }

  return {
    tickerList,
    tickerList_medium,
    tickerList_small_one,
    toggleBlockDetail,
    blockDetailData,
    handleInputNewTicker,
    handleIsShowInput,
    hideAllInputs,
    changeTickerListIntoStrings,
    handleToggleBlockDetail,
    updateAllTickers
  }
}
