import usebaseAPIURL from "@/composables/apiBaseComposable.js"
import { useToastStore } from "./toastStore.js"

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    // toast: useToastStore(),
    // router: useRouter(),
    baseAPIURL: usebaseAPIURL(),
    user: null,
    token: '',
    isLoading: false,
    authenticated: false
  }),
  hydrate(state, initialState) {
    state.baseAPIURL = usebaseAPIURL()
  },
  getters: {},
  actions: {
    async registerUser(payload) {
      const toast = useToastStore()
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
          toast.add({
            type: 'success',
            message: response.message,
            timeout: 3000
          })

        }
      } catch (error) {
        this.isLoading = false
        toast.add({
          type: 'error',
          message: error.message,
          timeout: 3000
        })
      }
    },
    async loginUser(payload) {
      const toast = useToastStore()
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
        // console.log('RESPONSE:' + response);
        const user = useCookie('user', { sameSite: 'strict' })
        user.value = response.user
        const token = useCookie('token', { sameSite: 'strict' })
        token.value = response.token
        // localStorage.setItem('token', response.token)
        // localStorage.setItem('user', response.user)
        this.user = response.user
        this.token = response.token

        // router.push('/dashboard')
        this.isLoading = false
        this.authenticated = true
        toast.add({
          type: 'success',
          message: response.message,
          timeout: 3000
        })
        // if (response) {
        // Update pinia state

        // Store user details & jwt in localstorage to persist state through page refresh
        // }
      } catch (error) {
        this.isLoading = false
        console.log(error.data.message);
        toast.add({
          type: 'error',
          message: error.data.message,
          timeout: 3000
        })
      }
    },
    async getUser() {
      const toast = useToastStore()
      try {
        this.isLoading = true
        const response = await $fetch('/auth/login', {
          method: 'GET',
          baseURL: this.baseAPIURL.baseAPIURL,
          headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          },
          body: credentials
        })


      } catch (error) {
        this.isLoading = false
        console.log(error);
        toast.add({
          type: 'error',
          message: error,
          timeout: 3000
        })
      }
    },
    logout() {
      const toast = useToastStore()
      const token = useCookie('token') // useCookie new hook in nuxt 3
      const user = useCookie('user')

      this.user = null
      this.authenticated = false // set authenticated  state value to false

      token.value = null
      user.value = null

      toast.add({
        type: 'success',
        message: 'Log out successful, bye.',
        timeout: 3000
      }) // clear the token cookie
      // router.push('/login');
    }
  },
})
