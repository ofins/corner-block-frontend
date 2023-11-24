<template>
  <form
    class="b-1px b-solid b-line rd-regular flex-col-center"
    :class="sizeType"
    @dblclick="handleIsShowInput"
    @submit.prevent="onSubmit"
  >
    <span v-show="!isShowInput" class="headline-medium c-text-asPrimary">
      {{ ticker }}
    </span>
    <input
      ref="inputRef"
      v-show="isShowInput"
      type="text"
      class="w-80px b-none bg-transparent c-text-asPrimary fw-700 text-20px b-transparent mb-8px"
      @keyup.enter.prevent="onSubmit"
    />
    <span class="headline-regular font-normal c-text-asPrimary"> ${{ price }} </span>
  </form>
</template>

<script setup lang="ts">
import { ref, onUpdated } from 'vue'

const props = defineProps({
  ticker: { type: String },
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
  width: 310px;
  height: 310px;
}
.size-M {
  width: 150px;
  height: 150px;
}
.size-S {
  width: 150px;
  height: 150px;
}
</style>
