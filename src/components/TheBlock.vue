<template>
  <div class="b-1px b-solid b-#E2E2E2 rd-regular flex-col-center" :class="sizeType">
    <span class="headline-medium c-text-asPrimary">
      {{ ticker }}
    </span>
    <span class="headline-regular font-normal c-text-asPrimary"> ${{ price }} </span>
  </div>
</template>

<script setup lang="ts">
defineProps({
  ticker: { type: String },
  currency: String,
  sizeType: String,
  price: Number
})
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
