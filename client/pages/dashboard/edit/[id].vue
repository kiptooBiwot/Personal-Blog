<script setup>
definePageMeta({
  layout: 'dashboard',
  middleware: ['auth']
})

const route = useRoute()
console.log('ROUTE: ', route)
</script>

<template>
  <div class="bg-gray-50">
    <div class="py-10 px-5 rounded-md bg-white shadow-sm">
      Edit an article
      {{ route.params.id }}
    </div>
  </div>
</template>


<style scoped></style>