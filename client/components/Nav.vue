<script setup>

const navItems = reactive([
  { title: 'Write', url: '/dashboard/new-article' },
  // { title: 'Sign In', url: '/auth' },
  // { title: 'Write', url: '' },
])
</script>

<template class="fixed">
  <div class="border-b border-gray-800">
    <div class="max-w-6xl mx-auto py-4 flex items-center justify-between">
      <NuxtLink to="/">
        <div class="flex items-center gap-2">
          <div>
            <span class="w-4 h-4 rounded-full bg-gray-800 text-gray-800">oo</span>
            <span class="w-4 h-4 rounded-full bg-gray-800 text-gray-800">do</span>
          </div>
          <h2 class="font-bold text-2xl font-title">blogg</h2>
        </div>
      </NuxtLink>
      <div class="flex items-center gap-5">
        <div>
          <ul class="flex gap-5">
            <li v-for="item in navItems" :key="item.title">
              <NuxtLink :to="item.url">
                {{ item.title }}
              </NuxtLink>
            </li>
          </ul>
        </div>
        <NuxtLink to="/auth">
          <button
            class="py-3 px-5 rounded-sm bg-gray-800 text-white shadow-sm font-semibold text-sm hover:scale-105 hover:bg-gray-900 hover:text-gray-100 transition duration-300 ease-in-out">
            Get Started
          </button>
        </NuxtLink>
      </div>

    </div>
  </div>
</template>


<style scoped>

</style>