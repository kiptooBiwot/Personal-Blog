<script setup>
import { useTimeAgo } from '@vueuse/core'

const props = defineProps(['date'])

const datePosted = computed(() => {
  return useTimeAgo(new Date(props.date))
})
// console.log(datePosted);
</script>

<template>
  <div>
    {{ datePosted }}
  </div>
</template>

