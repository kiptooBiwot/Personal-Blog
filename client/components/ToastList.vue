<script setup>
import { useToastStore } from "@/stores/toastStore"

const toast = useToastStore()

const closeToast = (index) => {
  toast.remove(index)
}

</script>

<template>
  <TransitionGroup tag="div" enter-from-class="translate-x-full opacity-0" enter-to-class="duration-500"
    leave-active-class="duration-500" leave-to-class="translate-x-full opacity-0"
    class="fixed top-4 right-4 z-40 space-y-4 min-w-[320px] flex-wrap">
    <ToastMessage v-for="notification in toast.notifications" :key="notification.id" :notification="notification"
      @closeToast="closeToast(index)" />
  </TransitionGroup>
</template>


<style lang="scss" scoped></style>