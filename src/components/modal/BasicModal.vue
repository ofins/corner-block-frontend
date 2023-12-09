<template>
  <VueFinalModal
    class="flex justify-center items-center"
    @update:model-value="(val) => emit('update:modelValue', val)"
  >
    <div
      class="bg-bg-asSecondary c-text-asPrimary p-4 rd-regular b-line b-solid b-1px b-op-10 shadow-image max-h-85vh <md:overflow-y-auto"
    >
      <h1 class="text-xl">
        {{ title }}
      </h1>
      <div class="<md:max-h-50vh <md:overflow-y-scroll">
        <slot />
      </div>
      <div class="flex justify-end gap-16px my-24px">
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
