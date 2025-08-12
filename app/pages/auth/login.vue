<template>
  <section class="grid md:grid-cols-2 items-center">
    <div class="flex flex-col items-stretch justify-between font-sans p-10 max-h-screen overflow-auto">
      <h1 class="text-h5 mb-2">
        Login to your account
      </h1>
      <p class="text-body-sm mb-5">
        Welcome back, please enter your detail
      </p>
      <AuthLoginForm />
      <NuxtSeparator class="my-5">
        <template #default>
          <span class="text-muted text-sm">or continue with</span>
        </template>
      </NuxtSeparator>
      <div class="grid gap-3">
        <NuxtButton
          color="neutral"
          variant="subtle"
          class="flex justify-center"
          size="xl"
          icon="i-logos-google-icon"
        >
          Continue with Google
        </NuxtButton>
        <NuxtButton
          color="neutral"
          variant="subtle"
          class="flex justify-center"
          size="xl"
          icon="i-logos-github-icon"
        >
          Continue with Github
        </NuxtButton>
      </div>

      <p class="text-sm text-center flex items-center justify-center gap-2 mt-8">
        Not registered yet? <NuxtLink
          to="/auth/register"
          class="block w-fit"
        ><span class="font-semibold underline">Create an account</span></NuxtLink>
      </p>
    </div>
    <div class="h-screen relative">
      <div class="absolute inset-3 bg-[url('https://images.unsplash.com/photo-1630659509436-7397fbda30e2')] bg-cover bg-center rounded-2xl" />
    </div>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})
useSeoMeta({
  title: 'Login',
  ogTitle: 'Login to Paytrack',
  titleTemplate: '%s - Paytrack',
  description: 'Login to your account on Paytrack',
  ogDescription: 'Login to your account on Paytrack'
})
</script>
