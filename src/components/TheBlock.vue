<template>
  <div class="b-1px b-solid b-line rd-regular flex-col-center" :class="sizeType">
    <span class="headline-medium c-text-asPrimary">
      {{ ticker }}
    </span>
    <input type="text" name="" id="" @keyup.enter.prevent="onSubmit" />
    <span class="headline-regular font-normal c-text-asPrimary"> ${{ price }} </span>
  </div>
</template>

<script setup lang="ts">
import { ref, onUpdated } from 'vue'

const props = defineProps({
  ticker: { type: String },
  currency: String,
  sizeType: String,
  price: Number,
  tickerSlot: Number
})

const emit = defineEmits(['update-ticker'])

const onSubmit = (e: any) => {
  console.log(e.target.value)
  emit('update-ticker', e.target.value, props.tickerSlot)
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
