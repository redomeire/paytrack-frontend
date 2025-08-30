<template>
  <div>
    <div v-if="error">
      <NuxtContainer class="p-4">
        <NuxtAlert
          color="error"
          variant="soft"
          icon="i-heroicons-exclamation-triangle"
          title="Error Loading Bill"
          :description="error.message || 'Failed to load bill details. Please try again later.'"
        />
      </NuxtContainer>
    </div>

    <article
      v-if="data?.data"
      class="p-4 md:p-6"
    >
      <div class="flex justify-between items-start gap-5 flex-wrap mb-8">
        <div>
          <div class="flex items-center gap-3">
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
              {{ data.data.name }}
            </h1>
          </div>
          <p class="mt-1 text-gray-500 dark:text-gray-400">
            {{ data.data.description || 'No description provided.' }}
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 space-y-8">
          <NuxtCard>
            <template #header>
              <h3 class="font-semibold text-gray-800 dark:text-gray-200">
                Attachment
              </h3>
            </template>
            <NuxtImg
              :alt="data.data.name || 'Bill Image'"
              :src="data.data.attachment_url || 'https://images.unsplash.com/photo-1586452838318-7e3763286b35?auto=format&fit=crop&q=80'"
              placeholder
              class="rounded-md object-cover w-full h-auto"
            />
          </NuxtCard>
        </div>

        <div class="lg:col-span-1">
          <div class="sticky top-24">
            <NuxtCard class="w-full">
              <template #header>
                <h3 class="font-semibold text-gray-800 dark:text-gray-200">
                  Payment Details
                </h3>
              </template>

              <div class="text-center mb-6">
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Amount Due
                </p>
                <p class="text-4xl font-bold text-gray-900 dark:text-white mt-1">
                  {{ currencyFormat(data.data.amount, data.data.currency) }}
                </p>
              </div>

              <div class="space-y-4">
                <div class="flex items-start justify-between">
                  <div class="flex items-center gap-2">
                    <NuxtIcon
                      name="i-heroicons-tag"
                      class="text-gray-400"
                    />
                    <span class="text-sm text-gray-500 dark:text-gray-400">Category</span>
                  </div>
                  <span class="font-semibold text-right">{{ data.data.bill_category.name }}</span>
                </div>
                <div class="flex items-start justify-between">
                  <div class="flex items-center gap-2">
                    <NuxtIcon
                      name="i-heroicons-calendar-days"
                      class="text-gray-400"
                    />
                    <span class="text-sm text-gray-500 dark:text-gray-400">Due Date</span>
                  </div>
                  <span class="font-semibold text-right">{{ dateTimeFormat({ date: data.data.due_date, timezone: 'Asia/Jakarta' }) }}</span>
                </div>
                <div class="flex items-start justify-between">
                  <div class="flex items-center gap-2">
                    <NuxtIcon
                      name="i-heroicons-clock"
                      class="text-gray-400"
                    />
                    <span class="text-sm text-gray-500 dark:text-gray-400">Period</span>
                  </div>
                  <span class="font-semibold text-right">{{ data.data.period ?? 'N/A' }}</span>
                </div>
              </div>
            </NuxtCard>
            <NuxtButton
              :color="data.data.status === 'paid' ? 'success' : (data.data.status === 'overdue' ? 'error' : 'warning')"
              variant="outline"
              class="w-full mt-3 grid place-items-center"
              size="xl"
            >
              {{ data.data.status }}
            </NuxtButton>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script lang="ts" setup>
useSeoMeta({
  title: 'Bill Details - PayTrack',
  description: 'the details of your bill, including name, category, amount, and due date.'
})

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth']
})

const { $useCases } = useNuxtApp()
const route = useRoute()
const billId = route.params.billId as string

if (!billId) {
  throw new Error('Bill ID is required')
}

const { data, error } = await useAsyncData(
  async () => $useCases.bill.getBillDetail.execute({
    payload: {
      id: billId
    }
  }))
</script>
