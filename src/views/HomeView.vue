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
          <a v-tooltip.bottom="'link to my twitter page'" target="_blank" class="c-inherit" href="https://twitter.com/ofinsNFT">my twitter</a>
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
          <li>
            Currently search term only supports coin id (bitcoin, ethereum) and <u>NOT</u> coin
            symbols (BTC, ETH). If you do not know the coin id for your token, you can find it
            on:<br />
            CoinGecko -> click on a token -> api id.
          </li>
        </ul>
        <i>feel free to DM me if you encounter any issues.</i>
      </div>
      <!-- <div class="b-1px b-solid b-white p-16px rd-regular b-op-30">
        <p class="mt-16px">Version 2023.12.6</p>
        <ul class="text-start">
          <li>redesign theme color and style</li>
          <li>search queries now works with hyphens</li>
          <li>added percentage change stats to top right of block detail</li>
          <li>block detail style changed to fit dark mode theme</li>
          <li>fix minor bugs</li>
        </ul>
      </div> -->
      <div class="b-1px b-solid b-white p-16px rd-regular b-op-30">
        <p class="text-20px mt-16px c-primary">Version 2023.12.9</p>
        <ul class="text-start">
          <li>
            <span class="c-primary">NEW feature:</span> Automatically screenshot and copy your bags
            to clipboard!
          </li>
          <li>
            <span class="c-primary">NEW feature:</span> ability to add total holding amount for each
            coin and display it on blocks. Can hide value in general setting.
          </li>
          <li>temporarily remove sidebar transition (causing bugs)</li>
          <li>add clear ALL tokens button in sidebar</li>
          <li>added new button styles</li>
          <li>Add Twitter Summary Card</li>
          <li>fix minor bugs</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
li {
  list-style: circle;
}
</style>
