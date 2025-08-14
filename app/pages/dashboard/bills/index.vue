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
        :data="mockBills"
        :columns="columns"
        class="flex-1 max-h"
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
          :total="mockBills.length"
          class="float-end"
          show-edges
        />
      </div>
    </div>
  </article>
</template>

<script lang="ts" setup>
import type { DropdownMenuItem, TableColumn } from '@nuxt/ui'

definePageMeta({
  layout: 'dashboard'
})

const statusSelect = ref(['Backlog', 'Todo', 'In Progress', 'Done'])
const statusSelectValue = ref('')

const categorySelect = ref(['Internet', 'Utilities'])
const categorySelectValue = ref('')

const NuxtBadge = resolveComponent('NuxtBadge')
const toast = useToast()

// table data
interface Bill {
  id: number
  name: string
  company: string
  amount: number
  dueDate: string
  status: string
  category: string
  recurring: string
  lastPaid: string
}
const mockBills: Bill[] = [
  {
    id: 1,
    name: 'Listrik PLN',
    company: 'PT PLN Persero',
    amount: 450000,
    dueDate: '2024-01-15',
    status: 'pending',
    category: 'Utilities',
    recurring: 'monthly',
    lastPaid: '2023-12-15'
  },
  {
    id: 2,
    name: 'Internet Indihome',
    company: 'Telkom Indonesia',
    amount: 350000,
    dueDate: '2024-01-10',
    status: 'overdue',
    category: 'Internet',
    recurring: 'monthly',
    lastPaid: '2023-11-10'
  },
  {
    id: 3,
    name: 'Asuransi Kesehatan',
    company: 'Allianz Indonesia',
    amount: 1200000,
    dueDate: '2024-01-20',
    status: 'paid',
    category: 'Insurance',
    recurring: 'monthly',
    lastPaid: '2024-01-18'
  },
  {
    id: 4,
    name: 'Netflix Subscription',
    company: 'Netflix',
    amount: 186000,
    dueDate: '2024-01-25',
    status: 'pending',
    category: 'Entertainment',
    recurring: 'monthly',
    lastPaid: '2023-12-25'
  },
  {
    id: 5,
    name: 'Spotify Premium',
    company: 'Spotify',
    amount: 65000,
    dueDate: '2024-01-08',
    status: 'paid',
    category: 'Entertainment',
    recurring: 'monthly',
    lastPaid: '2024-01-08'
  },
  {
    id: 6,
    name: 'Kartu Kredit BCA',
    company: 'Bank BCA',
    amount: 2500000,
    dueDate: '2024-01-30',
    status: 'pending',
    category: 'Credit Card',
    recurring: 'monthly',
    lastPaid: '2023-12-28'
  },
  {
    id: 7,
    name: 'Air PDAM',
    company: 'PDAM Jakarta',
    amount: 125000,
    dueDate: '2024-01-12',
    status: 'overdue',
    category: 'Utilities',
    recurring: 'monthly',
    lastPaid: '2023-11-12'
  },
  {
    id: 8,
    name: 'Gas PGN',
    company: 'PT PGN',
    amount: 85000,
    dueDate: '2024-01-18',
    status: 'pending',
    category: 'Utilities',
    recurring: 'monthly',
    lastPaid: '2023-12-18'
  }
]
const columns: TableColumn<Bill>[] = [
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
    accessorKey: 'company',
    header: 'Company',
    cell: ({ row }) => row.getValue('company')
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => `Rp ${row.getValue('amount')}`
  },
  {
    accessorKey: 'dueDate',
    header: 'Due Date',
    cell: ({ row }) => new Date(row.getValue('dueDate')).toLocaleDateString('id-ID', {
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
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => row.getValue('category')
  },
  {
    accessorKey: 'recurring',
    header: 'Recurring',
    cell: ({ row }) => row.getValue('recurring')
  },
  {
    accessorKey: 'lastPaid',
    header: 'Last Paid',
    cell: ({ row }) => new Date(row.getValue('lastPaid')).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  },
  {
    id: 'action'
  }
]
const page = ref(1)

function getDropdownActions(bill: Bill): DropdownMenuItem[][] {
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
        color: 'error'
      }
    ]
  ]
}
</script>
