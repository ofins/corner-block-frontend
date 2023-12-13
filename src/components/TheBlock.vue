<template>
  <form
    class="b-none rd-regular flex-col-center relative bg-gradient-to-tl from-primary to-#ffffff cursor-pointer d-transition hover:shadow-[0px_0px_15px_#A0C3FC]"
    :class="[
      sizeType,
      {
        'headline-regular': sizeType === 'size-S',
        'shadow-[0px_0px_10px_5px_#A0C3FC]!': tickerList?.isBlockSelected,
        'scale-95': isClicked
      }
    ]"
    @dblclick="handleIsShowInput"
    @submit.prevent="onSubmit"
    @click="handleClick"
  >
    <div
      class="absolute bg-bg-asSecondary w-95% h-95% top-50% translate-y--50% left-50% translate-x--50% rd-regular flex-col-center"
    >
      <div
        v-if="tickerList"
        class="headline-small absolute top-6px right-6px py-4px px-8px rd-regular c-text-asPrimary shadow-image"
        :class="{
          'bg-confirm bg-op-50': tickerList?.priceChangePercentage24h > 0,
          'bg-confirm bg-op-100!': tickerList?.priceChangePercentage24h > 5,
          'bg-alert bg-op-50': tickerList?.priceChangePercentage24h < 0,
          'bg-alert bg-op-100!': tickerList?.priceChangePercentage24h < -5,
          'px-16px py-8px': sizeType === 'size-M'
        }"
      >
        {{ tickerList?.priceChangePercentage24h?.toFixed(2) }}%
      </div>
      <span
        v-show="!tickerList?.isShowInput"
        class="headline-medium <xl:headline-regular c-text-asInverse-01 uppercase p-4px text-center min-w-80% flex justify-center items-center"
        style="letter-spacing: 2px"
        :class="{ 'headline-regular': sizeType === 'size-S' }"
      >
        <img
          v-if="tickerList"
          :src="tickerList?.imageURL"
          class="w-18px h-18px object-contain mr-10px rd-50"
          alt="ticker-image"
          :class="{ 'w-26px h-26px': sizeType === 'size-M' }"
        />{{ tickerList?.tickerSymbol ? tickerList?.tickerSymbol : NO_TICKER_DEFAULT }}
      </span>
      <input
        ref="inputRef"
        v-show="tickerList?.isShowInput"
        type="text"
        class="w-80px b-none bg-transparent c-text-asPrimary fw-700 text-20px b-transparent mb-8px"
        @keyup.enter.prevent="onSubmit"
      />
      <span
        v-show="tickerList?.price"
        class="headline-regular font-normal c-text-asPrimary mt-8px"
        :class="{ 'headline-small': sizeType === 'size-S' }"
      >
        ${{ tickerList?.price }}
      </span>
      <span
        v-if="generalSetting.showTotalValue && totalValue"
        class="headline-regular c-text-asSecondary fw-400 text-12px absolute bottom-10%"
        :class="{ 'headline-small': sizeType === 'size-S' }"
      >
        $ {{ abbreviateNumber(totalValue) }} ({{ tickerList?.holding }})
      </span>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, onUpdated, computed, onMounted } from 'vue'

import { abbreviateNumber } from '@/util/number'
import { generalSetting } from '@/hooks/useSetting'

const props = defineProps({
  currency: String,
  sizeType: String,
  tickerList: Object
})

const NO_TICKER_DEFAULT = 'insert token id'
const inputRef = ref<HTMLInputElement | null>(null)
const isClicked = ref(false)

const totalValue = computed(() => props.tickerList?.holding * props.tickerList?.price)

const emit = defineEmits(['update-ticker', 'handleToggleBlockDetail'])

const onSubmit = (e: any) => {
  emit('update-ticker', e.target.value.toLowerCase(), props.tickerList?.tickerSlot)
}

const handleIsShowInput = async () => {
  await emit('update-is-show-input', props.tickerList?.tickerSlot)
  if (inputRef.value) {
    inputRef.value.focus()
    inputRef.value.value = ''
  }
}

const handleClick = () => {
  emit('handleToggleBlockDetail', props.tickerList?.tickerSlot)
  isClicked.value = true
  setTimeout(() => {
    isClicked.value = false
  }, 300)
}
</script>

<style scoped>
.size-L {
  width: 310px;
  height: 310px;
}
.size-M {
  width: 140px;
  height: 140px;

  @media (min-width: 1024px) {
    width: 205px;
    height: 205px;
  }
}
.size-S {
  width: 140px;
  height: 140px;

  @media (max-width: 1024px) {
    width: 140px;
    height: 140px;
  }
}

.d-transition {
  transition: all 0.2s cubic-bezier(0.22, 1, 0.36, 1);
}
</style>
