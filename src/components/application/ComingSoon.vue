<template>
  <div class="w-full h-full flex-col-center c-text-asPrimary">
    <img
      src="/icons/icons8-build-100.png"
      class="animate-bounce-alt animate-count-infinite animate-duration-3s"
    />
    <h1>{{ title }}</h1>
    <p>Coming Soon ...</p>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: String
})
</script>

<style scoped></style>
