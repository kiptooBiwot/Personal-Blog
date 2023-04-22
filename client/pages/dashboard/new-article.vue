<script setup>
// import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { useArticleStore } from '@/stores/articleStore'
import { onMounted } from 'vue';
import { CameraIcon, PlusCircleIcon, XMarkIcon } from '@heroicons/vue/24/solid';

const articleStore = useArticleStore()

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth']
})

onMounted(async () => {
  articleStore.getCategories()
})

const manyTags = [
  { label: 'JavaScript', value: 'JavaScript' },
  { label: 'Vue JS', value: 'Vue JS' },
  { label: 'Nuxt JS', value: 'Nuxt JS' },
  { label: 'TypeScript', value: 'TypeScript' },
  { label: 'Beginner', value: 'Beginner' },
]
const newCategory = ref('')
const draft = ref('draft')
const publish = ref('publish')

const formData = reactive({
  title: '',
  description: '',
  content: '',
  photo: '',
  category: '',
  tags: []
})

let imageUrl = ref('')

const articleOnEdit = articleStore.filteredArticle

if (articleStore.isEditing === true) {
  formData.title = articleOnEdit[0].title
  formData.description = articleOnEdit[0].description
  formData.content = articleOnEdit[0].content
  imageUrl.value = articleOnEdit[0].photo
  formData.category = articleOnEdit[0].category.name
  formData.tags = articleOnEdit[0].tags
}


const showModal = ref(false)

const saveArticle = (data, flag) => {
  if (flag === 'draft') {
    articleStore.saveArticle(data, flag)
  }
  if (flag === 'publish') {
    articleStore.saveArticle(data, flag)
  }
}

const clearForm = () => {
  formData.title = ''
  formData.description = ''
  formData.content = '',
    formData.photo = '',
    formData.category = '',
    formData.tags = ''
}


const saveCategory = () => {
  articleStore.addCategory(newCategory.value)

  showModal.value = false
}


const uploadFile = (event) => {
  const files = event.target.files

  // let filename = files[0].name
  const fileReader = new FileReader()
  fileReader.addEventListener('load', () => {
    imageUrl.value = fileReader.result
  })
  fileReader.readAsDataURL(files[0])
  // imageUrl.value = files[0]
  formData.photo = files[0]
}

const remove = () => {
  formData.photo = ""
  imageUrl.value = ""
}
</script>

