<template>
  <form
    class="b-none rd-regular flex-col-center relative bg-gradient-to-b from-#A0C3FC to-#5E3268 cursor-pointer d-transition hover:shadow-[0px_0px_15px_#A0C3FC]"
    :class="[
      sizeType,
      {
        'headline-regular': sizeType === 'size-S',
        'shadow-[0px_0px_10px_5px_#A0C3FC]!': isBlockSelected,
        'scale-95': isClicked
      }
    ]"
    @dblclick="handleIsShowInput"
    @submit.prevent="onSubmit"
    @click="handleClick"
  >
    <div
      class="absolute bg-bg-asPrimary w-95% h-95% top-50% translate-y--50% left-50% translate-x--50% rd-regular flex-col-center"
    >
      <span
        v-show="!isShowInput"
        class="headline-medium c-text-asInverse-01 uppercase p-4px text-center min-w-80%"
        style="letter-spacing: 2px"
        :class="{ 'headline-regular': sizeType === 'size-S' }"
      >
        {{ tickerSymbol }}
      </span>
      <input
        ref="inputRef"
        v-show="isShowInput"
        type="text"
        class="w-80px b-none bg-transparent c-text-asPrimary fw-700 text-20px b-transparent mb-8px"
        @keyup.enter.prevent="onSubmit"
      />
      <span
        class="headline-regular font-normal c-text-asPrimary mt-8px"
        :class="{ 'headline-small': sizeType === 'size-S' }"
      >
        ${{ price }}
      </span>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, onUpdated } from 'vue'

const props = defineProps({
  tickerSymbol: { type: String },
  currency: String,
  sizeType: String,
  price: Number,
  tickerSlot: Number,
  isShowInput: Boolean,
  isBlockSelected: Boolean
})

const inputRef = ref<HTMLInputElement | null>(null)
const isClicked = ref(false)

const emit = defineEmits(['update-ticker', 'handleToggleBlockDetail'])

const onSubmit = (e: any) => {
  console.log(e.target.value)
  emit('update-ticker', e.target.value, props.tickerSlot)
}

const handleIsShowInput = async () => {
  await emit('update-is-show-input', props.tickerSlot)
  if (inputRef.value) {
    inputRef.value.focus()
    inputRef.value.value = ''
  }
}

const handleClick = () => {
  emit('handleToggleBlockDetail', props.tickerSlot)
  isClicked.value = true
  setTimeout(() => {
    isClicked.value = false
  }, 300)
}
</script>

<style scoped>
.size-L {
  width: 310px;
  height: 310px;
}
.size-M {
  width: 140px;
  height: 140px;

  @media (min-width: 1024px) {
    width: 180px;
    height: 180px;
  }
}
.size-S {
  width: 123px;
  height: 123px;

  @media (max-width: 1024px) {
    width: 140px;
    height: 140px;
  }
}

.d-transition {
  transition: all 0.2s cubic-bezier(0.22, 1, 0.36, 1);
}
</style>
