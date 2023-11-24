<template>
  <div class="bg-bg-asPrimary w-full h-full py-20px" @click="handleBackDrop">
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
            v-for="(value, key, index) in tickerList_medium"
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
            v-for="(value, key, index) in tickerList_small_one"
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
const tickerData = ref()
const price = ref(0)
const tickerList = ref([
  {
    tickerSlot: 1,
    ticker: '',
    price: 0,
    isShowInput: false
  }
])
const tickerList_medium = ref([])
const tickerList_small_one = ref([])
const tickerList_small_two = ref([])

const retrieveFromLocalStorage = (dataName) => {
  // Retrieve data from localStorage
  const data = localStorage.getItem(dataName)
  if (data) {
    console.log('Data retrieved from localStorage:')
    return JSON.parse(data)
  } else {
    console.log('No data found in localStorage.')
  }
}

tickerList.value = retrieveFromLocalStorage('tickerList') ?? tickerList.value

tickerList_medium.value = tickerList.value.slice(1, 5)
tickerList_small_one.value = tickerList.value.slice(5, 9)
tickerList_small_two.value = tickerList.value.slice(9, 14)

const handleUpdateTicker = async (value: string, tickerSlot: number) => {
  for (const item of tickerList.value) {
    if (item.tickerSlot === tickerSlot) {
      const res = await fetchTickerPriceDataByName(value, 'usd')
      console.log(res[value].usd)
      item.ticker = value
      console.log('run')
      item.price = res[value].usd
      item.isShowInput = false
    }
  }

  console.log('before store')
  console.log(tickerList.value)

  localStorage.setItem('tickerList', JSON.stringify(tickerList.value))
  console.log(tickerList_medium.value)
}

const handleIsShowInput = (tickerSlot) => {
  console.log(tickerSlot)
  for (const item of tickerList.value) {
    if (item.tickerSlot === tickerSlot) {
      item.isShowInput = true
    } else {
      item.isShowInput = false
    }
  }
  console.log(tickerList.value)
}

const handleBackDrop = () => {
  for(const item of tickerList.value) {
    item.isShowInput = false
  }
}

onMounted(async () => {
  const ticker = 'ronin,ethereum,bitcoin,cardano'
  const currency = 'usd'
  // tickerList.value = retrieveFromLocalStorage('tickerList')
  // tickerData.value = await fetchTickerPriceDataByName(ticker, currency)
  // console.log(tickerData.value)
  // price.value = tickerData.value[ticker][currency]
})
</script>

<style scoped></style>
