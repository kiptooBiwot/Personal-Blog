<script setup>


const articles = reactive([
  { title: 'No, Elon and Jack are not competitors. They are collaborating.', author: 'John Smith', date: 'Jan 25', readTime: 5, slug: 'no-elon-and-jack-are-not-competitors' },
  { title: 'This is the second article.', author: 'John Smith', date: 'Jan 25', readTime: 7 },
  { title: 'This is the third article. Let\'s go', author: 'John Doe', date: 'Jan 25', readTime: 3 },
  { title: 'This is the fourth article. Let\'s go', author: 'John Alex', date: 'Jan 25', readTime: 6 },
  { title: 'This is the fifth article. Let\'s go', author: 'John Snoop', date: 'Jan 25', readTime: 2 },
  { title: 'This is the sixth article. Let\'s go', author: 'John Rambo', date: 'Jan 25', readTime: 10 },
])
</script>

<template>
  <div>
    <div class="bg-orange-100 h-1/2 w-full py-16 border-b border-gray-800">
      <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2">
        <div class="space-y-4">
          <h1 class="text-6xl font-bold">
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
          <img src="@/assets/images/blogging.png" alt="" class="w-80 h-w-80">
        </div>
      </div>
    </div>
    <div class="py-16 border-b border-gray-800">
      <div class="max-w-6xl mx-auto">
        <h4 class="uppercase text-sm font-bold pb-5">Latest Articles</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <HomeFeatured v-for="(article, index) in articles" :key="index" :article="article" :index="index" />
        </div>
      </div>
    </div>
    <div class="py-20">
      <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">
        <div class="col-span-8 space-y-10">
          <div v-for="(article, index) in articles.slice(1, 4)" :key="index">
            <NuxtLink :to="`/article/${article.slug}`" class="flex justify-between">
              <div>
                <p class="font-bold text-gray-500 text-xs">{{ article.author }}</p>
                <p class="font-semibold text-3xl">{{ article.title }} </p>
                <p class="text-gray-400 font-medium text-lg">Learning that self-discovery is a process, not a
                  punishment
                </p>
                <div class="flex gap-10 text-gray-500  font-bold text-xs">
                  <p>{{ article.date }}</p>
                  <p>{{ article.readTime }} min read</p>
                </div>
              </div>
              <div class="">
                <img
                  src="https://images.unsplash.com/photo-1605379399843-5870eea9b74e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=898&q=80"
                  alt="" class="w-64 h-32 object-cover object-top place-items-end">
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

<style lang="scss" scoped>

</style>