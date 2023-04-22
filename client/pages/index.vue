<script setup>

import { useArticleStore } from "@/stores/articleStore.js"
import { storeToRefs } from "pinia"

const articleStore = useArticleStore()

const { allArticles } = storeToRefs(articleStore)

// const articlePostDate = useTimeAgo(allArticles.updatedAt)

onMounted(() => {
  articleStore.getArticles()
})

</script>

<template>
  <div>
    <div class="bg-teal-500 h-1/2 w-full py-16 border-b border-gray-800">
      <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2">
        <div class="space-y-4">
          <h1 class="text-6xl  font-bold">
            Learning while Blogging.
          </h1>
          <p class="text-gray-600 text-2xl pb-4">Learn better by documenting your learning process, blog by blog.</p>
          <NuxtLink to="/auth">
            <button
              class="py-4 px-8 rounded-sm bg-gray-800 text-white shadow-sm font-semibold hover:scale-105 hover:bg-gray-900 hover:text-gray-100 transition duration-300 ease-in-out">
              Get Started
            </button>
          </NuxtLink>
        </div>
        <div class="flex items-center justify-center">
          <img src="@/assets/images/blogging.png" alt="" class="w-80 h-80 rounded-full">
        </div>
      </div>
    </div>
    <div class="py-16 border-b border-gray-800">
      <div class="max-w-6xl mx-auto">
        <h4 class="uppercase text-sm font-bold pb-5">Latest Articles</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <HomeFeatured v-for="(article, index) in allArticles.slice(0, 6)" :key="index" :article="article"
            :index="index" />
        </div>
      </div>
  </div>
  <div class="py-20">
      <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">
        <div v-if="allArticles" class="col-span-8 space-y-10">
          <div v-for="(article, index) in allArticles.slice(0, 3)" :key="index">
            <NuxtLink :to="`/article/${article.slug}`" class="flex justify-between gap-4">
              <div>
                <p class="font-bold text-gray-500 text-xs">{{ article.user.name }}</p>
                <p class="font-semibold text-3xl">{{ article.title }} </p>
                <p v-html="article.content.slice(0, 100) + '...'" class="text-gray-400 font-medium text-base">
                </p>
                <div class="flex gap-10 text-gray-500  font-bold text-xs">

                  <!-- <ClientOnly> -->
                  <TimeAgo :date="article.updatedAt" />
                  <!-- </ClientOnly> -->
                  <!-- <p>
                              {{ timeAgo = useTimeAgo(new Date(article.updatedAt)) }}
                            </p> -->
                  <!-- <span class="px-2">|</span> -->
                  <p>
                    <HomeReadingTime :articleText="article.content" />
                  </p>
                </div>
              </div>
              <div class="">
                <img :src="article.photo" alt=""
                  class="w-64 h-32 object-cover rounded-md shadow object-top place-items-end">
              </div>
            </NuxtLink>
          </div>
        </div>
        <div class="col-span-12 md:col-span-4 p-10  bg-gray-900 text-white">
          <h3 class="font-bold text-sm uppercase pb-5 text-center">About</h3>
          <p class="leading-loose justify-evenly text-sm">
            This blogging platform is built with Nuxt 3, Vue 3, and TailwindCSS on the front-end. It is backed up by
            Node.js, Express, and MongoDB on the back-end. It allows a writer/blogger to register and
            start writing/blogging after they are successfully authenticated. Enjoy!
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>