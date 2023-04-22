<script setup>
import { computed } from '@vue/reactivity';
import { useTimeAgo } from '@vueuse/core'

const props = defineProps({
  article: {
    type: Object,
    required: true
  },
  index: {
    type: Number
  }
})

</script>

<template>
  <NuxtLink :to="`/article/${article.slug}`">
    <div class="flex gap-5 p-5 cursor-pointer font-body hover:shadow-sm">
      <!-- {{ article }} -->
      <div class="">
        <p class="text-5xl font-semibold text-gray-200">0{{ index + 1 }}</p>
      </div>
      <div class="space-y-2">
        <p class="font-bold text-gray-500 text-xs">{{ article.author }}</p>
        <p class="font-semibold text-2xl">{{ article.title }} </p>
        <div class="flex gap-10 text-gray-500  font-bold text-xs">
          <!-- <p>{{ datePosted }}</p> -->
          <p>
            <TimeAgo :date="article.updatedAt" />
          </p>
          <p>
            <HomeReadingTime :articleText="article.content" />
          </p>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>


<style scoped></style>