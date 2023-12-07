<template>
  <VueFinalModal
    class="flex justify-center items-center"
    content-class="flex flex-col max-w-xl c-text-asSecondary"
  >
    <div
      class="bg-bg-asSecondary c-text-asPrimary p-4 rd-regular b-line b-solid b-1px b-op-10 shadow-image"
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
              <td>
                <input
                  class="b-none rd-4px h-20px mb-2px drop-shadow"
                  :placeholder="Placeholder.CoinId"
                  v-model="item.id"
                />
              </td>
              <td>
                <input
                  class="b-none rd-4px h-20px mb-2px drop-shadow"
                  :placeholder="Placeholder.Holding"
                  v-model="item.holding"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <slot />
        <div class="flex items-center justify-end gap-8px mt-16px">
          <button
            class="border rounded-lg b-1px b-line bg-transparent c-text-asPrimary px-16px py-4px cursor-pointer"
            @click.prevent="emit('confirm')"
          >
            Close
          </button>
          <button
            class="border rounded-lg b-1px b-line bg-transparent c-primary px-16px py-4px cursor-pointer"
            @click.prevent="onSubmit"
          >
            Confirm
          </button>
        </div>
      </div>
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
    id: '',
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
