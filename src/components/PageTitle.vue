<template>
  <div class="bg-bg-asPrimary h-10% flex-col-center relative py-20px">
    <img
      v-show="!showSideBar"
      src="/icons/icons8-menu-24.png"
      alt="menu_button"
      class="absolute left-10px cursor-pointer md:hidden"
      :class="{ 'rotate-z-90': showSideBar }"
      @click="handleToggleSideBar"
    />
    <h1 class="m-0 headline-medium font-italic c-text-asPrimary">{{ title }}</h1>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, ref, watch, computed } from 'vue'
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'

const appStore = useAppStore()
const { showSideBar } = storeToRefs(appStore)

const route = useRoute()
// const title = ref<string>()
const title = computed(() =>
  route.path === '/crypto-blocks'
    ? 'Crypto Bags'
    : route.path === '/nft-blocks'
      ? 'NFT Bags'
      : 'CornerBlock'
)

const handleToggleSideBar = () => {
  appStore.setShowSideBar(!showSideBar.value)
}
</script>

<style scoped></style>
