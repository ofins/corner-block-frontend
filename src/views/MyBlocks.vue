<template>
  <div class="bg-bg-asPrimary w-full h-full py-20px" @click="hideAllInputs">
    <div class="flex-col-center">
      <div class="mb-30px">
        <span class="c-text-asPrimary headline-regular">My Blocks</span>
      </div>
      <div class="lg:flex items-center">
        <TheBlock
          :is-show-input="tickerList[0].isShowInput"
          sizeType="size-L"
          :price="tickerList[0].price"
          :ticker="tickerList[0].ticker"
          currency="usd"
          :ticker-slot="tickerList[0].tickerSlot"
          @update-ticker="handleUpdateTicker"
          @update-is-show-input="handleIsShowInput"
        />
        <div class="grid grid-cols-2 gap-10px mt-5">
          <TheBlock
            v-for="value in tickerList_medium"
            sizeType="size-M"
            :is-show-input="value.isShowInput"
            :ticker="value.ticker"
            :price="value.price"
            currency="usd"
            :key="value.tickerSlot"
            :ticker-slot="value.tickerSlot"
            @update-ticker="handleUpdateTicker"
            @update-is-show-input="handleIsShowInput"
          />
        </div>
        <div class="grid grid-cols-2 gap-10px mt-5">
          <TheBlock
            v-for="value in tickerList_small_one"
            sizeType="size-M"
            :is-show-input="value.isShowInput"
            :ticker="value.ticker"
            :price="value.price"
            currency="usd"
            :key="value.tickerSlot"
            :ticker-slot="value.tickerSlot"
            @update-ticker="handleUpdateTicker"
            @update-is-show-input="handleIsShowInput"
          />
        </div>
      </div>
      <div class="grid grid-cols-2 gap-10px mt-5">
        <TheBlock
          v-for="(value, key, index) in tickerList_small_two"
          sizeType="size-M"
          :is-show-input="value.isShowInput"
          :ticker="value.ticker"
          :price="value.price"
          currency="usd"
          :key="value.tickerSlot"
          :ticker-slot="value.tickerSlot"
          @update-ticker="handleUpdateTicker"
          @update-is-show-input="handleIsShowInput"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TheBlock from '@/components/TheBlock.vue'
import { onMounted, ref, computed } from 'vue'
import { useTicker } from '@/hooks/useTicker'

const { fetchTickerPriceDataByName } = useTicker()
const tickerList = ref([
  {
    tickerSlot: 1,
    ticker: 'ronin',
    price: 0,
    isShowInput: false
  },
  {
    tickerSlot: 2,
    ticker: 'bitcoin',
    price: 0,
    isShowInput: false
  },
  {
    tickerSlot: 3,
    ticker: 'ethereum',
    price: 0,
    isShowInput: false
  },
  {
    tickerSlot: 4,
    ticker: 'dogecoin',
    price: 0,
    isShowInput: false
  },
  {
    tickerSlot: 5,
    ticker: 'solana',
    price: 0,
    isShowInput: false
  }
])

const tickerList_medium = ref([])
const tickerList_small_one = ref([])
const tickerList_small_two = ref([])

const updateAllTickers = (fetchedTickersObject: any) => {
  for (let key in fetchedTickersObject) {
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
  }
}

tickerList.value = retrieveFromLocalStorage('tickerList')

tickerList_medium.value = tickerList.value.slice(1, 5)
tickerList_small_one.value = tickerList.value.slice(5, 9)
tickerList_small_two.value = tickerList.value.slice(9, 14)

const handleUpdateTicker = async (value: string, tickerSlot: number) => {
  for (const item of tickerList.value) {
    if (item.tickerSlot === tickerSlot) {
      const res = await fetchTickerPriceDataByName(value, 'usd')
      item.ticker = value
      item.price = res[value].usd
      item.isShowInput = false
    }
  }
  localStorage.setItem('tickerList', JSON.stringify(tickerList.value))
}

const handleIsShowInput = (tickerSlot: number) => {
  for (const item of tickerList.value) {
    item.tickerSlot === tickerSlot ? (item.isShowInput = true) : (item.isShowInput = false)
  }
}

const hideAllInputs = () => {
  for (const item of tickerList.value) {
    item.isShowInput = false
  }
}

const changeTickerListIntoStrings = (list: any) => {
  let tickerString = ''
  for (const item of list) {
    if (item.ticker) tickerString = tickerString.concat(item.ticker + ',')
  }
  return tickerString.slice(0, -1)
}

onMounted(async () => {
  const CURRENCY = 'usd'
  const allTickers = await fetchTickerPriceDataByName(
    changeTickerListIntoStrings(tickerList.value),
    CURRENCY
  )

  updateAllTickers(allTickers)
})
</script>

<style scoped></style>
