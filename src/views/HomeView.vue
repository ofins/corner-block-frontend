<template>
  <div class="bg-bg-asPrimary w-full flex justify-center items-center <md:flex-col my-100px">
    <div class="py-5 flex-col-center">
      <img
        src="/icons/icons8-cube-100.png"
        class="animate-bounce-alt animate-count-infinite animate-duration-3s"
      />
      <div class="c-text-asPrimary mt-20 text-center">
        <p>Created Nov 19, 2023.</p>
        <RouterLink to="/crypto-blocks" class="decoration-none">
          <div
            class="bg-primary w-fit px-32px rd-regular mx-auto mt-70px py-16px c-text-asPrimary hover:scale-105 transition-all duration-300 hover:bg-transparent hover:b-solid b-primary"
          >
            Get Started
          </div>
        </RouterLink>
      </div>
    </div>
    <div class="c-text-asPrimary max-w-500px md:ml-100px px-16px flex flex-col justify-start gap-2">
      <div class="b-1px b-solid b-white p-16px rd-regular b-op-30">
        <p class="text-20px"><u>Important</u>:</p>
        <ul class="my-24px">
          <li>CornerBlock is powered by CoinGecko's free API.</li>
          <li class="mt-8px">
            Currently search term only supports coin id (bitcoin, ethereum) and <u>NOT</u> coin
            symbols (BTC, ETH). If you do not know the coin id for your token, you can find it
            on:<br />
            <a class="underline cursor-pointer" @click="open"
              >CoinGecko -> click on a token -> api id.</a
            >
          </li>
        </ul>
        <i>feel free to DM me if you encounter any issues.</i>
      </div>
      <div class="b-1px b-solid b-white p-16px rd-regular b-op-30">
        <p class="text-20px mt-16px c-primary">Version 2023.12.25 Mery Christmas! 🎄🎄🎄</p>
        <ul class="text-start">
          <li><span class="c-primary">NEW:</span> Total Asset Value Info Box</li>
          <li><span class="c-primary">NEW:</span> 2current price indicator on Block Detail</li>
          <li>
            <span class="c-primary">NEW:</span> token prices refreshes automatically every minute
          </li>
          <li><span class="c-primary">NEW:</span> hdisplay token info update date and time</li>
          <li>fix: minor bugs and errors</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BasicModal from '@/components/modal/BasicModal.vue'
import { useModal } from 'vue-final-modal'
import { RouterLink } from 'vue-router'

const { open, close } = useModal({
  component: BasicModal,
  attrs: {
    onConfirm() {
      close()
    },
    onClose() {
      close()
    },
    escToClose: true,
    title: 'How To Find Token ID on CoinGecko'
  },
  slots: {
    default: `
    <div class="flex-col-center gap-5">
      <a href="https://www.coingecko.com/" target="_blank">
        
        <img src="/images/modals/image_api_sample.png" style="width: 1000px" />
        </a>
      <a href="https://www.coingecko.com/" target="_blank" class=" c-text-asPrimary">https://www.coingecko.com/</p>
      </div>
    `
  }
})
</script>

<style scoped>
li {
  list-style: circle;
}
</style>
