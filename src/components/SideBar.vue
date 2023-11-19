<template>
  <nav class="flex flex-col bg-blue h-full">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/my-blocks">MyBlocks</RouterLink>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped></style>
