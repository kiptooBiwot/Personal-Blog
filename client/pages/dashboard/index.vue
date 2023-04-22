<script setup>
import { useToastStore } from "@/stores/toastStore"
import { useAuthStore } from '@/stores/authStore'
import { useArticleStore } from '@/stores/articleStore'
import { onMounted } from "vue";

import { storeToRefs } from "pinia";

const toast = useToastStore()
const auth = useAuthStore()
const articleStore = useArticleStore()
const route = useRouter()
// const formatted = useDateFormat(this.article.createdAt, 'MMM,DD YYYY HH:mm:ss')

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth']
})

const user = useCookie('user')

onMounted(async () => {
  await articleStore.getUserArticles()
})
// const articles = articleStore.userArticles

// const articles = computed(() => {
//   articleStore.userArticles
// })

const { userArticles: articles } = storeToRefs(articleStore)

const editArticle = async (index) => {
  console.log('ARTICLE ID: ', index);
  await articleStore.startEditProcess(index)
  route.push(`/dashboard/new-article`)
}

const deleteArticle = (index) => {
  console.log('Payload on function ', index)
  articleStore.deleteArticle(index)
}
</script>

<template>
  <div class="bg-gray-50">
    <div class="bg-white rounded-md shadow w-full min-h-screen p-10 space-y-6">
      <div class="bg-gray-50 p-5 rounded-md shadow">
        <h2 class="text-lg font-bold">Hello, {{ user.name }}</h2>
      </div>
      <div>
        <h3 class="font-bold text-xl my-5">Your articles</h3>
        <!-- {{ articles }} -->
        <div v-if="articleStore.userArticles.length < 1">
          <h2 class="font-medium text-center text-lg">So empty, you have not written any articles yet. You may want to
            write new
            articles.</h2>
          <img src="@/assets/images/not-found.svg" alt="" class="mx-auto w-1/2 h-3/4 my-10">
        </div>
        <div v-else class="overflow-hidden rounded-lg border border-gray-200 shadow-md ">
          <DashboardArticleTable :articles="articles" @editArticle="editArticle" @deleteArticle="deleteArticle" />
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped></style>