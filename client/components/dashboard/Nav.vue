<script setup>
import { Squares2X2Icon, HomeIcon, DocumentTextIcon, PencilSquareIcon, Cog8ToothIcon, UserIcon } from '@heroicons/vue/24/solid'

const icons = reactive({
  dashboard: Squares2X2Icon,
  home: HomeIcon,
  article: DocumentTextIcon,
  draft: PencilSquareIcon,
  settings: Cog8ToothIcon,
  profile: UserIcon
})

const menuItems = reactive([
  { title: 'Admin Dashboard', url: '/dashboard', icon: icons.dashboard },
  { title: 'Dashboard', url: '/dashboard', icon: icons.dashboard },
  { title: 'Posts', url: '/dashboard/posts', icon: icons.article },
  { title: 'Draft Articles', url: '/dashboard/draft', icon: icons.draft },
  { title: 'Settings', url: '/dashboard/settings', icon: icons.settings },
  { title: 'Profile', url: '/dashboard/profile', icon: icons.profile },
])

const closeMenu = () => {
  this.$emit(closeMenu)
}
</script>

<template>
  <div class="mt-5">
    <div class="mb-5">
      <NuxtLink to="/dashboard/new-article" @click.prevent="$emit('closeMenu')">
        <button class="py-3 text-sm w-full rounded-md bg-green-600 hover:bg-green-500">
          New Post
        </button>
      </NuxtLink>
    </div>
    <div class="flex flex-col justify-between">
      <ul class="">
        <li v-for="item in menuItems" :key="item.title" class="text-sm py-3 px-3 hover:bg-gray-600 rounded-md"
          @click.prevent="$emit('closeMenu')">
          <NuxtLink :to="item.url" class="">
            <div class="flex gap-2">
              {{ item.title }}
            </div>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>


<style scoped>

</style>