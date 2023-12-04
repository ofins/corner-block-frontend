<template>
  <nav
    class="flex flex-col justify-between items-center gap-3 bg-bg-asPrimary h-90vh fixed top-5% z-2 px-15px pt-15px"
  >
    <div class="flex-col-center gap-2">
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
    <div>
      <!-- <div @click="open" class="cursor-pointer">
        <img src="/icons/icons8-remove-100.png" class="w-40px" />
      </div> -->
      <div @click="open" class="cursor-pointer">
        <img src="/icons/icons8-create-100.png" class="w-40px" />
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import TickerInputTableModal from '@/components/modal/TickerInputTableModal.vue'

import { useModal } from 'vue-final-modal'
const { open, close } = useModal({
  component: TickerInputTableModal,
  attrs: {
    onConfirm() {
      close()
    }
  }
})
</script>

<style scoped></style>
