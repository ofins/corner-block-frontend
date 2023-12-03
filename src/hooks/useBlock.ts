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
  const TICKER_NAME = 'ticker'

  const updateAllTickers = (fetchedTickers: any) => {
    for (const key in fetchedTickers) {
      if (fetchedTickers.hasOwnProperty(key)) {
        for (const item of tickerList.value) {
          if (item.ticker === key) {
            item.price = fetchedTickers[key]['usd']
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

  const changeTickerListIntoStrings = (list: any) => {
    return list
      .filter((item: any) => item.ticker)
      .map((item: any) => item.ticker)
      .join(',')
  }

  const getTickerPropertyBySlot = (slot: number, key) => {
    const ticker = tickerList.value.find((item) => item.tickerSlot === slot)
    if (ticker) {
      return ticker[key]
    }
  }

  const editTickerListProperty = (slot: number, targetKey: string, value: any) => {
    tickerList.value.forEach((item) => {
      if (item.tickerSlot === slot) {
        item[targetKey] = value
      } else {
        return item
      }
    })
  }

  const getTickerDetailBySlot = (slot: number): Promise<any> => {
    return fetchTickerDetailByName(getTickerPropertyBySlot(slot, TICKER_NAME))
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
    changeTickerListIntoStrings,
    handleToggleBlockDetail,
    updateAllTickers,
    editTickerListProperty
  }
}
