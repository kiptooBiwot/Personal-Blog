<script setup>
import { PencilSquareIcon, TrashIcon } from "@heroicons/vue/24/outline"
import { useNow, useDateFormat } from '@vueuse/core'

const props = defineProps(['articles', 'editArticle', 'deleteArticle'])
</script>

<template>
  <div>
    <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
      <thead class="bg-gray-50">
        <tr>
          <th scope="col" class="px-6 py-4 font-medium text-gray-900">Image</th>
          <th scope="col" class="px-6 py-4 font-medium text-gray-900">Article's Title</th>
          <th scope="col" class="px-6 py-4 font-medium text-gray-900">State</th>
          <th scope="col" class="px-6 py-4 font-medium text-gray-900">Category</th>
          <th scope="col" class="px-6 py-4 font-medium text-gray-900">Date Published</th>
          <th scope="col" class="px-6 py-4 font-medium text-gray-900"></th>
        </tr>
      </thead>
      <tbody v-for="article in articles" :key="article._id" class="divide-y divide-gray-100 border-t border-gray-100">
        <tr class="hover:bg-gray-50">
          <td class="flex gap-3 px-6 py-4 font-normal text-gray-900">
            <div class="relative h-24 w-36">
              <img class="h-full w-full rounded-md object-cover object-center" :src="article.photo" alt="" />
            </div>
          </td>
          <td class="px-6 py-4">
            <div class="text-sm">
              <div class="font-medium text-gray-700">{{ article.title }}</div>
              <div class="text-gray-400">{{ article.description }}</div>
            </div>
          </td>
          <td class="px-6 py-4">
            <span v-if="article.published"
              class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
              <span class="h-1.5 w-1.5 rounded-full bg-green-600"></span>
              Published
            </span>
            <span v-else
              class="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-1 text-xs font-semibold text-rose-600">
              <span class="h-1.5 w-1.5 rounded-full bg-rose-600"></span>
              Draft
            </span>
          </td>
          <td class="px-6 py-4">{{ article.category.name }}</td>
          <td class="px-6 py-4">
            {{ useDateFormat(article.createdAt, 'MMM, DD YYYY') }}
          </td>
          <td class="px-6 py-4">
            <div class="flex justify-end gap-4">
              <div class="bg-blue-50 rounded-md p-1 hover:bg-blue-100 hover:scale-105 transition duration-700 ease-in-out"
                @click.prevent="$emit('editArticle', article._id)">
                <PencilSquareIcon class="h-6 w-6 text-blue-500" />
              </div>
              <div class="bg-rose-50 rounded-md p-1 hover:bg-rose-100 hover:scale-105 transition duration-700 ease-in-out"
                @click.prevent="$emit('deleteArticle', article._id)">
                <TrashIcon class="w-6 h-6 text-rose-500" />
              </div>

            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<style lang="scss" scoped></style>