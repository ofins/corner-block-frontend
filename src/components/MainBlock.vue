<template>
  <form
    class="style-1 b-none rd-regular flex-col-center cursor-pointer"
    :class="sizeType"
    @dblclick="handleIsShowInput"
    @submit.prevent="onSubmit"
  >
    <span
      v-show="!isShowInput"
      class="headline-xl c-text-asPrimary shadow-text"
      style="letter-spacing: 6px"
    >
      {{ tickerSymbol }}
    </span>
    <input
      ref="inputRef"
      v-show="isShowInput"
      type="text"
      class="w-80px b-none bg-transparent c-text-asPrimary fw-700 text-20px b-transparent mb-8px"
      @keyup.enter.prevent="onSubmit"
    />
    <div class="w-70% flex-col-center bg-bg-asSecondary h-42px rd-50px shadow-image">
      <span class="headline-medium font-black c-text-asInverse-01"> ${{ price }} </span>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, onUpdated } from 'vue'

const props = defineProps({
  tickerSymbol: { type: String },
  currency: String,
  sizeType: String,
  price: Number,
  tickerSlot: Number,
  isShowInput: Boolean
})

const inputRef = ref<HTMLInputElement | null>(null)

const emit = defineEmits(['update-ticker'])

const onSubmit = (e: any) => {
  console.log(e.target.value)
  emit('update-ticker', e.target.value, props.tickerSlot)
}

const handleIsShowInput = async () => {
  await emit('update-is-show-input', props.tickerSlot)
  if (inputRef.value) {
    inputRef.value.focus()
    inputRef.value.value = ''
  }
}
</script>

<style scoped>
.size-L {
  width: 300px;
  height: 300px;
}
.size-M {
  width: 150px;
  height: 150px;
}
.size-S {
  width: 150px;
  height: 150px;
}

.style-1 {
  background: linear-gradient(169deg, #61e3ff 1.63%, rgba(0, 209, 255, 0) 92.06%),
    linear-gradient(225deg, #ff00b8 1.45%, #ffc700 99.36%),
    linear-gradient(180deg, #ff7b7b 0%, rgba(255, 255, 255, 0) 100%);
}
</style>
