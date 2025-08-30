<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
    <NuxtCard class="w-full max-w-lg text-center p-8">
      <div class="flex flex-col items-center">
        <NuxtIcon
          name="i-heroicons-check-circle-solid"
          class="text-green-500 w-24 h-24 mb-6"
        />
        <h1 class="text-3xl font-bold mb-4">
          Pembayaran Berhasil!
        </h1>
        <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
          Terima kasih. Pembayaran Anda telah berhasil kami terima.
        </p>
        <NuxtButton
          to="/dashboard"
          color="primary"
          size="xl"
          class="w-full justify-center"
        >
          Kembali ke Beranda
        </NuxtButton>
      </div>
    </NuxtCard>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
  layout: 'auth'
})
</script>
