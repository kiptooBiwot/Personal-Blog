<script setup>
import { onMounted } from 'vue';
import { useArticleStore } from '@/stores/articleStore'
import { useNow, useDateFormat } from '@vueuse/core'
import { computed } from '@vue/reactivity';

const route = useRoute()
const articleStore = useArticleStore()

console.log('ROUTER: ', route.params.slug);

const thisArticle = ref(null)

onMounted(async () => {
  articleStore.getCategories()

  const article = await articleStore.allArticles.filter(article => article.slug === route.params.slug)

  thisArticle.value = article[0]
})

const publishedOn = computed(() => {
  if (thisArticle) {

    return useDateFormat(thisArticle.updatedAt, 'MMM DD, YYYY', { locales: 'en-US' })
  }
})
</script>

<template>
  <div v-if="thisArticle" class="max-w-6xl mx-auto space-y-7 py-20">
    <!-- THISARTICLE: {{ thisArticle }} -->
    <div class="grid grid-col-1 md:grid-cols-12 gap-5">
      <div class=" col-span-9 space-y-5">
        <div class="flex gap-4">
          <img
            src="https://images.unsplash.com/photo-1622031093531-f4e641788763?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTMyfHxwcm9maWxlJTIwcGhvdG98ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
            alt="" class="object-top object-cover rounded-full w-16 h-16">
          <div class="space-y-1 font-sans">
            <!-- TODO: Format how username appears -->
            <h4 class="font-bold text-lg">{{ thisArticle.user.name }}</h4>
            <div class="flex gap-1 items-center font-semibold text-sm text-gray-500">
              <span> Published {{ useDateFormat(thisArticle.updatedAt, 'MMM DD, YYYY', { locales: 'en-US' })
              }}</span>
              -
              <span>
                <ClientOnly>
                  <HomeReadingTime :articleText="thisArticle.content" />
                </ClientOnly>
              </span>
            </div>
          </div>
        </div>
        <div class="space-y-3">
          <h2 class="font-display text-5xl font-bold">{{ thisArticle.title }}</h2>
          <h4 class="text-gray-400 font-medium text-2xl">{{ thisArticle.description }}
          </h4>
        </div>
        <div class="py-8">
          <img :src="thisArticle.photo" alt="" class="w-full h-96 object-cover object-top">
        </div>
        <div v-html="thisArticle.content" class=" text-[18px] text-gray-700 leading-8 space-y-10"></div>
      </div>
      <div class="relative w-full md:col-span-3">
        <div class="absolute rounded-md w-full md:w-[290px] h-auto bg-gray-100 p-10 scroll">
          <h3 class="font-bold text-sm uppercase pb-5">Categories</h3>
          <ul class="space-y-5 text-xs">
            <li v-for="(category, index) in articleStore.categories" :key="index">
              {{ category.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped></style>