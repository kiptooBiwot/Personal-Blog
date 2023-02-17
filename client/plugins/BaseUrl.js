export default defineNuxtPlugin((NuxtApp) => {
  const config = useRuntimeConfig()
  // Access baseURL universally 
  const apiBase = config.app.apiBase
})