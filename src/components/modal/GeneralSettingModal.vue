<template>
  <VueFinalModal
    class="flex justify-center items-center"
    @update:model-value="(val) => emit('update:modelValue', val)"
  >
    <div
      class="bg-bg-asSecondary c-text-asPrimary p-4 rd-regular b-line b-solid b-1px b-op-10 shadow-image"
    >
      <h1 class="text-xl">General Setting</h1>
      <form action="" class="px-16px py-36px">
        <label for="toggleTotalValue" class="w-full flex gap-24px">
          <legend>Show Total Value</legend>
          <div>
            Yes <input type="radio" name="totalValue" id="yes" /> No
            <input type="radio" name="totalValue" id="no" />
          </div>
        </label>
      </form>
      <slot />
      <div class="flex justify-end gap-16px">
        <button
          class="border rounded-lg b-1px b-line bg-transparent c-text-asPrimary px-16px py-4px cursor-pointer"
          @click="emit('close')"
        >
          Close
        </button>
        <button
          class="border rounded-lg b-1px b-line bg-transparent c-primary px-16px py-4px cursor-pointer"
          @click="emit('confirm')"
        >
          Confirm
        </button>
      </div>
    </div>
  </VueFinalModal>
</template>

<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'



defineProps<{
  title?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
  (e: 'confirm'): void
  (e: 'close'): void
}>()
</script>
