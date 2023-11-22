<template>
  <div class="flex w-full">
    <header>
      <div class="hidden md:flex">
        <SideBar />
      </div>
    </header>
    <main class="h-100% w-full bg-bg-asPrimary">
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
