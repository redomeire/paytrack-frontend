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
        <NuxtLink to="/dashboard/recipient-account/create">
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
          v-model="state.search_recipient"
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
          v-if="recipientAccounts?.data?.data && recipientAccounts?.data?.data.length > 0"
          class="grid md:grid-cols-3 gap-5"
        >
          <li
            v-for="recipientAccount of recipientAccounts?.data?.data"
            :key="recipientAccount.name"
          >
            <NuxtCard :ui="{ root: 'p-0 md:min-h-44 hover:shadow-xl transition-shadow duration-200' }">
              <div>
                <NuxtBadge
                  v-if="recipientAccount.default"
                  class="mb-3"
                >
                  Default
                </NuxtBadge>
                <div class="flex items-center gap-2">
                  <NuxtIcon
                    name="i-mdi-bank"
                    class="text-2xl text-gray-600"
                  />
                  <h2 class="text-lg font-semibold">
                    {{ recipientAccount.name }}
                  </h2>
                </div>
                <p class="text-xs text-gray-400 mt-5">
                  Type: {{ recipientAccount.type === 'EWALLET' ? 'E-Wallet' : 'Bank Account' }}
                </p>
                <p class="text-lg font-semibold">
                  {{ JSON.parse(recipientAccount.details).account_number }}
                  ({{ JSON.parse(recipientAccount.details).account_id }})
                </p>
              </div>
              <template #footer>
                <NuxtLink
                  :to="`/dashboard/recipient-account/${recipientAccount.id}`"
                  class="w-full"
                >
                  <NuxtButton
                    variant="outline"
                    class="w-full grid place-items-center"
                    size="md"
                  >
                    Manage
                  </NuxtButton>
                </NuxtLink>
              </template>
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
            Menampilkan {{ recipientAccounts?.data?.from }} - {{ recipientAccounts?.data?.to }} dari {{ recipientAccounts?.data?.total }} Channel
          </p>
          <NuxtPagination
            v-model:page="state.page"
            :items-per-page="10"
            :total="recipientAccounts?.data?.total"
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
import { NuxtSkeleton } from '#components'

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth']
})
const { $useCases } = useNuxtApp()
const state = reactive({
  search_recipient: '',
  page: 1
})

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

const { data: recipientAccounts, status, execute } = await useAsyncData(
  () => $useCases.bill.getAllRecipientAccounts.execute({
    options: {
      query: {
        search: state.search_recipient,
        type: recipientType.value?.value
      }
    }
  }), {
    watch: [recipientType]
  })
</script>
