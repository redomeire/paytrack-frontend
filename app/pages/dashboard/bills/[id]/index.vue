<template>
  <div>
    <div v-if="error">
      <NuxtContainer class="p-4">
        <NuxtAlert
          color="error"
          :title="error.message"
          message="Failed to load bill details. Please try again later."
        />
      </NuxtContainer>
    </div>
    <article
      v-if="data?.data"
      class="p-4"
    >
      <div class="flex justify-between gap-5 flex-wrap">
        <div>
          <h1 class="text-2xl font-bold">
            {{ data.data.name }}
          </h1>
          <p>
            {{ data.data.description || 'No description provided.' }}
          </p>
        </div>
        <div class="flex items-center gap-2">
          <NuxtButton
            :to="`/dashboard/bills/${billId}/edit`"
            color="primary"
            size="xl"
            class="flex items-center justify-center"
          >
            <NuxtIcon name="i-material-symbols-edit-document-outline" />
            <span class="ml-2">Edit Detail</span>
          </NuxtButton>
          <NuxtButton
            :to="`/dashboard/bills/${billId}/payments`"
            color="primary"
            size="xl"
            class="flex items-center justify-center"
            variant="outline"
          >
            <NuxtIcon name="i-material-symbols-visibility" />
            <span class="ml-2">View payment history</span>
          </NuxtButton>
        </div>
      </div>
      <div class="grid md:grid-cols-2 gap-5 mt-5">
        <NuxtCard>
          <NuxtImg
            :alt="data.data.name || 'Bill Image'"
            :src="data.data.attachment_url ?? 'https://images.unsplash.com/photo-1693045181224-9fc2f954f054?q=80&w=1179&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'"
            placeholder
          />
        </NuxtCard>
        <Nuxtcontainer>
          <div>
            <h3 class="text-heading-6 font-semibold">
              Bill Details
            </h3>
            <ul class="mt-3">
              <li class="flex justify-between items-center text-body-sm border-b border-accented py-4">
                <span>Category:</span>
                <span class="font-semibold">
                  {{ data.data.bill_category.name }}
                </span>
              </li>
              <li class="flex justify-between items-center text-body-sm border-b border-accented py-4">
                <span>Amount:</span>
                <span class="font-semibold">
                  {{ currencyFormat(data.data.amount, data.data.currency) }}
                </span>
              </li>
              <li class="flex justify-between items-center text-body-sm border-b border-accented py-4">
                <span>Due Date:</span>
                <span class="font-semibold">
                  {{ dateTimeFormat({
                    date: data.data.due_date,
                    timezone: 'Asia/Jakarta'
                  }) }}
                </span>
              </li>
              <li class="flex justify-between items-center text-body-sm border-b border-accented py-4">
                <span>Type:</span>
                <span class="font-semibold">
                  {{ data.data.billing_type }}
                </span>
              </li>
              <li
                v-if="data.data.billing_type === 'recurring'"
                class="flex justify-between items-center text-body-sm border-b border-accented py-4"
              >
                <span>Frequency:</span>
                <span class="font-semibold">
                  {{ data.data.frequency }}
                </span>
              </li>
              <li
                v-if="data.data.frequency === 'custom'"
                class="flex justify-between items-center text-body-sm border-b border-accented py-4"
              >
                <span>Days count:</span>
                <span class="font-semibold">
                  {{ data.data.custom_frequency_days }}
                </span>
              </li>
            </ul>
          </div>
        </Nuxtcontainer>
      </div>
      <div class="mt-10">
        <div class="mt-10">
          <NuxtContainer class="border-error border-2 rounded-xl p-3">
            <h3 class="text-heading-6 font-semibold">
              Danger Zone
            </h3>
            <div class="flex items-center justify-between mt-5">
              <div>
                <h6
                  class="text-body-lg font-semibold"
                >
                  Delete Bill
                </h6>
                <p class="text-sm text-gray-500">
                  Deleting a bill is permanent and cannot be undone. Please proceed with caution.
                </p>
              </div>
              <div>
                <NuxtModal>
                  <NuxtButton
                    variant="solid"
                    color="error"
                  >
                    Delete Bill
                  </NuxtButton>
                  <template #content>
                    <div class="p-5">
                      <p class="text-lg font-semibold">
                        Confirm deletion
                      </p>
                      <p class="text-sm">
                        Are you sure you want to delete this bill? This action cannot be undone.
                      </p>
                      <NuxtButton
                        class="w-fit float-end"
                        color="error"
                        variant="solid"
                        :loading="deleteStatus === 'pending'"
                        :disabled="deleteStatus === 'pending'"
                        @click="handleDeleteBill"
                      >
                        Delete permanently
                      </NuxtButton>
                    </div>
                  </template>
                </NuxtModal>
              </div>
            </div>
          </NuxtContainer>
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
const billId = route.params.id as string

if (!billId) {
  throw new Error('Bill ID is required')
}

const { data, error } = await useAsyncData(
  async () => $useCases.bill.getBillDetail.execute({
    payload: {
      id: billId
    }
  }))

const { status: deleteStatus, execute: executeDelete } = await useAsyncData(
  () => $useCases.bill.deleteBill.execute({
    payload: {
      id: billId
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
</script>
