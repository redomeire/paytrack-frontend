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
            <NuxtBadge
              color="warning"
              variant="soft"
              size="lg"
            >
              Due in {{ dayCountsFormat(data.data.due_date) }}
            </NuxtBadge>
          </div>
          <p class="mt-1 text-gray-500 dark:text-gray-400">
            {{ data.data.description || 'No description provided.' }}
          </p>
        </div>
        <div class="flex items-center gap-2 flex-shrink-0">
          <NuxtButton
            :to="`/dashboard/bills/${billId}/edit`"
            icon="i-heroicons-pencil-square"
            size="md"
            variant="outline"
          >
            Edit
          </NuxtButton>
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
              v-if="data.data.attachment_url"
              :alt="data.data.name || 'Bill Image'"
              :src="data.data.attachment_url || 'https://images.unsplash.com/photo-1586452838318-7e3763286b35?auto=format&fit=crop&q=80'"
              placeholder
              class="rounded-md object-cover w-full h-auto"
            />
            <NuxtFileUpload
              v-else
              v-model="files"
              accept="image/*"
              icon="i-lucide-image"
              label="Drop your image here"
              description="SVG, PNG, JPG or GIF (max. 2MB)"
              class="w-full min-h-48"
            />
            <NuxtButton
              v-if="files"
              class="mt-4"
              label="Upload Attachment"
              :loading="uploadStatus === 'pending'"
              :disabled="uploadStatus === 'pending'"
              @click="handleUploadFile"
            />
          </NuxtCard>

          <NuxtCard :ui="{ root: 'bg-red-50 dark:bg-red-900/50' }">
            <template #header>
              <h3 class="text-lg font-semibold text-red-800 dark:text-red-300">
                Danger Zone
              </h3>
            </template>
            <div class="flex items-center justify-between">
              <div>
                <h4 class="font-semibold">
                  Delete This Bill
                </h4>
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  This action is permanent and cannot be undone.
                </p>
              </div>
              <NuxtModal>
                <NuxtButton
                  variant="solid"
                  color="error"
                  label="Delete Bill"
                />
                <template #content>
                  <div class="p-5">
                    <p class="text-lg font-semibold">
                      Confirm Deletion
                    </p>
                    <p class="text-sm mt-1">
                      Are you sure you want to delete this bill? This action cannot be undone.
                    </p>
                    <div class="flex justify-end mt-4">
                      <NuxtButton
                        color="error"
                        variant="solid"
                        label="Delete Permanently"
                        :loading="deleteStatus === 'pending'"
                        @click="handleDeleteBill"
                      />
                    </div>
                  </div>
                </template>
              </NuxtModal>
            </div>
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

              <template #footer>
                <NuxtButton
                  size="xl"
                  block
                  label="Pay Now"
                  icon="i-heroicons-credit-card"
                  :loading="checkoutStatus === 'pending'"
                  :disabled="checkoutStatus === 'pending'"
                  @click="handleCheckout"
                />
              </template>
            </NuxtCard>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script lang="ts" setup>
import { NuxtButton } from '#components'

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
const billId = route.params.id as string

if (!billId) {
  throw new Error('Bill ID is required')
}

const { data, error } = await useAsyncData(
  'bill-' + billId,
  async () => $useCases.bill.getBillDetail.execute({
    payload: {
      id: billId
    }
  }))

const files = ref<File>()

const {
  data: updateBillData,
  execute: executeUpdateBill
} = await useAsyncData(
  () => $useCases.bill.updateBill.execute({
    payload: {
      bill: {
        ...data.value?.data,
        attachment_url: uploadData.value?.data?.url
      }
    }
  }
  ), {
    immediate: false
  })

const {
  status: deleteStatus,
  execute: executeDelete
} = await useAsyncData(
  () => $useCases.bill.deleteBill.execute({
    payload: {
      id: billId
    }
  }), {
    immediate: false
  })

const {
  data: checkoutData,
  status: checkoutStatus,
  execute: executeCheckout
} = await useAsyncData(
  () => $useCases.bill.checkoutBill.execute({
    payload: {
      billId
    }
  }), {
    immediate: false
  })
const {
  data: uploadData,
  status: uploadStatus,
  execute: executeUpload
} = await useAsyncData(
  () => $useCases.media.uploadMedia.execute({
    payload: {
      file: files.value!
    }
  }), {
    immediate: false
  })

const handleDeleteBill = async () => {
  await executeDelete()
  if (deleteStatus.value === 'success') {
    navigateTo('/dashboard/bills')
  }
}
const handleCheckout = async () => {
  await executeCheckout()
  if (checkoutData.value?.success) {
    navigateTo(checkoutData.value.data?.invoice_url, {
      external: true
    })
  }
}
const handleUploadFile = async () => {
  if (files.value) {
    await executeUpload()
    if (uploadData.value?.success) {
      await executeUpdateBill()
      if (updateBillData.value?.success) {
        files.value = undefined
        await refreshNuxtData(`bill-${billId}`)
      }
    }
  }
}
</script>
