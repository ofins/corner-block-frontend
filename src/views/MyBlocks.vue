<template>
  <div class="bg-bg-asPrimary w-full h-full py-20px">
    <div class="flex-col-center">
      <div class="mb-30px">
        <span class="c-text-asPrimary headline-regular">My Blocks</span>
      </div>
      <TheBlock
        sizeType="size-L"
        :price="price"
        :ticker="tickerList[0].ticker"
        currency="usd"
        :ticker-slot="1"
        @update-ticker="handleUpdateTicker"
      />
      <div class="grid grid-cols-2 gap-10px mt-5">
        <TheBlock
          v-for="(value, key, index) in tickerList_medium"
          sizeType="size-M"
          :ticker="value.ticker"
          :price="value.usd"
          currency="usd"
          :key="value.tickerSlot"
          :ticker-slot="value.tickerSlot"
          @update-ticker="handleUpdateTicker"
        />
      </div>
      <div class="grid grid-cols-2 gap-10px mt-5">
        <TheBlock
          v-for="(value, ticker, index) in tickerData"
          sizeType="size-S"
          :ticker="ticker"
          :price="value.usd"
          currency="usd"
          :key="index"
        />
      </div>
      <div class="grid grid-cols-2 gap-10px mt-5">
        <TheBlock
          v-for="(value, ticker, index) in tickerData"
          sizeType="size-S"
          :ticker="ticker"
          :price="value.usd"
          currency="usd"
          :key="index"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TheBlock from '@/components/TheBlock.vue'
import { onMounted, ref } from 'vue'
import { useTicker } from '@/hooks/useTicker'

const { fetchTickerPriceDataByName } = useTicker()
const tickerData = ref()
const price = ref(0)
const tickerList = ref([
  {
    tickerSlot: 1,
    ticker: ''
  },
  {
    tickerSlot: 2,
    ticker: ''
  },
  {
    tickerSlot: 3,
    ticker: ''
  },
  {
    tickerSlot: 4,
    ticker: ''
  },
  {
    tickerSlot: 5,
    ticker: ''
  },
  {
    tickerSlot: 6,
    ticker: ''
  },
  {
    tickerSlot: 7,
    ticker: ''
  },
  {
    tickerSlot: 8,
    ticker: ''
  },
  {
    tickerSlot: 9,
    ticker: ''
  },
  {
    tickerSlot: 10,
    ticker: ''
  },
  {
    tickerSlot: 11,
    ticker: ''
  },
  {
    tickerSlot: 12,
    ticker: ''
  },
  {
    tickerSlot: 13,
    ticker: ''
  },
  {
    tickerSlot: 14,
    ticker: ''
  }
])

const tickerList_medium = tickerList.value.slice(1, 5)

const handleUpdateTicker = (value: string, tickerSlot: number) => {
  console.log(value, tickerSlot)
  // tickerList.value = [
  //   ...tickerList.value,
  //   {
  //     tickerSlot: tickerSlot,
  //     ticker: value
  //   }
  // ]
  tickerList.value.find((ticker) => {
    if (ticker.tickerSlot === tickerSlot) {
      ticker.ticker = value
    }
  })
  console.log(tickerList.value)
}

onMounted(async () => {
  const ticker = 'ronin,ethereum,bitcoin,cardano'
  const currency = 'usd'
  tickerData.value = await fetchTickerPriceDataByName(ticker, currency)
  console.log(tickerData.value)
  // price.value = tickerData.value[ticker][currency]
})
</script>

<style scoped></style>
