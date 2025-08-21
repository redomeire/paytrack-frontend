<template>
  <section class="grid md:grid-cols-2 items-center">
    <div class="flex flex-col items-stretch justify-between font-sans p-10 max-h-screen overflow-auto">
      <h1 class="text-h5 mb-2">
        Create new account
      </h1>
      <p class="text-body-sm mb-5">
        Please fill in the form below to create a new account
      </p>
      <AuthRegisterForm />
      <NuxtSeparator class="my-5">
        <template #default>
          <span class="text-muted text-sm">or continue with</span>
        </template>
      </NuxtSeparator>
      <div class="grid gap-3">
        <AuthSocialButton provider="google" />
        <AuthSocialButton provider="github" />
      </div>

      <p class="text-sm text-center flex items-center justify-center gap-2 mt-8">
        Already have an accound? <NuxtLink
          to="/auth/login"
          class="block w-fit"
        ><span class="font-semibold underline">Sign in</span></NuxtLink>
      </p>
    </div>
    <div class="h-screen relative">
      <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1630659509436-7397fbda30e2')] bg-cover bg-center" />
    </div>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})
useSeoMeta({
  title: 'Register',
  ogTitle: 'Register to Paytrack',
  titleTemplate: '%s - Paytrack',
  description: 'Register to your account on Paytrack',
  ogDescription: 'Register to your account on Paytrack'
})
</script>
