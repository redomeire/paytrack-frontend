<template>
  <article class="p-4">
    <div class="flex justify-between gap-5 flex-wrap">
      <div>
        <h1 class="text-2xl font-bold">
          Bills
        </h1>
        <p>
          Manage your bills and expenses in once place.
        </p>
      </div>
      <NuxtLink
        to="/dashboard/bills/create"
        class="btn btn-primary"
      >
        <NuxtButton
          variant="soft"
          icon="i-material-symbols-add-rounded"
        >
          Create New Bill
        </NuxtButton>
      </NuxtLink>
    </div>
    <div
      id="bills-search"
      class="rounded-lg mt-5"
    >
      <NuxtInput
        name="search"
        icon="i-lucide-search"
        placeholder="Cari tagihan"
        class="w-full"
        size="xl"
      />
      <div class="grid md:grid-cols-4 gap-4 mt-5">
        <NuxtSelect
          v-model="statusSelectValue"
          :items="statusSelect"
          size="xl"
          placeholder="Select status"
        />
        <NuxtSelect
          v-model="categorySelectValue"
          :items="categorySelect"
          size="xl"
          placeholder="Select category"
        />
      </div>
    </div>
    <div
      id="bills-list"
      class="mt-5"
    >
      <NuxtTable
        :data="bills?.data"
        :columns="columns"
        class="flex-1 max-h"
        :loading="status === 'pending'"
      >
        <template #action-cell="{ row }">
          <NuxtDropdownMenu :items="getDropdownActions(row.original)">
            <NuxtButton
              icon="i-lucide-ellipsis-vertical"
              color="neutral"
              variant="ghost"
              aria-label="Actions"
            />
          </NuxtDropdownMenu>
        </template>
      </NuxtTable>
      <div class="flex items-center flex-wrap gap-5 justify-between mt-5">
        <p class="text-sm">
          Menampilkan 1 - 5 dari 8 tagihan
        </p>
        <NuxtPagination
          v-model:page="page"
          :total="bills?.data?.length"
          class="float-end"
          show-edges
        />
      </div>
    </div>
  </article>
</template>

<script lang="ts" setup>
import type { DropdownMenuItem, TableColumn } from '@nuxt/ui'
import type { IBill } from '~~/lib/domain/entity/bill'

definePageMeta({
  layout: 'dashboard'
})

const { $useCases } = useNuxtApp()

const statusSelect = ref(['Backlog', 'Todo', 'In Progress', 'Done'])
const statusSelectValue = ref('')

const categorySelect = ref(['Internet', 'Utilities'])
const categorySelectValue = ref('')

const NuxtBadge = resolveComponent('NuxtBadge')
const toast = useToast()

// table data
const { data: bills, status } = useAsyncData('bills',
  () => $useCases.bill.getAllBills.execute({}))
const columns: TableColumn<IBill>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => `#${row.getValue('id')}`
  },
  {
    accessorKey: 'name',
    cell: ({ row }) => `${row.getValue('name')}`
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => row.getValue('description')
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => `${currencyFormat(row.getValue('amount'), row.getValue('currency'))}`
  },
  {
    accessorKey: 'due_date',
    header: 'Due Date',
    cell: ({ row }) => new Date(row.getValue('due_date')).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status')
      const statusColors = {
        pending: 'neutral' as const,
        overdue: 'error' as const,
        paid: 'success' as const
      }[row.getValue('status') as string]

      return h(NuxtBadge, { class: 'capitalize', variant: 'subtle', color: statusColors }, () =>
        status
      )
    }
  },
  {
    accessorKey: 'billing_type',
    header: 'Billing type',
    cell: ({ row }) => row.getValue('billing_type')
  },
  {
    accessorKey: 'frequency',
    header: 'Frequency',
    cell: ({ row }) => row.getValue('frequency')
  },
  {
    accessorKey: 'attachment_url',
    header: 'Attachment',
    cell: ({ row }) => row.getValue('attachment_url')
  },
  {
    id: 'action'
  }
]
const page = ref(1)

function getDropdownActions(bill: IBill): DropdownMenuItem[][] {
  return [
    [
      {
        label: 'Copy user Id',
        icon: 'i-lucide-copy',
        onSelect: () => {
          toast.add({
            title: `Bill ${bill.id} copied to clipboard!`,
            color: 'success',
            icon: 'i-lucide-circle-check'
          })
        }
      }
    ],
    [
      {
        label: 'Edit',
        icon: 'i-lucide-edit'
      },
      {
        label: 'Delete',
        icon: 'i-lucide-trash',
        color: 'error',
        onSelect: async () => {
          await $useCases.bill.deleteBill.execute({ payload: { id: bill.id } })
          await refreshNuxtData('bills')
        }
      }
    ]
  ]
}
</script>
