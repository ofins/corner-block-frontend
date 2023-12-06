<template>
  <div class="bg-bg-asPrimary w-full flex justify-center items-center <md:flex-col my-100px">
    <div>
      <img
        src="/icons/icons8-cube-100.png"
        class="animate-bounce-alt animate-count-infinite animate-duration-3s"
      />
      <div class="c-text-asPrimary mt-20 text-center">
        <p>
          Built by
          <a
            class="font-italic decoration-none c-inherit"
            target="_blank"
            href="https://twitter.com/ofinsNFT"
            >ofins.ron</a
          >
        </p>
      </div>
    </div>
    <div class="c-text-asPrimary max-w-500px md:ml-100px px-16px flex flex-col justify-start gap-2">
      <div class="b-1px b-solid b-white p-16px rd-regular b-op-30">
        <p>Important:</p>
        <p>- CornerBlock is powered by CoinGecko's free API, update frequency is every minute or so.</p>
        <p>- Currently search term only supports coin id (bitcoin, ethereum) and <u>NOT</u> coin symbols (BTC, ETH). If you do not know the coin id for your token, you can find it on CoinGecko at "api id".</p>
      </div>
      <div class="b-1px b-solid b-white p-16px rd-regular b-op-30">
        <p class="mt-16px">Version 2023.12.4</p>
        <ul class="text-start">
          <li>Allow multi-editing of existing block through modal</li>
          <li>increase blocks number from 5 to 11</li>
          <li>added glowing border when block is selected</li>
          <li>prices updates correctly</li>
          <li>fix minor bugs</li>
        </ul>
      </div>
      <div class="b-1px b-solid b-white p-16px rd-regular b-op-30">
        <p class="mt-16px c-primary">Version 2023.12.6</p>
        <ul class="text-start">
          <li>redesign theme color and style</li>
          <li>search queries now works with hyphens</li>
          <li>added percentage change stats to top right of block detail</li>
          <li>block detail style changed to fit dark mode theme</li>
          <li>fix minor bugs</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>

li {
  list-style:circle;
}

</style>
