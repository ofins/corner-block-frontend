<template>
  <div class="bg-bg-asPrimary w-full h-full py-20px">
    <div class="flex-col-center">
      <div class="mb-30px">
        <span class="c-text-asPrimary headline-regular">My Blocks</span>
      </div>
      <TheBlock sizeType="size-L" :price="price" ticker="ronin" currency="usd" />
      <div class="grid grid-cols-2 gap-10px mt-5">
        <TheBlock
          v-for="(value, ticker, index) in tickerData"
          sizeType="size-M"
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
const tickerArray = ['ronin', 'ethereum', 'bitcoin', 'cardano']

onMounted(async () => {
  const ticker = 'ronin,ethereum,bitcoin,cardano'
  const currency = 'usd'
  tickerData.value = await fetchTickerPriceDataByName(ticker, currency)
  console.log(tickerData.value)
  // price.value = tickerData.value[ticker][currency]
})
</script>

<style scoped></style>
