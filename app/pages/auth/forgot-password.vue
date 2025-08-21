<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="flex flex-col items-stretch justify-between font-sans md:p-10 p-5 md:w-1/3 w-full shadow-2xl">
      <NuxtImg
        src="/images/forgot-password/forgot-password.png"
        alt="Forgot Password Illustration"
        class="w-full h-48 object-cover mb-5"
        width="400"
        height="300"
        loading="lazy"
      />
      <h1 class="text-h5 mb-2">
        Forgot Password
      </h1>
      <p class="text-body-sm mb-5">
        We will send you an email with a link to reset your password.
      </p>
      <AuthForgotPasswordForm />
    </div>
  </div>
</template>

<script setup lang="ts">
import { NuxtImg } from '#components'

definePageMeta({
  layout: 'auth',
  title: 'Forgot Password - Paytrack',
  description: 'Reset your password by entering your email address.'
})

useSeoMeta({
  title: 'Forgot Password - Paytrack',
  description: 'Reset your password by entering your email address.'
})
</script>
