import { ref } from 'vue'
import { useTicker } from '@/hooks/useTicker'
import { defaultTickerList } from '@/settings/tickerList'

export const useTickerBlock = () => {
  const { fetchTickerDetailByName, fetchMultiTickersDetailByName } = useTicker()

  const tickerList = ref(defaultTickerList)
  const toggleBlockDetail = ref<boolean>(false)
  const tickerList_medium = ref([])
  const tickerList_small_one = ref([])
  const blockDetailData = ref()
  const currentTickerSlot = ref(0)
  const currentMainTickerSlot = ref(0)

  enum Ticker {
    Name = 'ticker',
    Symbol = 'tickerSymbol',
    Price = 'price',
    IsShowInput = 'isShowInput',
    IsBlockSelected = 'isBlockSelected',
    Slot = 'tickerSlot',
    Currency = 'usd',
    Id = 'id',
    Image = 'imageURL',
    PriceChangePercentage24h = 'priceChangePercentage24h'
  }

  const LOCAL_STORAGE_TICKERS_LIST = 'tickerList'

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

  const setAllTickersDetail = () => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise<void>(async (resolve, reject) => {
      try {
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
            item.priceChangePercentage24h = ticker.price_change_percentage_24h
          }
        })
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }

  const setAllTickerNames = (inputData: any) => {
    tickerList.value.forEach((item) => {
      const newTicker = inputData.find((input: any) => input[Ticker.Slot] === item.tickerSlot)
      if (newTicker) {
        item.id = newTicker.id ?? '-'
        item.holding = newTicker.holding ?? '-'
      }
    })
  }

  // get, set tickerList
  const getTickerPropertyBySlot = (slot: number, key: any) => {
    const ticker = returnTargetProperty(tickerList.value, Ticker.Slot, slot)
    if (ticker) return ticker[key]
  }

  const editTickerListProperty = (slot: number, targetKey: string, value: any) => {
    tickerList.value.forEach((item: any) => {
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
    currentTickerSlot.value = slot - 1

    tickerList.value.forEach((tick) => {
      if (tick.tickerSlot === slot)
        editTickerListProperty(tick.tickerSlot, Ticker.IsBlockSelected, true)
      else editTickerListProperty(tick.tickerSlot, Ticker.IsBlockSelected, false)
    })
    if (slot === currentMainTickerSlot.value) {
      currentTickerSlot.value = 0
      toggleBlockDetail.value = !toggleBlockDetail.value
    } else {
      toggleBlockDetail.value = true
      currentMainTickerSlot.value = slot
    }
    saveToLocalStorage(LOCAL_STORAGE_TICKERS_LIST, tickerList.value)
  }

  // edit table
  const submitEditTable = (dataList: any) => {
    const newEditDataList = dataList.filter((item: any) => item.id)
    setAllTickerNames(newEditDataList)
    setAllTickersDetail()
    saveToLocalStorage(LOCAL_STORAGE_TICKERS_LIST, tickerList.value)
  }

  const retrieveFromLocalStorage = (key: string) => {
    const res = localStorage.getItem(key)
    if (res) {
      console.log('Data retrieved from localStorage:')
      tickerList.value = JSON.parse(res)
    } else {
      console.log('localStorage Empty, set default list.')
      tickerList.value = defaultTickerList
      saveToLocalStorage(LOCAL_STORAGE_TICKERS_LIST, defaultTickerList)
      setAllTickersDetail()
      window.location.reload()
    }
  }

  const saveToLocalStorage = (key: string, data: any) => {
    console.log(`data saved to ${key}`)
    localStorage.setItem(key, JSON.stringify(data))
  }

  retrieveFromLocalStorage(LOCAL_STORAGE_TICKERS_LIST)
  tickerList_medium.value = tickerList.value.slice(1, 5)
  tickerList_small_one.value = tickerList.value.slice(5, 11)

  return {
    tickerList,
    tickerList_medium,
    tickerList_small_one,
    toggleBlockDetail,
    blockDetailData,
    Ticker,
    LOCAL_STORAGE_TICKERS_LIST,
    currentTickerSlot,
    compileAllTickerIdToString,
    handleToggleBlockDetail,
    setAllTickersDetail,
    editTickerListProperty,
    setAllTickerNames,
    saveToLocalStorage,
    submitEditTable
  }
}
