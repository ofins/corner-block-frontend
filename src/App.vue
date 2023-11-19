<template>
  <div class="flex h-100vh w-full">
    <header>
      <SideBar />
    </header>
    <main class="h-100vh overflow-y-hidden w-full bg-amber">
      <PageTitle />
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import SideBar from '@/components/SideBar.vue'
import PageTitle from '@/components/PageTitle.vue'
</script>
