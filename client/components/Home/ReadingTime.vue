<script setup>
import { computed } from '@vue/reactivity';

const props = defineProps(['articleText'])
const computedReadingTime = ref('')

const WORDS_PER_MINUTE = 250

const readingTime = computed(() => {
  const words = props.articleText.split('').length

  const calculatedReadingTime = Math.ceil(words / WORDS_PER_MINUTE)

  // Format text and set it to computedReadingTime
  return computedReadingTime.value = calculatedReadingTime > 1 ? calculatedReadingTime + ' minutes read' : calculatedReadingTime + ' minute read'
})

</script>

<template>
  <span>
    {{ readingTime }}
  </span>
</template>


