<script setup>


</script>

<template>
  <main>
    <slot />
    <!-- <ClientOnly>

              </ClientOnly> -->
    <ClientOnly>
      <ToastList />
    </ClientOnly>
    <!-- <Spinner /> -->



  </main>
</template>


<style scoped></style>