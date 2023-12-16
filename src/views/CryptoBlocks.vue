<template>
  <div class="bg-bg-asPrimary w-full h-full py-20px" @click="hideAllInputs">
    <div class="flex-col-center">
      <div class="mb-42px"></div>
      <!-- screenshot button -->
      <div
        v-tooltip="'snapshot'"
        class="cursor-pointer w-70px h-70px <md:w-50px <md:h-50px rd-50% flex-col-center mt-24px fixed bottom-10% right-12% bg-bg-asInverse-01 bg-op-50 hover:bg-primary h-transition z-3 <md:top-30px <md:right-6px"
      >
        <img
          @click="takeScreenshot"
          class="w-35px <md:w-30px"
          src="/icons/icons8-screenshot-90.png"
          alt="screenshot"
        />
      </div>
      <div
        class="p-20px rd-regular bg-bg-asSecondary b-line b-solid b-1px b-op-20"
        id="crypto-block-container"
      >
        <div
          class="flex-col-center items-center lg:flex-row lg:justify-center lg:gap-10 max-w-1000px w-full"
        >
          <MainBlock
            sizeType="size-L"
            :currency="currency"
            :toggle-block-detail="toggleBlockDetail"
            :block-detail-data="blockDetailData"
            :ticker-list="tickerList[currentTickerSlot]"
            @update-ticker="handleInputNewTicker"
            @update-is-show-input="handleIsShowInput"
            @handle-toggle-block-detail="handleToggleBlockDetail"
          />
          <div class="grid grid-cols-2 gap-20px mt-5 lg:mt-0 lg:gap-40px">
            <TheBlock
              v-for="(value, index) in tickerList_medium"
              :ticker-list="value"
              :key="index"
              sizeType="size-M"
              :currency="currency"
              @update-ticker="handleInputNewTicker"
              @update-is-show-input="handleIsShowInput"
              @handle-toggle-block-detail="handleToggleBlockDetail"
            />
          </div>
        </div>
        <div class="flex gap-20px mt-30px <lg:w-300px <lg:flex-wrap">
          <TheBlock
            v-for="(value, index) in tickerList_small_one"
            :ticker-list="value"
            :key="index"
            sizeType="size-S"
            :currency="currency"
            @update-ticker="handleInputNewTicker"
            @update-is-show-input="handleIsShowInput"
            @handle-toggle-block-detail="handleToggleBlockDetail"
          />
        </div>
      </div>
    </div>
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
import { useScreenshot } from '@/util/screenshot'
import BasicModal from '@/components/modal/BasicModal.vue'

const { fetchTickerDetailByName } = useTicker()
const { currency } = storeToRefs(useAppStore())

const { takeScreenshot } = useScreenshot(BasicModal)

const {
  tickerList,
  tickerList_medium,
  tickerList_small_one,
  toggleBlockDetail,
  blockDetailData,
  Ticker,
  LOCAL_STORAGE_TICKERLIST,
  currentTickerSlot,
  handleToggleBlockDetail,
  setAllTickersDetail,
  editTickerListProperty,
  saveToLocalStorage,
  setAllTickerNames
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
    editTickerListProperty(slot, Ticker.Image, data.image.small)
    editTickerListProperty(slot, Ticker.PriceChangePercentage24h, data.price_change_percentage_24h)

    handleToggleBlockDetail(slot)
  }
  // setAllTickerNames([{ tickerSlot: slot, id: value }])
  // setAllTickersDetail()
}

onMounted(() => {
  setAllTickersDetail()
})
</script>

<style scoped></style>
