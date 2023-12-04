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
            <td><input class="b-none rd-4px h-20px mb-2px drop-shadow" :placeholder="Placeholder.CoinId" v-model="item.ticker" /></td>
            <td><input class="b-none rd-4px h-20px mb-2px drop-shadow" :placeholder="Placeholder.Holding" v-model="item.holding" disabled /></td>
          </tr>
        </tbody>
      </table>
    </div>
    <slot />
    <div class="flex items-center justify-end gap-8px">
      <button
        class="mt-1 px-2 border rounded-lg cursor-pointer w-fit"
        @click.prevent="emit('confirm')"
      >
        Close
      </button>
      <button class="mt-1 px-2 border rounded-lg cursor-pointer w-fit" @click.prevent="onSubmit">
        Confirm
      </button>
    </div>
  </VueFinalModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { VueFinalModal } from 'vue-final-modal'
import { useBlock } from '@/hooks/useBlock'

enum Placeholder {
  CoinId = 'Insert Token Name ',
  Holding = 'Amount'
}

const title = 'Edit Your Bags'
const data = ref(
  Array.from({ length: 11 }, (_, index) => ({
    tickerSlot: index + 1,
    ticker: '',
    holding: null
  }))
)

const { submitEditTable } = useBlock()

const emit = defineEmits<{
  (e: 'confirm'): void
}>()

const onSubmit = () => {
  submitEditTable(data.value)
  window.location.reload()
  emit('confirm')
}
</script>
