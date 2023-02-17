import usebaseAPIURL from "@/composables/apiBaseComposable.js"

export const useArticleStore = defineStore('article', {
  state: () => ({
    baseAPIURL: usebaseAPIURL(),
    articles: [],
    categories: []
  }),
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    // Get all categories on load
    async getCategories() {
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
        // TODO: Send an alert notification or show error to the UI
      }
    },

    async addCategory(category) {
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

        this.getCategories()
      } catch (error) {
        console.log(error);
      }
    },

    // Post a new article
    async saveArticle(payload, flag) {
      try {
        const article = {
          title: payload.title,
          description: payload.description,
          content: payload.content,
          // photo: ''
          category: payload.category,
          // tags: payload.tags,
          published: flag === 'publish' ? true : false
        }

        const token = useCookie('token')
        const bearer = 'Bearer ' + token.value

        const response = await $fetch('/article', {
          method: 'POST',
          baseURL: this.baseAPIURL.baseAPIURL,
          headers: {
            'Authorization': bearer,
            'Content-type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: article
        })

      } catch (error) {
        console.log(error)
      }
    }
  },
})
