<template>
  <div
    class="flex-col-center cursor-pointer w-full h-full bg-bg-asSecondary"
    @click="handleToggleBlockDetail"
  >
    <span class="headline-xl">
      {{ marketCap }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
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
  weekHigh: {
    type: Number,
    default: null
  },
  weekLow: {
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
  ranking: {
    type: Number,
    default: null
  },
  symbol: {
    type: String,
    default: 'N/A'
  }
})

const emit = defineEmits(['handleToggleBlockDetail'])

const handleToggleBlockDetail = () => {
  emit('handleToggleBlockDetail')
}
</script>

<style scoped></style>
