<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
    <NuxtCard class="w-full max-w-lg text-center p-8">
      <div class="flex flex-col items-center">
        <NuxtIcon
          name="i-heroicons-x-circle-solid"
          class="text-red-500 w-24 h-24 mb-6"
        />
        <h1 class="text-3xl font-bold mb-4">
          Pembayaran Gagal
        </h1>
        <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
          Maaf, pembayaran Anda tidak berhasil diproses. Silakan coba lagi atau gunakan metode pembayaran lain.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 w-full">
          <NuxtButton
            :to="redirectUrl"
            color="primary"
            variant="solid"
            size="xl"
            class="flex-1 justify-center"
          >
            {{ billId ? 'Kembali ke Tagihan' : 'Kembali ke Dashboard' }}
          </NuxtButton>
        </div>
      </div>
    </NuxtCard>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
  layout: 'auth'
})
const route = useRoute()
const billId = route.query.billId

const redirectUrl = ref(billId ? `/dashboard/bills/${billId}` : '/dashboard')
</script>
