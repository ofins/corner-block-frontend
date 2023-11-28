<template>
  <nav class="flex flex-col gap-3 bg-bg-asPrimary h-100vh fixed top-5% z-2 px-15px pt-15px">
    <RouterLink to="/">
      <div class="w-50px h-50px bg-transparent b-solid b-line b-1px rd-4px flex-col-center">
        <img src="/icons/icons8-cube-100.png" class="w-30px" />
      </div>
    </RouterLink>
    <RouterLink to="/my-blocks"
      ><div class="w-50px h-50px bg-transparent b-solid b-line b-1px rd-4px flex-col-center">
        <img src="/icons/icons8-drawstring-bag-100.png" class="w-30px" /></div
    ></RouterLink>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped></style>
