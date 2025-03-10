<template>
  <div v-if="false" class="bg-bg-asPrimary w-full h-full py-20px" @click="hideAllInputs">
    <div class="flex-col-center">
      <div class="mb-42px"></div>
      <div class="p-20px rd-regular bg-bg-asSecondary b-line b-solid b-1px b-op-20">
        <div
          class="flex-col-center items-center lg:flex-row lg:justify-center lg:gap-10 max-w-1000px w-full"
        >
          <MainBlock
            :is-show-input="tickerList[0].isShowInput"
            sizeType="size-L"
            :price="tickerList[0].price"
            :tickerSymbol="tickerList[0].tickerSymbol"
            :currency="currency"
            :ticker-slot="tickerList[0].tickerSlot"
            :block-detail-data="blockDetailData"
            :toggle-block-detail="toggleBlockDetail"
            :holding="tickerList[0].holding"
            @update-ticker="handleInputNewTicker"
            @update-is-show-input="handleIsShowInput"
            @handle-toggle-block-detail="handleToggleBlockDetail"
          />
          <div class="grid grid-cols-2 gap-20px mt-5 lg:mt-0 lg:gap-40px">
            <TheBlock
              v-for="value in tickerList_medium"
              sizeType="size-M"
              :is-show-input="value.isShowInput"
              :tickerSymbol="value.tickerSymbol"
              :price="value.price"
              :currency="currency"
              :key="value.tickerSlot"
              :ticker-slot="value.tickerSlot"
              :is-block-selected="value.isBlockSelected"
              :holding="value.holding"
              @update-ticker="handleInputNewTicker"
              @update-is-show-input="handleIsShowInput"
              @handle-toggle-block-detail="handleToggleBlockDetail"
            />
          </div>
        </div>
        <div class="flex gap-20px mt-30px <lg:w-300px <lg:flex-wrap">
          <TheBlock
            v-for="value in tickerList_small_one"
            sizeType="size-S"
            :is-show-input="value.isShowInput"
            :tickerSymbol="value.tickerSymbol"
            :price="value.price"
            :currency="currency"
            :key="value.tickerSlot"
            :ticker-slot="value.tickerSlot"
            :is-block-selected="value.isBlockSelected"
            :holding="value.holding"
            @update-ticker="handleInputNewTicker"
            @update-is-show-input="handleIsShowInput"
            @handle-toggle-block-detail="handleToggleBlockDetail"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="h-100vh" v-else>
    <ComingSoon title="NFT Block" />
  </div>
</template>

<script setup lang="ts">
import TheBlock from '@/components/TheBlock.vue'
import MainBlock from '@/components/MainBlock.vue'
import { onMounted, ref, computed } from 'vue'
import { useTicker } from '@/hooks/useTicker'
import { useTickerBlock } from '@/hooks/useBlock'
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'
import ComingSoon from '@/components/application/ComingSoon.vue'

const { fetchTickerPriceDataByName, fetchTickerDetailByName } = useTicker()
const { currency } = storeToRefs(useAppStore())

const {
  tickerList,
  tickerList_medium,
  tickerList_small_one,
  toggleBlockDetail,
  blockDetailData,
  Ticker,
  LOCAL_STORAGE_TICKERS_LIST,
  handleToggleBlockDetail,
  setAllTickersDetail,
  editTickerListProperty,
  saveToLocalStorage
} = useTickerBlock()

const handleIsShowInput = (slot: number) => {
  editTickerListProperty(slot, 'isShowInput', true)
}

const hideAllInputs = () => {
  tickerList.value.forEach((item) => {
    editTickerListProperty(item.tickerSlot, 'isShowInput', false)
  })
}

const handleInputNewTicker = async (value: string, slot: number) => {
  const data = await fetchTickerDetailByName(value)
  if (data) {
    editTickerListProperty(slot, Ticker.Symbol, data.symbol.toUpperCase())
    editTickerListProperty(slot, Ticker.Name, data.name)
    editTickerListProperty(slot, Ticker.Price, data.market_data.current_price.usd)
    editTickerListProperty(slot, Ticker.IsShowInput, false)
    editTickerListProperty(slot, Ticker.Id, data.id)

    saveToLocalStorage(LOCAL_STORAGE_TICKERS_LIST, tickerList.value)
    handleToggleBlockDetail(slot)
  }
}

onMounted(() => {
  setAllTickersDetail()
})
</script>

<style scoped></style>
