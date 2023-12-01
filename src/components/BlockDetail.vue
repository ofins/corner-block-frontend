<template>
  <div
    class="relative flex-col-center cursor-pointer w-full h-full bg-bg-asSecondary"
    @click="handleToggleBlockDetail"
  >
    <div class="w-65% h-65% absolute b-l-solid headline-regular c-text-asSecondary">
      <span class="absolute top-0 left-0 ml-4px"> ${{ dayHigh }} </span>
      <span class="absolute bottom-0 left-0 ml-4px"> ${{ dayLow }} </span>
      <span class="absolute top-0 right-0"> #{{ marketCapRank }} </span>
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
    <div class="flex-col-center w-full h-full font-black text-52px c-text-asSecondary text-style-1">
      {{ abbreviateNumber(marketCap) }}
      <!-- <span
        class="headline-medium mt-16px"
        :class="{
          'c-confirm': percentageChangeSevenDays > 0,
          'c-alert': percentageChangeSevenDays < 0
        }"
      >
        {{ percentageChangeSevenDays.toFixed(2) }}%
      </span> -->
    </div>
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

<style scoped>
/* .text-style-1 {
  color: white; 
  background-color: transparent; 
  -webkit-background-clip: text; 
  background-clip: text;
  -webkit-text-fill-color: transparent; 
  text-fill-color: transparent;
  -webkit-text-stroke: 1.3px black; 
  text-stroke: 1.3px black;
} */
</style>
