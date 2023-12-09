<template>
  <VueFinalModal
    class="flex justify-center items-center"
    @update:model-value="(val) => emit('update:modelValue', val)"
  >
    <div
      class="bg-bg-asSecondary c-text-asPrimary p-4 rd-regular b-line b-solid b-1px b-op-10 shadow-image"
    >
      <h1 class="text-xl px-16px">General Setting</h1>
      <form action="" class="px-16px py-36px">
        <div class="flex justify-between gap-46px">
          <legend>Show Total Value</legend>
          <div class="flex gap-16px">
            <div class="flex w-full">
              <label for="yes" class="w-full flex gap-24px"> Yes </label>
              <input
                v-model="generalSetting.showTotalValue"
                type="radio"
                name="totalValue"
                id="yes"
                :value="true"
              />
            </div>
            <div class="flex w-full">
              <label for="no" class="w-full flex gap-24px"> No </label>
              <input
                v-model="generalSetting.showTotalValue"
                type="radio"
                name="totalValue"
                id="no"
                :value="false"
              />
            </div>
          </div>
        </div>
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
          @click="emit('confirm', generalSetting)"
        >
          Confirm
        </button>
      </div>
    </div>
  </VueFinalModal>
</template>

<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'
import { generalSetting } from '@/hooks/useSetting'
import { onUpdated, watch } from 'vue'

defineProps<{
  title?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
  (e: 'confirm', generalSetting: object): void
  (e: 'close'): void
}>()
</script>
