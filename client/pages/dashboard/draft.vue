<script setup>
import { onMounted } from 'vue'
import { useArticleStore } from '@/stores/articleStore.js'

const articleStore = useArticleStore()

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth']
})

const articles = ref()
onMounted(async () => {
  await articleStore.getAllDraftArticles()
  articles.value = articleStore.draftArticles
})
</script>

<template>
  <div class="p-5">
    <h4 class="font-bold text-xl">You Draft Articles</h4>

    <DashboardArticleTable :articles="articles" />
  </div>
</template>


<style scoped></style>