<template>
  <VueFinalModal
    class="flex justify-center items-center"
    content-class="flex flex-col max-w-xl mx-4 p-4 c-text-asSecondary bg-bg-asSecondary border rounded-lg space-y-2"
    @update:model-value="(val) => emit('update:modelValue', val)"
  >
    <h1 class="text-xl">
      {{ title }}
    </h1>
    <div>
      <table>
        <thead>
          <tr>
            <th>Slot #</th>
            <th>Coin ID</th>
            <th>Your Holdings</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in data" :key="item.tickerSLot">
            <td>#{{ idx + 1 }}</td>
            <td><input v-model="item.ticker" /></td>
            <td><input v-model="item.holding" /></td>
          </tr>
        </tbody>
      </table>
    </div>
    <slot />
    <button class="mt-1 ml-auto px-2 border rounded-lg" @click.prevent="onSubmit">Confirm</button>
  </VueFinalModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { VueFinalModal } from 'vue-final-modal'

type Ticker = {
  tickerSlot: number
  ticker: string
  holding: number
}

const title = 'Edit Your Bags'
const data = ref(
  Array.from({ length: 11 }, (_, index) => ({
    tickerSlot: index + 1,
    ticker: '',
    holding: 0
  }))
)

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
  (e: 'confirm'): void
  (e: 'update:tickerList', data: Ticker[]): void
}>()

const onSubmit = () => {
  emit('update:tickerList', data.value)
  emit('confirm')
}
</script>
