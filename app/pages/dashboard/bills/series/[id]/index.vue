<template>
  <article class="p-4 md:p-6">
    <div class="flex justify-between items-start gap-5 flex-wrap mb-6">
      <div>
        <h1 class="text-2xl font-bold">
          {{ billSeries?.data?.name }}
        </h1>
        <p class="text-gray-500 dark:text-gray-400">
          Manage the rules and view the invoice history for this recurring bill.
        </p>
      </div>
      <div class="flex items-center gap-2">
        <NuxtButton
          label="Edit Series"
          icon="i-heroicons-pencil-square"
          variant="outline"
          @click="editSeries"
        />
        <div>
          <NuxtModal>
            <NuxtButton
              label="Delete Series"
              icon="i-heroicons-trash"
              color="error"
              variant="soft"
            />
            <template #content>
              <div class="p-5">
                <p class="text-lg font-semibold">
                  Confirm deletion
                </p>
                <p class="text-sm">
                  Are you sure you want to delete this bill series? This action cannot be undone.
                </p>
                <NuxtButton
                  class="w-fit float-end"
                  color="error"
                  variant="solid"
                  :loading="deleteStatus === 'pending'"
                  :disabled="deleteStatus === 'pending'"
                  @click="deleteSeries"
                >
                  Delete permanently
                </NuxtButton>
              </div>
            </template>
          </NuxtModal>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
      <div class="lg:col-span-1">
        <div class="p-6 border border-gray-200 dark:border-gray-700 rounded-lg space-y-4">
          <h2 class="text-lg font-semibold border-b dark:border-gray-700 pb-4">
            Series Details
          </h2>
          <div class="flex flex-wrap justify-between items-center gap-2">
            <span class="text-sm font-medium text-gray-500">Category</span>
            <span class="font-semibold">{{ billSeries?.data?.bill_category.name }}</span>
          </div>
          <div class="flex flex-wrap justify-between items-center gap-2">
            <span class="text-sm font-medium text-gray-500">Frequency</span>
            <span class="font-semibold">{{ billSeries?.data?.frequency_interval }} {{ billSeries?.data?.frequency }}</span>
          </div>
          <div class="flex flex-wrap justify-between items-center gap-2">
            <span class="text-sm font-medium text-gray-500">Due Day</span>
            <span class="font-semibold">Every {{ billSeries?.data?.due_day }}th of the month</span>
          </div>
          <div class="flex flex-wrap justify-between items-center gap-2">
            <span class="text-sm font-medium text-gray-500">Start Date</span>
            <span class="font-semibold">{{
              dateTimeFormat({
                date: billSeries?.data?.start_date ?? Date.now().toString(),
                timezone: 'Asia/Jakarta'
              })
            }}</span>
          </div>
          <div class="flex flex-wrap justify-between items-center gap-2">
            <span class="text-sm font-medium text-gray-500">Status</span>
            <NuxtBadge
              :color="billSeries?.data?.is_active ? 'success' : 'error'"
              variant="soft"
            >
              {{ billSeries?.data?.is_active ? 'Active' : 'Inactive' }}
            </NuxtBadge>
          </div>
          <div v-if="billSeries?.data?.description">
            <span class="text-sm font-medium text-gray-500">Description</span>
            <p class="text-sm mt-1">
              {{ billSeries?.data?.description }}
            </p>
          </div>
        </div>
      </div>

      <div class="lg:col-span-2">
        <div class="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h2 class="text-lg font-semibold mb-4">
            Invoice History
          </h2>
          <NuxtTable
            :rows="billSeries?.data?.bills"
            :columns="columns"
          >
            <template #amount-data>
              <span>Rp 10.000,00</span>
            </template>

            <template #actions-data="{ row }">
              <NuxtDropdown :items="generateDropdownItems(row.original)">
                <NuxtButton
                  color="neutral"
                  variant="ghost"
                  icon="i-heroicons-ellipsis-horizontal-20-solid"
                />
              </NuxtDropdown>
            </template>
          </NuxtTable>
        </div>
      </div>
    </div>
  </article>
</template>

<script lang="ts" setup>
import type { TableColumn } from '@nuxt/ui'
import type { BillStatus, IBill } from '~~/lib/domain/entity/bill'

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth']
})

const route = useRoute()
if (!route.params.id) {
  throw new Error('Bill series ID is required')
}
const { $useCases } = useNuxtApp()

const {
  data: billSeries
} = await useAsyncData(
  () =>
    $useCases.bill.getBillSeriesDetail.execute({
      payload: {
        id: route.params.id as string
      }
    }))

const {
  data: deleteData,
  status: deleteStatus,
  execute: executeDelete
} = await useAsyncData(
  () =>
    $useCases.bill.deleteBillSeries.execute({
      payload: {
        id: route.params.id as string
      }
    }), {
    immediate: false
  })

// Konfigurasi untuk NuxtTable
const NuxtBadge = resolveComponent('NuxtBadge')
const columns: TableColumn<IBill>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => `#${row.getValue('id')}`
  },
  {
    accessorKey: 'payment_method',
    cell: ({ row }) => `${row.getValue('payment_method')}`
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => `${currencyFormat(row.getValue('amount'), row.original.currency)}`
  },
  {
    accessorKey: 'due_date',
    header: 'Due Date',
    cell: ({ row }) => dateTimeFormat({ date: row.getValue('due_date'), timezone: 'Asia/Jakarta' })
  },
  {
    accessorKey: 'paid_date',
    header: 'Paid Date',
    cell: ({ row }) => row.getValue('paid_date')
      ? dateTimeFormat({
          date: row.getValue('paid_date'), timezone: 'Asia/Jakarta'
        })
      : ''
  },
  {
    id: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const paidDate = row.original.status === 'paid'
      const color: Record<BillStatus, string> = {
        paid: 'success',
        unpaid: 'error',
        overdue: 'warning'
      }

      return h(
        NuxtBadge,
        {
          color
        },
        paidDate ? 'Paid' : 'Unpaid'
      )
    }
  },
  {
    id: 'action'
  }
]

// Fungsi helper untuk dropdown
const generateDropdownItems = (row: IBill) => [
  [{
    label: 'View Details',
    icon: 'i-heroicons-eye',
    click: () => console.log('View', row.id)
  }, {
    label: 'Update Amount',
    icon: 'i-heroicons-currency-dollar',
    click: () => console.log('Update Amount for', row.id),
    disabled: row.amount !== null // Disable jika amount sudah ada
  }],
  [{
    label: 'Delete Invoice',
    icon: 'i-heroicons-trash',
    click: () => console.log('Delete', row.id)
  }]
]

// Placeholder untuk fungsi utama
function editSeries() {
  navigateTo(`/dashboard/bills/series/${billSeries.value?.data?.id}/edit`)
}
async function deleteSeries() {
  await executeDelete()
  if (deleteData.value?.success) {
    navigateTo('/dashboard/bills?tab=recurring')
  }
}
</script>
