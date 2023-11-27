<template>
  <form
    class="b-none rd-regular flex-col-center relative bg-gradient-to-b from-#A0C3FC to-#5E3268 cursor-pointer"
    :class="sizeType"
    @dblclick="handleIsShowInput"
    @submit.prevent="onSubmit"
  >
    <div
      class="absolute bg-bg-asPrimary w-95% h-95% top-50% translate-y--50% left-50% translate-x--50% rd-regular flex-col-center"
    >
      <span
        v-show="!isShowInput"
        class="headline-medium c-text-asInverse-01"
        style="letter-spacing: 2px"
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
      <span class="headline-regular font-normal c-text-asPrimary mt-8px"> ${{ price }} </span>
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
  width: 310px;
  height: 310px;
}
.size-M {
  width: 140px;
  height: 140px;
}
.size-S {
  width: 150px;
  height: 150px;
}
</style>
