<template>
  <div class="bg-bg-asPrimary w-full h-full py-20px" @click="hideAllInputs">
    <div class="flex-col-center">
      <div class="mb-42px">
        <!-- <span class="c-text-asPrimary headline-regular">My Bags</span> -->
      </div>
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
          @update-ticker="handleInputNewTicker"
          @update-is-show-input="handleIsShowInput"
          @handle-toggle-block-detail="handleToggleBlockDetail"
        />
      </div>
      <!-- <div class="grid grid-cols-2 gap-20px mt-5">
        <TheBlock
          v-for="(value, key, index) in tickerList_small_two"
          sizeType="size-M"
          :is-show-input="value.isShowInput"
          :tickerSymbol="value.tickerSymbol"
          :price="value.price"
          currency="currency"
          :key="value.tickerSlot"
          :ticker-slot="value.tickerSlot"
          @update-ticker="handleInputNewTicker"
          @update-is-show-input="handleIsShowInput"
        />
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import TheBlock from '@/components/TheBlock.vue'
import MainBlock from '@/components/MainBlock.vue'
import { onMounted, ref, computed } from 'vue'
import { useTicker } from '@/hooks/useTicker'
import { defaultTickerList } from '@/settings/tickerList'
import { useBlock } from '@/hooks/useBlock'
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'

const { fetchTickerPriceDataByName, fetchTickerDetailByName } = useTicker()
const { currency } = storeToRefs(useAppStore())

const {
  tickerList,
  tickerList_medium,
  tickerList_small_one,
  toggleBlockDetail,
  blockDetailData,
  handleInputNewTicker,
  handleIsShowInput,
  hideAllInputs,
  changeTickerListIntoStrings,
  handleToggleBlockDetail,
  updateAllTickers
} = useBlock()

onMounted(async () => {
  const allTickers = await fetchTickerPriceDataByName(
    changeTickerListIntoStrings(tickerList.value),
    currency.value
  )

  updateAllTickers(allTickers)
})
</script>

<style scoped></style>
