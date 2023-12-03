import TheBlock from '@/components/TheBlock.vue'
import MainBlock from '@/components/MainBlock.vue'
import { onMounted, ref, computed } from 'vue'
import { useTicker } from '@/hooks/useTicker'
import { defaultTickerList } from '@/settings/tickerList'

export const useBlock = () => {
  const { fetchTickerPriceDataByName, fetchTickerDetailByName, fetchMultiTickersDetailByName } =
    useTicker()

  const tickerList = ref()
  const toggleBlockDetail = ref<boolean>()
  const tickerList_medium = ref([])
  const tickerList_small_one = ref([])
  const blockDetailData = ref()

  const MAIN_SLOT = 1
  const TICKER_NAME = 'ticker'
  const TICKER_SYMBOL = 'tickerSymbol'
  const TICKER_PRICE = 'price'
  const TICKER_SHOWINPUT = 'isShowInput'
  const TICKER_IS_BLOCKSELECTED = 'isBlockSelected'
  const CURRENCY = 'usd'
  const LOCAL_STORAGE_TICKERLIST = 'tickerList'

  const retrieveFromLocalStorage = () => {
    const data = localStorage.getItem(LOCAL_STORAGE_TICKERLIST)
    if (data) {
      console.log('Data retrieved from localStorage:')
      tickerList.value = JSON.parse(data)
      // setAllTickersDetail()
    } else {
      console.log('localStorage Empty, set default list.')
      localStorage.setItem(LOCAL_STORAGE_TICKERLIST, JSON.stringify(defaultTickerList))
      setAllTickersDetail()
      window.location.reload()
    }
  }

  retrieveFromLocalStorage()
  tickerList_medium.value = tickerList.value.slice(1, 5)
  tickerList_small_one.value = tickerList.value.slice(5, 11)

  // setAllTicker

  const compileAllTickerNamesToString = (tickerList: any) => {
    return tickerList
      .filter((item: any) => item.ticker)
      .map((item: any) => item.ticker)
      .join(',')
  }

  const setAllTickersDetail = async () => {
    const allTickersDetailList = await fetchMultiTickersDetailByName(
      compileAllTickerNamesToString(tickerList.value),
      CURRENCY
    )

    tickerList.value.forEach((item) => {
      const ticker = allTickersDetailList.find(
        (ticker: any) => ticker.id === item.ticker.toLowerCase()
      )
      if (ticker) {
        item.price = ticker.current_price
        item.tickerSymbol = ticker.symbol.toUpperCase()
      }
    })
  }

  const setAllTickerNames = (inputData) => {
    tickerList.value.forEach((item) => {
      const newTicker = inputData.find((input) => input.tickerSlot === item.tickerSlot)
      if (newTicker) item.ticker = newTicker.ticker
    })
  }

  // get, set tickerList
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

  // BlockDetail

  const getTickerDetailBySlot = async (slot: number): Promise<any> => {
    return await fetchTickerDetailByName(getTickerPropertyBySlot(slot, TICKER_NAME))
      .then((data) => Promise.resolve(data))
      .catch((error) => Promise.reject(error))
  }

  const handleToggleBlockDetail = async (slot: number) => {
    blockDetailData.value = await getTickerDetailBySlot(slot)
    editTickerListProperty(slot, TICKER_IS_BLOCKSELECTED, true)
    toggleBlockDetail.value = slot === MAIN_SLOT ? !toggleBlockDetail.value : true
  }

  return {
    tickerList,
    tickerList_medium,
    tickerList_small_one,
    toggleBlockDetail,
    blockDetailData,
    TICKER_NAME,
    TICKER_PRICE,
    TICKER_SHOWINPUT,
    TICKER_SYMBOL,
    compileAllTickerNamesToString,
    handleToggleBlockDetail,
    setAllTickersDetail,
    editTickerListProperty,
    setAllTickerNames
  }
}
