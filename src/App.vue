<template>
  <div class="flex w-full">
    <header>
      <Transition name="slide-fade">
        <div v-show="showSideBar">
          <SideBar />
        </div>
      </Transition>
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
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'
const appStore = useAppStore()

const { showSideBar } = storeToRefs(appStore)
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-20px);
  /* opacity: 0; */
}
</style>
