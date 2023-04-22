import usebaseAPIURL from "@/composables/apiBaseComposable.js"
import { useToastStore } from "./toastStore.js"


export const useArticleStore = defineStore('article', {
  state: () => ({
    // toast: useToastStore(),
    baseAPIURL: usebaseAPIURL(),
    isEditing: false,
    allArticles: [] || [],
    articles: [],
    userArticles: [],
    categories: [],
    filteredArticle: [],
    draftArticles: []
  }),
  persist: true,
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    // Get all categories on load
    async getCategories() {
      const toast = useToastStore()
      try {
        const categories = await $fetch('/category', {
          method: 'GET',
          baseURL: this.baseAPIURL.baseAPIURL,
          headers: {
            'Content-type': 'application/json',
          }
        })

        this.categories = categories
      } catch (error) {
        console.log(error)
        toast.add({
          type: 'success',
          message: response.data.message,
          timeout: 3000
        })
      }
    },

    async startEditProcess(payload) {
      try {
        this.isEditing = true

        const articleToEdit = this.userArticles.filter((article) => article._id === payload)

        this.filteredArticle = articleToEdit
      } catch (error) {

      }
    },

    getAllDraftArticles() {
      try {
        const draftArticles = this.userArticles.filter((draft) => draft.published === false)

        this.draftArticles = draftArticles
      } catch (error) {
        console.log(error);
      }
    },

    async addCategory(category) {
      const toast = useToastStore()
      try {
        const token = useCookie('token')
        const bearer = 'Bearer ' + token.value

        const response = await $fetch('/category', {
          method: 'POST',
          baseURL: this.baseAPIURL.baseAPIURL,
          headers: {
            'Content-type': 'application/json',
            'Authorization': bearer
          },
          body: { name: category }
        })
        if (response) {
          toast.add({
            type: 'success',
            message: response.message,
            timeout: 3000
          })
          // this.notification.addNotification({
          //   type: 'success',
          //   message: response.message
          // })
        }

        this.getCategories()
      } catch (error) {
        toast.add({
          type: 'error',
          message: response.data.message
        })
      }
    },

    // Post a new article
    async saveArticle(payload, flag) {
      const toast = useToastStore()
      try {
        const data = new FormData()

        data.append('title', payload.title)
        data.append('description', payload.description)
        data.append('content', payload.content)
        data.append('category', payload.category)
        data.append('photo', payload.photo)
        data.append('tags', payload.tags)
        data.append('published', flag === 'publish' ? true : false)


        const token = useCookie('token')
        const bearer = 'Bearer ' + token.value

        const response = await $fetch('/article', {
          method: 'POST',
          baseURL: this.baseAPIURL.baseAPIURL,
          headers: {
            'Authorization': bearer,
            // 'Content-Type': 'multipart/form-data boundary=<calculated when request is sent>'
            // 'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: data
        })



        if (response) {
          toast.add({
            type: 'success',
            message: response.message,
            timeout: 3000
          })
        }

        this.getUserArticles()

      } catch (error) {
        console.log(error)
        toast.add({
          type: 'error',
          message: 'An error occured, your article is not saved. Please try again!',
          timeout: 3000
        })
      }
    },

    async getUserArticles() {
      const toast = useToastStore()
      const storedToken = useCookie('token')

      try {
        const response = await $fetch('/article', {
          method: 'GET',
          baseURL: this.baseAPIURL.baseAPIURL,
          headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + storedToken._value
          },
        })
        // console.log(response);
        // if (response.status === 204) {
        //   this.toast.add({
        //     type: 'success',
        //     message: 'You have no articles published yet',
        //     timeout: 3000
        //   })
        // }

        if (response) {
          this.userArticles = response
        }
      } catch (error) {
        console.log(error)
        toast.add({
          type: 'error',
          message: response.data.message
        })
      }
    },

    async deleteArticle(payload) {
      const toast = useToastStore()
      try {
        // const { id } = payload;
        console.log(payload)
        const response = await $fetch(`/article/${payload}`, {
          method: 'DELETE',
          baseURL: this.baseAPIURL.baseAPIURL,
          headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          },
        })

        const newArticles = this.userArticles.filter((article) => article._id !== payload)

        this.userArticles = newArticles

        // Try this temporarily
        // await this.getUserArticles()

        toast.add({
          type: 'success',
          message: response.message,
          timeout: 3000
        })

        // })
      } catch (error) {
        console.log(error)
        toast.add({
          type: 'error',
          message: response.data.message
        })
      }
    },

    async getArticles() {
      const toast = useToastStore()
      try {
        const response = await $fetch(`/article/all`, {
          method: 'GET',
          baseURL: this.baseAPIURL.baseAPIURL,
          headers: {
            'Content-type': 'application/json',
            // 'Authorization': 'Bearer ' + localStorage.getItem('token')
          },
        })

        if (response) {
          this.allArticles = response
        }
      } catch (error) {
        console.log(error)
        toast.add({
          type: 'error',
          message: response.data.message
        })
      }
    }
  },
})
