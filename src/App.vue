<template>
  <div class="flex w-full">
    <header>
      <div v-show="showSideBar">
        <SideBar />
      </div>
      <div class="hidden md:flex">
        <SideBar />
      </div>
    </header>
    <main class="h-100% w-full bg-bg-asPrimary">
      <PageTitle />
      <RouterView />
    </main>
    <ModalsContainer />
  </div>
  <!-- change -->
  <!-- 123 -->
</template>

<script setup lang="ts">
import { ModalsContainer } from 'vue-final-modal'
import { RouterLink, RouterView } from 'vue-router'
import SideBar from '@/components/SideBar.vue'
import PageTitle from '@/components/PageTitle.vue'
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'
import { fetchGeneralSetting } from './hooks/useSetting'
import { onMounted } from 'vue'
const appStore = useAppStore()

const { showSideBar } = storeToRefs(appStore)

onMounted(() => {
  fetchGeneralSetting()
})
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
