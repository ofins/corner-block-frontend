import TheBlock from '@/components/TheBlock.vue'
import MainBlock from '@/components/MainBlock.vue'
import { onMounted, ref, computed } from 'vue'
import { useTicker } from '@/hooks/useTicker'
import { defaultTickerList } from '@/settings/tickerList'

export const useTickerBlock = () => {
  const { fetchTickerPriceDataByName, fetchTickerDetailByName, fetchMultiTickersDetailByName } =
    useTicker()

  const tickerList = ref()
  const toggleBlockDetail = ref<boolean>(false)
  const tickerList_medium = ref([])
  const tickerList_small_one = ref([])
  const blockDetailData = ref()

  enum Ticker {
    Name = 'ticker',
    Symbol = 'tickerSymbol',
    Price = 'price',
    IsShowInput = 'isShowInput',
    IsBlockSelected = 'isBlockSelected',
    Slot = 'tickerSlot',
    Currency = 'usd',
    Id = 'id'
  }

  const MAIN_SLOT = 1
  const LOCAL_STORAGE_TICKERLIST = 'tickerList'

  // core
  const returnTargetProperty = (source: any, given: any, target: any) => {
    return source.find((item: any) => item[given] === target)
  }

  // setAllTicker

  const compileAllTickerIdToString = (tickerList: any) => {
    return tickerList
      .filter((item: any) => item.id)
      .map((item: any) => item.id)
      .join(',')
  }

  const setAllTickersDetail = async () => {
    const allTickersDetailList = await fetchMultiTickersDetailByName(
      compileAllTickerIdToString(tickerList.value),
      Ticker.Currency
    )

    tickerList.value.forEach((item: any) => {
      const ticker = allTickersDetailList.find((ticker: any) => ticker.id === item.id)
      if (ticker) {
        item.price = ticker.current_price
        item.tickerSymbol = ticker.symbol.toUpperCase()
        item.ticker = ticker.name
        item.imageURL = ticker.image
      }
    })
  }

  const setAllTickerNames = (inputData) => {
    tickerList.value.forEach((item) => {
      const newTicker = inputData.find((input) => input[Ticker.Slot] === item.tickerSlot)
      if (newTicker) {
        item.id = newTicker.id
        item.holding = newTicker.holding
      }
    })
  }

  // get, set tickerList
  const getTickerPropertyBySlot = (slot: number, key) => {
    const ticker = returnTargetProperty(tickerList.value, Ticker.Slot, slot)
    if (ticker) return ticker[key]
  }

  const editTickerListProperty = (slot: number, targetKey: string, value: any) => {
    tickerList.value.forEach((item) => {
      if (item.tickerSlot === slot) item[targetKey] = value
      else return item
    })
  }

  // BlockDetail

  const getTickerDetailBySlot = async (slot: number): Promise<any> => {
    return await fetchTickerDetailByName(getTickerPropertyBySlot(slot, Ticker.Id))
      .then((data) => Promise.resolve(data))
      .catch((error) => Promise.reject(error))
  }

  const handleToggleBlockDetail = async (slot: number) => {
    blockDetailData.value = await getTickerDetailBySlot(slot)

    tickerList.value.forEach((tick) => {
      if (tick.tickerSlot === slot)
        editTickerListProperty(tick.tickerSlot, Ticker.IsBlockSelected, true)
      else editTickerListProperty(tick.tickerSlot, Ticker.IsBlockSelected, false)
    })
    toggleBlockDetail.value = slot === MAIN_SLOT ? !toggleBlockDetail.value : true
    saveToLocalStorage(LOCAL_STORAGE_TICKERLIST, tickerList.value)
  }

  // edit table
  const submitEditTable = (dataList: any) => {
    const newEditDataList = dataList.filter((item: any) => item.id)
    setAllTickerNames(newEditDataList)
    setAllTickersDetail()
    saveToLocalStorage(LOCAL_STORAGE_TICKERLIST, tickerList.value)
  }

  const retrieveFromLocalStorage = (key: string) => {
    const res = localStorage.getItem(key)
    if (res) {
      console.log('Data retrieved from localStorage:')
      tickerList.value = JSON.parse(res)
    } else {
      console.log('localStorage Empty, set default list.')
      tickerList.value = defaultTickerList
      saveToLocalStorage(LOCAL_STORAGE_TICKERLIST, defaultTickerList)
      setAllTickersDetail()
      window.location.reload()
    }
  }

  const saveToLocalStorage = (key: string, data: any) => {
    console.log(`data saved to ${key}`)
    localStorage.setItem(key, JSON.stringify(data))
  }

  retrieveFromLocalStorage(LOCAL_STORAGE_TICKERLIST)
  tickerList_medium.value = tickerList.value.slice(1, 5)
  tickerList_small_one.value = tickerList.value.slice(5, 11)

  return {
    tickerList,
    tickerList_medium,
    tickerList_small_one,
    toggleBlockDetail,
    blockDetailData,
    Ticker,
    LOCAL_STORAGE_TICKERLIST,
    compileAllTickerIdToString,
    handleToggleBlockDetail,
    setAllTickersDetail,
    editTickerListProperty,
    setAllTickerNames,
    saveToLocalStorage,
    submitEditTable
  }
}
