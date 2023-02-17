import usebaseAPIURL from "@/composables/apiBaseComposable.js"

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    router: useRouter(),
    baseAPIURL: usebaseAPIURL(),
    user: null,
    token: '',
    isLoading: false,
    authenticated: false
  }),
  getters: {},
  actions: {
    async registerUser(payload) {
      try {
        this.loading = true
        const user = {
          name: payload.fullName,
          email: payload.email,
          password: payload.password,
          about: payload.about,
          profileImage: payload.profileImage
        }

        const response = await $fetch(`/auth/register`, {
          method: 'POST',
          baseURL: this.baseAPIURL.baseAPIURL,
          headers: {
            'Content-type': 'application/json'
          },
          body: user
        })
        // const res = await response.json()
        if (response.status === 201) {
          this.isLoading = false
          // Push to the login route


        }
      } catch (error) {
        this.isLoading = false
        console.log(error)
      }
    },
    async loginUser(payload) {
      this.isLoading = true
      const credentials = {
        email: payload.email,
        password: payload.password
      }
      try {
        const response = await $fetch('/auth/login', {
          method: 'POST',
          baseURL: this.baseAPIURL.baseAPIURL,
          headers: {
            'Content-type': 'application/json'
          },
          body: credentials
        })

        // const res = await response.json()
        console.log('RESPONSE:' + response);
        this.user = response.user
        const token = useCookie('token', { sameSite: 'strict' })
        token.value = response.token
        // localStorage.setItem('token', response.token)
        // localStorage.setItem('user', response.user)
        this.token = response.token
        // router.push('/dashboard')
        this.isLoading = false
        this.authenticated = true

        // if (response) {
        // Update pinia state

        // Store user details & jwt in localstorage to persist state through page refresh
        // }
      } catch (error) {
        this.isLoading = false
        console.log(error)
      }
    },
    async getUser() {
      try {
        this.isLoading = true
        const response = await $fetch('/auth/login', {
          method: 'GET',
          baseURL: this.baseAPIURL.baseAPIURL,
          headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer' + localStorage.getItem('token')
          },
          body: credentials
        })


      } catch (error) {
        this.isLoading = false
        console.log(error);
      }
    },
    logout() {
      const token = useCookie('token') // useCookie new hook in nuxt 3

      this.user = null
      this.authenticated = false // set authenticated  state value to false
      token.value = null // clear the token cookie
      // router.push('/login');
    }
  },
})
