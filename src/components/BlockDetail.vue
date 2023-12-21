<template>
  <div
    class="style-1 relative rd-regular flex-col-center cursor-pointer w-full h-full"
    @click="handleToggleBlockDetail"
  >
    <div class="w-85% h-85% absolute b-l-solid headline-regular c-text-asSecondary">
      <!-- day high/low -->
      <span v-tooltip.right="'24H High'" class="absolute top-0 left-0 <md:headline-small ml-4px">
        ${{ blockDetailData?.market_data?.high_24h.usd }}
      </span>
      <span v-tooltip.right="'24H Low'" class="absolute bottom-0 left-0 <md:headline-small ml-4px">
        ${{ blockDetailData?.market_data?.low_24h.usd }}
      </span>
      <span class="c-confirm ml-4px absolute left-0" :style="`bottom:${price_percentile}%`">
        ${{ tickerList?.price }}</span
      >
      <!-- 7 days change -->
      <span
        v-tooltip="'7 Days Percentage Change'"
        class="absolute top-0 right-0"
        :class="{
          'c-confirm': blockDetailData?.market_data?.price_change_percentage_7d > 0,
          'c-alert': blockDetailData?.market_data?.price_change_percentage_7d < 0
        }"
      >
        {{ blockDetailData?.market_data?.price_change_percentage_7d?.toFixed(2) }}%
      </span>

      <!-- supplies -->
      <div class="absolute bottom-0 right-0">
        <span v-tooltip="'Circulating Supply'">
          {{ abbreviateNumber(blockDetailData?.market_data?.circulating_supply, 0) }}
        </span>
        <span> / </span>
        <span v-tooltip="'Total Supply'">
          {{ abbreviateNumber(blockDetailData?.market_data?.total_supply, 0) }}
        </span>
      </div>
      <!-- market cap -->
      <span
        v-tooltip="'Market Capitalization'"
        class="absolute bottom-0 left-50% translate-x--50% c-primary"
      >
        {{ abbreviateNumber(blockDetailData?.market_data?.market_cap.usd, 0) }}
      </span>
      <!-- market cap rank -->
      <span
        v-tooltip="'Ranking By Market Cap.'"
        class="absolute top-0 left-50% translate-x--50% translate-x--50%"
      >
        #{{ blockDetailData?.market_data?.market_cap_rank }}
      </span>
    </div>

    <div class="flex-col-center w-full h-full font-black text-52px c-primary">
      <!-- token image -->
      <img
        v-if="blockDetailData?.image.large"
        :src="blockDetailData?.image.large"
        class="object-contain w-100px <md:w-70px"
        alt="ticker-image"
      />

      <!-- asset value -->
      <span
        v-if="generalSetting.showTotalValue && totalValue"
        v-tooltip="'asset in USD'"
        class="c-text-asPrimary headline-large <md:headline-medium text-shadow absolute bottom-20%"
      >
        ${{ totalValue.toLocaleString() }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed, onMounted } from 'vue'
import { abbreviateNumber } from '@/util/number'
import { generalSetting } from '@/hooks/useSetting'

const props = defineProps({
  blockDetailData: Object,
  tickerList: Object
})

const emit = defineEmits(['handleToggleBlockDetail'])

const totalValue = computed(() => props.tickerList?.holding * props.tickerList?.price)

const handleToggleBlockDetail = () => {
  emit('handleToggleBlockDetail')
}

// maximum percentage is 95%
const price_percentile = computed(() => {
  return (
    (95 * (props.tickerList?.price - props.blockDetailData?.market_data?.low_24h.usd)) /
    (props.blockDetailData?.market_data?.high_24h.usd -
      props.blockDetailData?.market_data?.low_24h.usd)
  ).toFixed(0)
})
</script>

<style scoped>
.v-popper__inner {
  background-color: red !important;
  height: 100px;
}
</style>
