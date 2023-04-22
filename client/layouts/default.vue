<script setup>

</script>

<template>
  <div>
    <header>
      <Nav />
    </header>
    <main>
      <slot />
      <ClientOnly>
      <ToastList />
    </ClientOnly>
      <!-- <Spinner /> -->
      <!-- <ClientOnly>
                <NotificationList />
              </ClientOnly> -->
    </main>
    <footer>
      <Footer />
    </footer>
  </div>
</template>


<style scoped></style>