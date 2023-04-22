<script setup>
import { useAuthStore } from "@/stores/authStore"

definePageMeta({
  layout: 'auth'
})


const router = useRouter()
const authStore = useAuthStore()

const isRegistration = ref(false)
const formData = reactive({
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  about: '',
  profileImage: ''
})

const switchSignUp = computed(() => {
  return isRegistration.value ? 'Have an account? Sign In' : 'Don\'t have an account? Sign Up'
})

const title = computed(() => {
  return isRegistration.value ? 'Sign Up' : 'Sign In'
})

const submitText = computed(() => {
  return isRegistration.value ? 'Sign Up' : 'Sign In'
})

const handleRegister = async (data) => {

  if (isRegistration.value) {
    await authStore.registerUser(data)

  } else {
    await authStore.loginUser(data)

    if (authStore.authenticated) {
      router.push('/dashboard')
    }
  }
} 
</script>

<template>
  <div class="relative">
    <img src="~/assets/images/auth_bg1.jpg" alt="" class="inset-0 w-full min-h-screen object-cover fixed">

    <div
      class="absolute md:right-32 top-10 mx-5 md:mx-0 md:top-20 bg-white shadow-md rounded-lg h-auto px-10 py-5 w-[90%] md:w-[400px]">
      <div class="flex items-center justify-center gap-2">
        <div class="flex items-center gap-[0px]">
          <div class="w-5 h-5 bg-gray-600 rounded-full"></div>
          <div class="w-5 h-5 bg-gray-600 rounded-full"></div>
        </div>
        <h2 class="font-bold text-2xl font-title">blogg</h2>
      </div>
      <div>
        <h2 class="text-xl font-semibold pb-5">{{ title }}</h2>

        <client-only>
          <FormKit type="form" :submit-label="submitText" :value="formData" @submit="handleRegister">
            <FormKit v-if="isRegistration" type="text" label="Full Name" name="fullName"
              help="Type your full name as would appear on your articles" value="" validation="required|alpha" />
            <FormKit type="email" label="Email" name="email" help="Type in your email" value=""
              validation="required|length:5|email" />
            <FormKit type="password" label="Password" name="password" help="" value="" validation="required|length:8"
              autocomplete="on" />
            <FormKit v-if="isRegistration" type="password" label="Confirm Password" name="confirmPassword" help=""
              validation="required|confirm:password" autocomplete="on" />
            <FormKit v-if="isRegistration" type="textarea" label="About Yourself" name="about"
              help="What are you writing about? Describe your profession." value="" />
            <FormKit v-if="isRegistration" type="file" label="Profile Image" name="profileImage"
              help="Add your picture for your profile" value="" />
          </FormKit>
        </client-only>
        <div class="text-sm py-2 underline cursor-pointer" @click.prevent="isRegistration = !isRegistration">
          {{ switchSignUp }}
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped></style>