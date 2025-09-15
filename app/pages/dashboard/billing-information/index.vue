<template>
  <div>
    <div
      v-if="status === 'error'"
      class="error"
    >
      <NuxtContainer class="p-4">
        <NuxtAlert
          color="error"
          :title="'Error'"
          message="Failed to load bill details. Please try again later."
        />
      </NuxtContainer>
    </div>
    <article
      v-else
      class="p-4"
    >
      <div class="flex items-center justify-between gap-5 flex-wrap">
        <div>
          <h1 class="text-2xl font-bold">
            Recipient Accounts
          </h1>
          <p>
            Manage your recipient accounts here.
          </p>
        </div>
        <NuxtLink to="/dashboard/billing-information/create">
          <NuxtButton
            variant="soft"
            icon="i-material-symbols-add-rounded"
          >
            Add New Recipient
          </NuxtButton>
        </NuxtLink>
      </div>
      <div class="w-1/3 mt-3">
        <NuxtInput
          v-model="query.search_recipient"
          class="w-full"
          size="xl"
          icon="i-material-symbols-search"
          placeholder="Search by name"
          @keyup.enter="execute"
        />
      </div>
      <div class="grid md:grid-cols-5 gap-3 mt-3">
        <NuxtSelectMenu
          v-model="recipientType"
          :items="recipientTypes"
          class="w-full"
          size="xl"
          placeholder="Filter by type"
        >
          <template #trailing="{ modelValue }">
            <NuxtButton
              v-if="modelValue?.value"
              variant="ghost"
              class="rounded-full -translate-x-1"
              icon="i-ix-clear"
              size="md"
              color="error"
              @click="recipientType = { label: '', value: '', icon: '' }"
            />
          </template>
        </NuxtSelectMenu>
      </div>
      <div
        v-if="status === 'success'"
        class="mt-5"
      >
        <ul
          v-if="billingInformations?.data?.data && billingInformations?.data?.data.length > 0"
          class="grid md:grid-cols-3 gap-5"
        >
          <li
            v-for="billingInformation of billingInformations?.data?.data"
            :key="billingInformation.id"
          >
            <NuxtCard :ui="{ root: 'p-0 md:min-h-44 hover:shadow-xl transition-shadow duration-200 relative' }">
              <NuxtDropdownMenu
                :items="getContextMenuItems(billingInformation)"
                :content="{ side: 'right', sideOffset: 10 }"
                :ui="{
                  content: 'w-48'
                }"
              >
                <NuxtButton
                  variant="outline"
                  color="primary"
                  size="sm"
                  class="absolute top-3 right-3 z-10"
                  icon="i-material-symbols-more-horiz"
                />
              </NuxtDropdownMenu>
              <NuxtModal
                v-model:open="isDeleteModalOpen"
                title="Confirm Pay"
                description="This action cannot be undone."
              >
                <template #body>
                  <div class="p-5">
                    <p class="text-body-md">
                      Are you sure you want to delete billing information?
                    </p>
                    <div class="mt-3">
                      <p class="text-sm text-gray-500">
                        Name: {{ billingInformation.name }}
                      </p>
                      <p class="text-sm text-gray-500">
                        Type: {{ billingInformation.type === 'EWALLET' ? 'E-Wallet' : 'Bank Account' }}
                      </p>
                      <p class="text-sm text-gray-500">
                        Account Number: {{ billingInformation.details.account_number }}
                      </p>
                      <p class="text-sm text-gray-500">
                        Account ID: {{ billingInformation.details.account_id }}
                      </p>
                    </div>
                  </div>
                </template>
                <template #footer>
                  <div class="flex gap-2">
                    <NuxtButton
                      class="w-fit float-end"
                      variant="outline"
                      color="neutral"
                      :disabled="deleteStatus === 'pending'"
                      @click="isDeleteModalOpen = false; selectedBillingInformationId = null"
                    >
                      Cancel
                    </NuxtButton>
                    <NuxtButton
                      class="w-fit float-end"
                      color="error"
                      variant="solid"
                      :loading="deleteStatus === 'pending'"
                      :disabled="deleteStatus === 'pending'"
                      @click="handleDelete"
                    >
                      Yes, Delete
                    </NuxtButton>
                  </div>
                </template>
              </NuxtModal>
              <div>
                <NuxtBadge
                  v-if="billingInformation.default"
                  class="mb-3"
                >
                  Default
                </NuxtBadge>
                <div class="flex items-center gap-2">
                  <NuxtIcon
                    :name="billingInformation.type === 'EWALLET' ? 'i-heroicons-wallet' : 'i-mdi-bank'"
                    class="text-2xl text-gray-600"
                  />
                  <h2 class="text-lg font-semibold">
                    {{ billingInformation.name }}
                  </h2>
                </div>
                <p class="text-xs text-gray-400 mt-5">
                  Type: {{ billingInformation.type === 'EWALLET' ? 'E-Wallet' : 'Bank Account' }}
                </p>
                <p class="text-lg font-semibold">
                  {{ billingInformation.details.account_number }}
                  ({{ billingInformation.details.account_id }})
                </p>
              </div>
            </NuxtCard>
          </li>
        </ul>
        <div
          v-else
          class="flex flex-col items-center justify-center h-32"
        >
          <p class="text-gray-500">
            No recipient accounts found.
          </p>
        </div>
        <div class="flex items-center flex-wrap gap-5 justify-between mt-5">
          <p class="text-sm">
            Menampilkan {{ billingInformations?.data?.from }} - {{ billingInformations?.data?.to }} dari {{ billingInformations?.data?.total }} Channel
          </p>
          <NuxtPagination
            v-model:page="query.page"
            :items-per-page="10"
            :total="billingInformations?.data?.total"
            class="float-end"
            show-edges
          />
        </div>
      </div>

      <div
        v-if="status === 'pending'"
      >
        <ul class="grid md:grid-cols-3 gap-3 mt-5">
          <li>
            <NuxtSkeleton
              class="h-48 mb-2"
              variant="rect"
            />
          </li>
          <li>
            <NuxtSkeleton
              class="h-48 mb-2"
              variant="rect"
            />
          </li>
        </ul>
      </div>
    </article>
  </div>
