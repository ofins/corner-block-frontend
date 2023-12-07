<template>
  <form
    v-show="!toggleBlockDetail"
    class="style-1 b-none rd-regular flex-col-center cursor-pointer relative"
    :class="sizeType"
    @click="emit('handleToggleBlockDetail', tickerSlot)"
    @dblclick="handleIsShowInput"
    @submit.prevent="onSubmit"
  >
    <span
      v-show="!isShowInput"
      class="headline-xl c-text-asPrimary shadow-text uppercase mb-16px lg:mb-24px"
      style="letter-spacing: 6px"
    >
      {{ tickerSymbol }}
    </span>
    <input
      ref="inputRef"
      v-show="isShowInput"
      type="text"
      class="w-80px b-none bg-transparent c-text-asPrimary fw-700 text-20px b-transparent mb-8px"
      @keyup.enter.prevent="onSubmit"
    />
    <div class="w-70% flex-col-center bg-primary bg-op-90 h-42px rd-50px">
      <span class="headline-medium font-black c-text-asPrimary"> ${{ price }} </span>
    </div>
    <span
      v-if="showTotalValue"
      class="c-text-asSecondary fw-400 text-16px absolute bottom-10%"
      :class="{ 'headline-small': sizeType === 'size-S' }"
    >
      ${{ totalValue.toFixed(2) }}
    </span>
    <span v-show="!showTotalValue" class="c-text-asSecondary fw-400 text-16px absolute bottom-10%">
      {{ holding }}
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
      @handle-toggle-block-detail="emit('handleToggleBlockDetail', tickerSlot)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onUpdated, computed } from 'vue'
import BlockDetail from './BlockDetail.vue'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/stores/app'
const { showTotalValue } = storeToRefs(useAppStore())

const props = defineProps({
  tickerSymbol: { type: String },
  currency: String,
  sizeType: String,
  price: Number,
  tickerSlot: Number,
  isShowInput: Boolean,
  blockDetailData: Object,
  toggleBlockDetail: Boolean,
  holding: Number
})

const totalValue = computed(() => props?.holding * props?.price)

const inputRef = ref<HTMLInputElement | null>(null)

const emit = defineEmits(['update-ticker', 'handleToggleBlockDetail'])

const onSubmit = (e: any) => {
  emit('update-ticker', e.target.value, props.tickerSlot)
}

const handleIsShowInput = async () => {
  await emit('update-is-show-input', props.tickerSlot)
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
    width: 400px;
    height: 400px;
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
