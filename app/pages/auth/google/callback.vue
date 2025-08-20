<template>
  <section class="grid md:grid-cols-2 items-center">
    <div class="flex flex-col items-stretch justify-between font-sans p-10 max-h-screen overflow-auto">
      <h1 class="text-h5 mb-2">
        Sign in with Google
      </h1>
      <p class="text-body-sm mb-5">
        Please wait while we redirect you to Google for authentication.
        <br>
        Redirecting...
      </p>
    </div>
    <div class="h-screen relative">
      <div class="absolute inset-3 bg-[url('https://images.unsplash.com/photo-1630659509436-7397fbda30e2')] bg-cover bg-center rounded-2xl" />
    </div>
  </section>
</template>

<script lang="ts" setup>
const { $useCases } = useNuxtApp()
// get code from query params
const route = useRoute()
const code = route.query.code as string

const { data, execute } = useAsyncData('google-auth-redirect', async () => await $useCases.auth.authorizeSocialLogin.execute({
  payload: {
    provider: 'google',
    code: code
  }
}), {
  immediate: false
})

onMounted(() => {
  execute()
})

watch(data, (newData) => {
  if (newData) {
    if (newData.success) {
      // redirect to home page
      setTimeout(() => {
        navigateTo('/dashboard')
      }, 1000)
    }
    else {
      // handle error
      console.error('Error during Google authentication:', newData.message)
      setTimeout(() => {
        navigateTo('/auth/login')
      }, 1000)
    }
  }
})
</script>
