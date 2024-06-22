<script setup lang="ts">
import { ref, computed } from 'vue-demi'

export interface Props {
  tagBackgroundColor?: string
  tagTextColor?: string
  ariaLabelShowText?: string
  tooltipText?: string
  hoverMode?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  tagBackgroundColor: '#131313',
  tagTextColor: 'transparent',
  tooltipText: 'Click to reveal',
  hoverMode: false
})

const emits = defineEmits<{
  (e: 'reveal', isRevealed: boolean): void
}>()

const tooltipShown = ref(true)
const isRevealed = ref(false)

const spoilerClass = computed(() => {
  return isRevealed.value ? 'reveal' : 'hide'
})

function showSpoiler() {
  isRevealed.value = true
  tooltipShown.value = false
  emits('reveal', isRevealed.value)
}

function hideSpoiler() {
  isRevealed.value = false
  tooltipShown.value = true
  emits('reveal', isRevealed.value)
}

function handleMouseOver() {
  if (!props.hoverMode) {
    return
  }
  showSpoiler()
}

function handleMouseLeave() {
  if (!props.hoverMode) {
    return
  }
  hideSpoiler()
}
</script>

<template>
  <span
    class="spoiler"
    :class="spoilerClass"
    :title="tooltipShown ? props.tooltipText : ''"
    @click="showSpoiler"
    @mouseover="handleMouseOver"
    @mouseleave="handleMouseLeave"
  >
    <slot />
  </span>
</template>

<style scoped>
.spoiler {
  border-radius: 2px;
  transition: background 0.5s ease-out;
  cursor: pointer;
  display: inline-block;
}

.reveal {
  background-color: transparent;
  color: inherit;
  user-select: auto;
  cursor: auto;
}

.hide {
  user-select: none;
  background-color: v-bind('props.tagBackgroundColor');
  color: v-bind('props.tagTextColor');
  cursor: pointer;
}
</style>
