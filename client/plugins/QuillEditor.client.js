// import Vue from 'vue'
import { QuillEditor } from '@vueup/vue-quill'

// Vue.use(QuillEditor)

export default defineNuxtPlugin((nuxtApp) => {
  // nuxtApp.vueApp.use('QuillEditor', QuillEditor)
  nuxtApp.vueApp.component('QuillEditor', QuillEditor)
})

