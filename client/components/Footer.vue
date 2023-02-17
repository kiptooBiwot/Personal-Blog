<template>
  <div class="w-full mx-auto bg-gray-900 py-10 text-white">
    <div class="max-w-6xl mx-auto">
      <div class="w-full space-y-5">
        <NuxtLink to="/">
          <div class="flex items-center justify-center gap-2">
            <div>
              <span class="w-4 h-4 rounded-full bg-gray-200 text-gray-200">oo</span>
              <span class="w-4 h-4 rounded-full bg-gray-200 text-gray-200">do</span>
            </div>
            <h2 class="font-bold text-2xl font-title">blogg</h2>
          </div>
        </NuxtLink>
        <p class="text-center text-sm">&copy; {{ new Date().getFullYear() }} - All Rights Reserved</p>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>

</style>