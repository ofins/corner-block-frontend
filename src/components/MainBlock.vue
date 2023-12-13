<template>
  <form
    v-show="!toggleBlockDetail"
    class="style-1 b-none rd-regular flex-col-center cursor-pointer relative"
    :class="sizeType"
    @click="emit('handleToggleBlockDetail', tickerList?.tickerSlot)"
    @dblclick="handleIsShowInput"
    @submit.prevent="onSubmit"
  >
    <span
      v-show="!tickerList?.isShowInput"
      class="headline-xl c-text-asPrimary shadow-text uppercase mb-16px lg:mb-24px flex items-center"
      style="letter-spacing: 6px"
    >
      <div
        class="headline-regular absolute top-12px right-12px py-12px px-20px rd-regular c-text-asPrimary shadow-image"
        :class="{
          'bg-confirm bg-op-50': tickerList?.priceChangePercentage24h > 0,
          'bg-confirm bg-op-100!': tickerList?.priceChangePercentage24h > 5,
          'bg-alert bg-op-50': tickerList?.priceChangePercentage24h < 0,
          'bg-alert bg-op-100!': tickerList?.priceChangePercentage24h < -5
        }"
        style="letter-spacing: normal"
      >
        {{ tickerList?.priceChangePercentage24h?.toFixed(2) }}%
      </div>
      <img
        :src="tickerList?.imageURL"
        class="w-48px h-48px object-contain mr-10px"
        alt="ticker-image"
      />
      <span>
        {{ tickerList?.tickerSymbol }}
      </span>
    </span>
    <input
      ref="inputRef"
      v-show="tickerList?.isShowInput"
      type="text"
      class="w-80px b-none bg-transparent c-text-asPrimary fw-700 text-20px b-transparent mb-8px"
      @keyup.enter.prevent="onSubmit"
    />
    <div class="w-70% flex-col-center bg-primary bg-op-90 h-42px rd-50px">
      <span class="headline-medium font-black c-text-asPrimary"> ${{ tickerList?.price }} </span>
    </div>
    <span
      v-if="generalSetting.showTotalValue && totalValue"
      class="c-text-asSecondary fw-400 text-16px absolute bottom-10%"
      :class="{ 'headline-small': sizeType === 'size-S' }"
    >
      $ {{ abbreviateNumber(totalValue) }} ({{ tickerList?.holding }})
    </span>
  </form>
  <!-- block details -->
  <div v-show="toggleBlockDetail" :class="sizeType" class="rd-regular">
    <BlockDetail
      :market-cap="blockDetailData?.market_data?.market_cap.usd"
      :symbol="blockDetailData?.symbol"
      :day-high="blockDetailData?.market_data?.high_24h.usd"
      :day-low="blockDetailData?.market_data?.low_24h.usd"
      :market-cap-rank="blockDetailData?.market_data?.market_cap_rank"
      :circulating-supply="blockDetailData?.market_data?.circulating_supply"
      :percentage-change-seven-days="blockDetailData?.market_data?.price_change_percentage_7d"
      :total-supply="blockDetailData?.market_data?.total_supply"
      @handle-toggle-block-detail="emit('handleToggleBlockDetail', tickerList?.tickerSlot)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onUpdated, computed } from 'vue'
import BlockDetail from './BlockDetail.vue'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/stores/app'
import { abbreviateNumber } from '@/util/number'
import { generalSetting } from '@/hooks/useSetting'

const props = defineProps({
  sizeType: String,
  blockDetailData: Object,
  toggleBlockDetail: Boolean,
  tickerList: Object
})

console.log(props.tickerList)

const totalValue = computed(() => props.tickerList?.holding * props.tickerList?.price)

const inputRef = ref<HTMLInputElement | null>(null)

const emit = defineEmits(['update-ticker', 'handleToggleBlockDetail'])

const onSubmit = (e: any) => {
  emit('update-ticker', e.target.value, props.tickerList?.tickerSlot)
}

const handleIsShowInput = async () => {
  await emit('update-is-show-input', props.tickerList?.tickerSlot)
  if (inputRef.value) {
    inputRef.value.focus()
    inputRef.value.value = ''
  }
}
</script>

<style scoped>
.size-L {
  width: 300px;
  height: 300px;

  @media (min-width: 1024px) {
    width: 450px;
    height: 450px;
  }
}
.size-M {
  width: 150px;
  height: 150px;
}
.size-S {
  width: 150px;
  height: 150px;
}

.style-1 {
  background: linear-gradient(
    35.95deg,
    hsla(0, 0%, 100%, 0.05) 21.76%,
    hsla(0, 0%, 100%, 0) 80.12%
  );
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
