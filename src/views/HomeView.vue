<template>
  <div class="bg-bg-asPrimary w-full flex justify-center items-center <md:flex-col my-100px">
    <div class="py-5 flex-col-center">
      <img
        src="/icons/icons8-cube-100.png"
        class="animate-bounce-alt animate-count-infinite animate-duration-3s"
      />
      <div class="c-text-asPrimary mt-20 text-center">
        <p>
          Built by
          <a
            v-tooltip="'my official ronin RNS'"
            class="font-italic c-inherit"
            target="_blank"
            href="https://id.roninchain.com/name/ofins.ron"
            >ofins.ron</a
          >
          . Created Nov 19, 2023.
        </p>
        <p>
          Come say hi! 👋 ->
          <a
            v-tooltip.bottom="'link to my twitter page'"
            target="_blank"
            class="c-inherit"
            href="https://twitter.com/ofinsNFT"
            >my twitter</a
          >
        </p>
      </div>
    </div>
    <div class="c-text-asPrimary max-w-500px md:ml-100px px-16px flex flex-col justify-start gap-2">
      <div class="b-1px b-solid b-white p-16px rd-regular b-op-30">
        <p class="text-20px"><u>Important</u>:</p>
        <ul class="my-24px">
          <li>
            CornerBlock is powered by CoinGecko's free API, update frequency is every minute or so.
          </li>
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
        <p class="text-20px mt-16px c-primary">Version 2023.12.16</p>
        <ul class="text-start">
          <li><span class="c-primary">NEW:</span> Token Images</li>
          <li><span class="c-primary">NEW:</span> 24 hour price change</li>
          <li>
            <span class="c-primary">NEW:</span> hovering over some text/numbers will display
            description
          </li>
          <li><span class="c-primary">NEW:</span> how to find Token API modal in Home</li>
          <li>update: only show image/percentage if token has value</li>
          <li>
            update: most large numbers (>1000) will display with abbreviatedCharacter and decimal
            value of 1
          </li>
          <li>add clear ALL tokens button in sidebar</li>
          <li>update: add Trilliion character to abbreviated numbers</li>
          <li>fix: minor bugs and errors</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BasicModal from '@/components/modal/BasicModal.vue'
import { useModal } from 'vue-final-modal'

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
