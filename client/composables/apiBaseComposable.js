export default function useBaseAPI() {

  const config = useRuntimeConfig()

  const baseAPIURL = config.public.BASE_API

  // console.log(baseAPIURL)

  return {
    baseAPIURL
  }
}