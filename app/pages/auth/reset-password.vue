<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="flex flex-col items-stretch justify-between font-sans md:p-10 p-5 md:w-1/3 w-full">
      <h1 class="text-h5 mb-2">
        Reset Password
      </h1>
      <p class="text-body-sm mb-5">
        Enter your email address below and we will send you a link to reset your password.
      </p>
      <AuthResetPasswordForm />
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Reset Password - Paytrack',
  description: 'Reset your password by entering your email address.'
})
</script>
