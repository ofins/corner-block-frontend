<template>
  <nav
    class="flex flex-col justify-between items-center gap-3 bg-bg-asPrimary h-100vh fixed top-0% z-2 px-15px pt-15px shadow-image"
  >
    <div>
      <img
        src="/icons/icons8-menu-24.png"
        alt="menu_button"
        class="absolute left-10px cursor-pointer md:hidden"
        @click="handleToggleSideBar"
      />
      <div class="mt-50px flex-col-center gap-2">
        <RouterLink to="/">
          <div class="w-50px h-50px bg-transparent b-solid b-line b-1px rd-4px flex-col-center">
            <img src="/icons/icons8-cube-100.png" class="w-30px" />
          </div>
        </RouterLink>
        <RouterLink to="/my-blocks"
          ><div class="w-50px h-50px bg-transparent b-solid b-line b-1px rd-4px flex-col-center">
            <img src="/icons/icons8-drawstring-bag-100.png" class="w-30px" /></div
        ></RouterLink>
      </div>
    </div>
    <div>
      <div @click="openTickerInputTableModal" class="cursor-pointer mb-20px">
        <img src="/icons/icons8-create-100.png" class="w-40px" />
      </div>
      <div @click="openBasicModal" class="cursor-pointer mb-50px">
        <img src="/icons/icons8-remove-100.png" class="w-40px" />
      </div>
    </div>
  </nav>
  <!-- background shade -->
  <div
    v-show="showSideBar"
    class="w-full h-full fixed top-0 left-0 z-1 bg-op-70 bg-bg-asSecondary"
  />
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import TickerInputTableModal from '@/components/modal/TickerInputTableModal.vue'
import BasicModal from '@/components/modal/BasicModal.vue'
import { useAppStore } from '@/stores/app'
import { useModal } from 'vue-final-modal'
import { storeToRefs } from 'pinia'

const appStore = useAppStore()

const { showSideBar } = storeToRefs(appStore)

const handleToggleSideBar = () => {
  appStore.setShowSideBar(!showSideBar.value)
}

const handleClearTickerList = () => {
  localStorage.removeItem('tickerList')
  window.location.reload()
}

const { open: openTickerInputTableModal, close: closeTickerInputTableModal } = useModal({
  component: TickerInputTableModal,
  attrs: {
    onConfirm() {
      closeTickerInputTableModal()
    },
    escToClose: true
  }
})

const { open: openBasicModal, close: closeBasicModal } = useModal({
  component: BasicModal,
  attrs: {
    onConfirm() {
      handleClearTickerList()
      closeBasicModal()
    },
    onClose() {
      closeBasicModal()
    },
    escToClose: true,
    title: 'Clear Token Data'
  },
  slots: {
    default: '<p>Are you sure you want to reset all token data?</p>'
  }
})
</script>

<style scoped></style>