<template>
  <div>
    {{ articleStore.articleBeingEdited }}
    <!-- <NotificationList v-if="" /> -->
    <div class="relative bg-white mx-auto w-full rounded-lg px-10 py-10 shadow-md">
      <div v-if="showModal" x-transition
        class="fixed top-0 left-0 flex h-full min-h-screen w-full items-center justify-center bg-black bg-opacity-90 px-4 py-5 z-20">
        <div class="w-full max-w-[570px] rounded-[20px] bg-white py-12 px-8  md:py-[60px] md:px-[70px]">
          <div class="text-center">
            <h3 class="text-dark pb-2 text-xl font-bold sm:text-2xl">
              Add a New Category
            </h3>
            <span class="bg-green-500 mx-auto mb-6 inline-block h-1 w-[90px] rounded"></span>
          </div>
          <div class="pb-10">
          <BaseInput v-model="newCategory" title="New Category" type="text" />
        </div>
        <div class="-mx-3 flex flex-wrap">
            <div class="w-1/2 px-3">
              <button @click.prevent="showModal = false"
                class="text-dark block w-full rounded-lg border border-[#E9EDF9] p-3 text-center text-base font-medium transition hover:border-red-600 hover:bg-red-600 hover:text-white">
                Cancel
              </button>
          </div>
          <div class="w-1/2 px-3">
            <button
              class="bg-green-500 border-green-500 block w-full rounded-lg border p-3 text-center text-base font-medium text-white transition hover:bg-opacity-90"
              @click.prevent="saveCategory()">
              Save Category
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- ARTICLE PAGE STUFF -->
    <h2 class="font-semibold text-2xl mb-5">Write a New Article</h2>

    <div class="space-y-2">
      <BaseInput v-model="formData.title" title="Title" type="text" />

        <BaseInput v-model="formData.description" title="Article's Short Description" type="text" />

        <!-- <BaseInput v-model="formData.photo" title="Accompanying Image" type="file" /> -->
        <div>
          <p class="text-xs font-semibold">Accompanying Image</p>
          <input ref="file" type="file" @change="uploadFile" accept="image/*"
            class="rounded-md border w-full border-gray-400 px-4 py-2 text-gray-500 placeholder:text-gray-400 placeholder:text-sm" />
        </div>
        <div class="block">
          <!-- <div>
                                                                                                              <label for="file" class="text-xs font-medium text-gray-500">Participant's Picture</label>
                                                                                                                    </div> -->
          <!-- <input ref="file" type="file" accept="images/*"
                                                                                                        class=" hidden w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-xs text-gray-500"
                                                                                                                  @change="uploadFile"> -->
          <div class="relative inline-block">
            <img :src="imageUrl" class=" w-48 h-32 object-cover border-0" alt="">
            <!-- :class="($v.basicInfo.profilePic.$error) ? 'ring-red-500 border-red-500 focus:ring-red-500 focus:border-red-500' : null" -->
            <div class="absolute top-0 h-full w-full bg-black bg-opacity-25 flex items-center justify-center">
              <button
                class="text-white hover:bg-white rounded-full hover:bg-opacity-25 p-3 focus:outline-none transition duration-300 text-xs"
                @click="remove">
                <XMarkIcon class="w-8 h-8" />
              </button>
            </div>
          </div>
        </div>
        <!-- <BaseInput v-model="formData.category" title="Category" type="text" /> -->
        <div class="space-y-1">
          <p class="text-xs font-semibold">Category</p>
          <div class="flex gap-3 items-center">
            <select v-model="formData.category" name="" id=""
              class="rounded-md border w-full border-gray-400 px-4 py-2 text-gray-500 placeholder:text-gray-400 placeholder:text-sm">
              <!-- <option v-if="articleStore.isEditing" :value="articleOnEdit[0].category._id" selected="">{{ formData.category }}
                  </option> -->
              <option v-for="(category, index) in articleStore.categories" :key="index" :value="category._id"
                :selected="formData.category !== '' ? formData.category : false"> {{
                  category.name
                }}
              </option>
            </select>
            <PlusCircleIcon class="w-10 h-10 text-teal-500" @click.prevent="showModal = true" />
          </div>

        </div>
        <!-- <BaseInput v-model="formData.tags" title="Tags" type="text" /> -->

        <div class="">
          <p class="text-xs font-semibold pb-1">Type in your article:</p>
          <client-only>
            <QuillEditor v-model:content="formData.content" contentType="html" theme="snow"
              class="pb-10 h-64 border border-gray-400 mb-4" />
          </client-only>
        </div>
        <div class="w-full md:flex justify-between gap-10 py-5">
          <div>
            <button
              class="px-12 py-3 mb-5 md:mb-0 w-full md:w-auto text-sm uppercase text-white bg-green-700 rounded-sm shadow-sm hover:bg-green-600"
              @click.prevent="clearForm">Clear</button>
          </div>
          <div v-if="!articleStore.isEditing" class="md:flex gap-7">
            <button
              class="px-6 py-3 mb-5 md:mb-0 w-full md:w-auto text-sm uppercase text-white bg-yellow-500 rounded-sm shadow-sm hover:bg-yellow-400"
              @click.prevent="saveArticle(formData, draft)">Save Article to Draft</button>
            <button
              class="px-6 py-3 mb-5 md:mb-0 w-full md:w-auto text-sm uppercase text-white bg-orange-500 rounded-sm shadow-sm hover:bg-orange-400"
              @click.prevent="saveArticle(formData, publish)">Save and Publish
              Article</button>
          </div>
          <div v-else class="md:flex gap-7">
            <button
              class="px-6 py-3 mb-5 md:mb-0 w-full md:w-auto text-sm uppercase text-white bg-orange-500 rounded-sm shadow-sm hover:bg-orange-400"
              @click.prevent="saveArticle(formData, draft)">Update Article</button>
            <!-- <button
                                          class="px-6 py-3 mb-5 md:mb-0 w-full md:w-auto text-sm uppercase text-white bg-orange-500 rounded-sm shadow-sm hover:bg-orange-400"
                                          @click.prevent="saveArticle(formData, publish)">Save and Publish
                                          Article</button> -->
          </div>
        </div>
      </div>

      <!-- <FormKit type="form" @submit="saveArticle">
                                                                                                                                      <div class="grid grid-cols-1 md:grid-cols-2 w-full gap-5">
                                                                                                                                        <div class="w-full">
                                                                                                                                          <FormKit type="text" label="Title" name="title" help="Type your article's heading here"
                                                                                                                                            validation="required" />
                                                                                                                                          <FormKit type="text" label="Description" name="description"
                                                                                                                                            help="A short abstract of the article, between 10-20 words" validation="required" />
                                                                                                                                          <FormKit type="select" label="Category" name="category" help="Select a category" validation="required" />
                                                                                                                                        </div>
                                                                                                                                        <div>
                                                                                                                                          <FormKit type="file" label="Article Image" name="photo" help="Add an image that describes your article"
                                                                                                                                            validation="required" />
                                                                                                                                          <FormKit type="text" label="Tags" name="tags" :options="manyTags" :value="['JavaScript', 'Vue 3']"
                                                                                                                                            help="Tags that summarise your article" validation="" />
                                                                                                                                           <FormKit type="taglist" name="tags" label="Search for your favorite car brands" /> 
                                                                                                                                        </div>
                                                                                                                                      </div>
                                                                                                                                       <ClientOnly> -->
      <!-- <QuillEditor theme="snow" /> -->
      <!-- </ClientOnly> -->
      <!--</FormKit> -->
    </div>
  </div>
</template>


<style scoped></style>