<template>
  <div class="bg-bg-asPrimary w-full h-full py-20px" @click="hideAllInputs">
    <div class="flex justify-center gap-45px h-665px <md:flex-col-center <md:h-unset">
      <div class="mb-42px"></div>
      <!-- screenshot button -->
      <!-- TODO: disabling until image not screenshotted is fixed -->
      <div
        v-if="false"
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
      <!-- main frame -->
      <div
        class="p-20px rd-regular bg-bg-asSecondary b-line b-solid b-1px b-op-20 relative"
        id="crypto-block-container"
      >
        <!-- dateTime -->
        <div class="absolute left-0 top--26px c-text-asSecondary font-italic text-14px">
          Last updated: {{ dateTime }}
        </div>
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
      <!-- assets display frame -->
      <div
        v-if="generalSetting.showTotalValue"
        class="w-300px rd-regular p-20px bg-bg-asSecondary b-line b-solid b-1px b-op-20 text-left h-fit min-w-341px <md:min-w-unset"
      >
        <table class="w-full c-text-asPrimary">
          <thead class="headline-regular">
            <tr>
              <th>Token</th>
              <th>holdings</th>
              <th>value</th>
            </tr>
            <tr class="h-20px"></tr>
          </thead>
          <tbody class="text-12px <md:text-10px">
            <tr v-for="(ticker, index) in tickerList" :key="index" class="whitespace-nowrap">
              <th class="font-400 w-121px overflow-hidden">{{ ticker.id }}</th>
              <th class="font-400 w-90px overflow-hidden">{{ ticker.holding }}</th>
              <th class="font-400 w-120px! overflow-x-hidden" v-if="ticker.holding">
                $ {{ (ticker.holding * ticker.price).toLocaleString() }}
              </th>
            </tr>
            <tr class="h-40px whitespace-nowrap">
              <th>Total</th>
              <th>-</th>
              <th class="c-confirm">$ {{ addAllAssetValue.toLocaleString() }} USD</th>
            </tr>
          </tbody>
        </table>
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
import { generalSetting } from '@/hooks/useSetting'
import { updateFormattedDateTime } from '@/util/dateUtil'

const { fetchTickerDetailByName } = useTicker()
const { currency } = storeToRefs(useAppStore())
const dateTime = ref('-')

const { takeScreenshot } = useScreenshot(BasicModal)

const {
  tickerList,
  tickerList_medium,
  tickerList_small_one,
  toggleBlockDetail,
  blockDetailData,
  Ticker,
  currentTickerSlot,
  handleToggleBlockDetail,
  setAllTickersDetail,
  editTickerListProperty
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
}

const addAllAssetValue = computed(() => {
  return tickerList.value.reduce((accumulator, currentTicker) => {
    const value = currentTicker.holding * currentTicker.price

    return accumulator + (isNaN(value) ? 0 : value)
  }, 0)
})

function updateAllTickersAndDateTime() {
  setAllTickersDetail()
    .then(() => {
      dateTime.value = updateFormattedDateTime()
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}

onMounted(() => {
  updateAllTickersAndDateTime()

  setInterval(() => {
    updateAllTickersAndDateTime()
  }, 60000)
})
</script>

<style scoped></style>
