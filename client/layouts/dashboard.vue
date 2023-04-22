<script setup>
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/solid'
import { onClickOutside } from '@vueuse/core'
import { useAuthStore } from '../stores/authStore'

const authStore = useAuthStore()
const router = useRouter()

const showMenu = ref(false)
const sideMenu = ref(null)

onClickOutside(sideMenu, () => {
  showMenu.value = false
})

const runLogout = async () => {
  await authStore.logout()

  if (!authStore.authenticated) {
    router.push('/')
  }
}

</script>

<template>
  <main>

    <div class="md:flex">
      <!-- Mobile Nav -->

      <!-- <div class="relative h-screen overflow-hidden"> -->
      <div class="w-[250px] sticky top-0 overflow-y-hidden h-screen bg-gray-900 text-white py-10 px-4 hidden md:block">
        <div class="flex items-center justify-center gap-2">
          <div>
            <span class="w-4 h-4 rounded-full bg-gray-200 text-gray-200">oo</span>
            <span class="w-4 h-4 rounded-full bg-gray-200 text-gray-200">do</span>
          </div>
          <h2 class="font-bold text-2xl font-title">blogg</h2>
        </div>
        <div class="flex flex-col justify-between">
          <DashboardNav />
        </div>
      </div>
      <!-- </div> -->
      <div class="flex-1 relative ">
        <div class=" top-0 left-0 right-0 h-14 w-full bg-white shadow-md">
          <div class="flex justify-between items-center px-5 py-2">
            <Bars3Icon v-if="!showMenu" class="w-8 h-8 text-gray-500 md:hidden" @click.prevent="showMenu = !showMenu" />

            <XMarkIcon v-if="showMenu" class="w-8 h-8 text-gray-500 md:hidden" @click.prevent="showMenu = !showMenu" />
            <div>Search</div>
            <div class="flex items-center gap-4">
              <NuxtLink to="/"
                class=" text-green-600 py-1 px-2 rounded bg-green-100  hover:bg-green-300 hover:text-white hover:border-green-300 transition duration-700 ease-in-out">
                Blogg Home</NuxtLink>
              <!-- <h3>Notifications</h3> -->
              <div class="w-11 h-11 rounded-full bg-gray-200"></div>
              <button class="px-3 py-2 bg-red-400 rounded text-white text-xs uppercase"
                @click.prevent="runLogout">Logout</button>
            </div>
          </div>
          <div v-if="showMenu" ref="sideMenu"
            class="absolute left-0 top-0 w-[250px]  bg-gray-900 text-white py-10 px-4 md:hidden block">
            <div class="flex items-center justify-center gap-2">
              <div>
                <span class="w-4 h-4 rounded-full bg-gray-200 text-gray-200">oo</span>
                <span class="w-4 h-4 rounded-full bg-gray-200 text-gray-200">do</span>
              </div>
              <h2 class="font-bold text-2xl font-title">blogg</h2>
            </div>
            <div class="flex flex-col justify-between">
              <DashboardNav @closeMenu="showMenu = !showMenu" />
            </div>
          </div>
        </div>
        <div class="py-6 px-5 bg-gray-50 h-full">
          <slot />
          <!-- <ClientOnly> -->
          <!-- <Notification /> -->
          <!-- <notification-list /> -->
          <!-- </ClientOnly> -->
          <ClientOnly>
            <ToastList />
          </ClientOnly>
          <!-- <Spinner /> -->
        </div>
      </div>
    </div>
  </main>
</template>


<style scoped></style>