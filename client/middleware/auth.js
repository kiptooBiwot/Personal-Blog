import { storeToRefs } from "pinia";
import { useAuthStore } from "../stores/authStore";

export default defineNuxtRouteMiddleware((to, from) => {
  // if (to.params.id === '1') {
  //   return abortNavigation()
  // }
  // console.log('ROUTE Middleware!')

  // const { authenticated } = storeToRefs(useAuthStore())
  const token = useCookie('token')

  // if token exits and route is login, redirect to dashboard
  if (token.value && to.name === 'auth') {
    return navigateTo('/dashboard')
  }


  // If token doesn't exist redirect to login
  if (!token.value) {
    abortNavigation()
    return navigateTo('/auth')
  }
  // return navigateTo('/auth')
})

// export default defineNuxtRouteMiddleware((to) => {
//   // if (!localStorage.getItem('token')) {
//   //   return navigateTo('/auth')
//   // }
//   // console.log($storage.getLocalStorage('token'));
//   console.log('Middleware Run for once');

//   // const { authenticated } = storeToRefs(useAuthStore())
//   const token = useCookie('token')
//   console.log(token)

//   // Check if token exists
//   if (token.value) {
//     // authenticated.value = true // If token exists, update auth store status to true
//   }

//   // if token exits and route is login, redirect to dashboard
//   if (token.value) {
//     return navigateTo('/dashboard')
//   }

//   // If token doesn't exist redirect to login
//   if (!token.value && to.name === 'auth') {
//     abortNavigation()
//     return navigateTo('/auth')
//   }
// })