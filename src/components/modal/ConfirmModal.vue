<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
  (e: 'confirm'): void
}>()
</script>

<template>
  <VueFinalModal
    class="flex justify-center items-center"
    content-class="bg-bg-asSecondary c-text-asPrimary p-4 rd-regular b-line b-solid b-1px b-op-10 shadow-image max-h-85vh flex flex-col items-end"
    @update:model-value="(val) => emit('update:modelValue', val)"
  >
    <slot />
    <button
      class="border rounded-lg b-1px b-line bg-transparent c-primary px-16px py-4px cursor-pointer w-50%"
      @click="emit('confirm')"
    >
      Confirm
    </button>
  </VueFinalModal>
</template>
