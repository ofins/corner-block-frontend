<template>
  <div
    class="style-1 relative rd-regular flex-col-center cursor-pointer w-full h-full"
    @click="handleToggleBlockDetail"
  >
    <div class="w-85% h-85% absolute b-l-solid headline-regular c-text-asSecondary">
      <span class="absolute top-0 left-0 ml-4px"> ${{ dayHigh }} </span>
      <span class="absolute bottom-0 left-0 ml-4px"> ${{ dayLow }} </span>
      <span
        class="absolute top-0 right-0"
        :class="{
          'c-confirm': percentageChangeSevenDays > 0,
          'c-alert': percentageChangeSevenDays < 0
        }"
      >
        {{ percentageChangeSevenDays?.toFixed(2) }}%
      </span>
      <div class="absolute bottom-0 right-0">
        <span>
          {{ abbreviateNumber(circulatingSupply) }}
        </span>
        <span> / </span>
        <span>
          {{ abbreviateNumber(totalSupply) }}
        </span>
      </div>
    </div>
    <div class="flex-col-center w-full h-full font-black text-52px c-primary">
      {{ abbreviateNumber(marketCap) }}
    </div>
    <span
      class="absolute top-70% left-50% translate-x--50% translate-y--50% headline-xl <xl:headline-large c-text-asPrimary c-op-5"
    >
      #{{ marketCapRank }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { abbreviateNumber } from '@/util/number'

const props = defineProps({
  marketCap: {
    type: Number,
    default: null
  },
  circulatingSupply: {
    type: Number,
    default: null
  },
  totalSupply: {
    type: Number,
    default: null
  },
  dayHigh: {
    type: Number,
    default: null
  },
  dayLow: {
    type: Number,
    default: null
  },
  marketCapRank: {
    type: Number,
    default: null
  },
  symbol: {
    type: String,
    default: 'N/A'
  },
  percentageChangeSevenDays: {
    type: Number,
    default: null
  }
})

const emit = defineEmits(['handleToggleBlockDetail'])

const handleToggleBlockDetail = () => {
  emit('handleToggleBlockDetail')
}
</script>

<style scoped></style>