</template>

<script lang="ts" setup>
import type { DropdownMenuItem } from '@nuxt/ui'
import type { IBillingInformation } from '~~/lib/domain/entity/billing-information'

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth']
})
const { $useCases } = useNuxtApp()
const query = reactive({
  search_recipient: '',
  page: 1
})
const isDeleteModalOpen = ref(false)
const selectedBillingInformationId = ref<string | null>(null)

const recipientTypes = ref([
  {
    value: 'BANK_ACCOUNT',
    label: 'Bank Account',
    icon: 'i-heroicons-building-library'
  },
  {
    value: 'EWALLET',
    label: 'E-wallet',
    icon: 'i-heroicons-wallet'
  }
])
const recipientType = ref()

const getContextMenuItems = (billingInformation: IBillingInformation): DropdownMenuItem[][] => (
  [
    [
      {
        label: 'Show Details',
        icon: 'i-material-symbols-info',
        to: `/dashboard/billing-information/${billingInformation.id}`
      },
      {
        label: 'Set as Default',
        color: billingInformation.default ? 'neutral' : 'primary',
        icon: 'i-material-symbols-check-circle-outline',
        disabled: billingInformation.default,
        onSelect: async () => {
          await handleSetAsDefault(billingInformation.id)
        }
      },
      {
        label: 'Delete',
        color: 'error',
        icon: 'i-material-symbols-delete-outline',
        onSelect: () => {
          selectedBillingInformationId.value = billingInformation.id
          isDeleteModalOpen.value = true
        }
      }
    ]
  ])

const {
  data: billingInformations,
  status,
  execute
} = await useAsyncData(
  'billingInformations',
  () => $useCases.bill.getAllBillingInformations.execute({
    options: {
      query: {
        search: query.search_recipient,
        type: recipientType.value?.value
      }
    }
  }), {
    watch: [recipientType]
  })

const {
  status: deleteStatus,
  execute: executeDelete
} = await useAsyncData(
  () => $useCases.bill.deleteBillingInformation.execute({
    payload: {
      id: selectedBillingInformationId.value ?? ''
    }
  }), {
    immediate: false
  })

const handleSetAsDefault = async (id: string) => {
  const response = await $useCases
    .bill
    .setBillingInformationAsDefault
    .execute({
      payload: { id }
    })
  if (response.success) {
    await refreshNuxtData('billingInformations')
  }
}

const handleDelete = async () => {
  await executeDelete()
  if (deleteStatus.value === 'success') {
    isDeleteModalOpen.value = false
    selectedBillingInformationId.value = null
    await refreshNuxtData('billingInformations')
  }
}
</script>
