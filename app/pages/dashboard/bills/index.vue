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
        v-model="search"
        name="search"
        icon="i-lucide-search"
        placeholder="Cari tagihan"
        class="w-full"
        size="xl"
        @keyup.enter="execute"
      />
      <div class="grid md:grid-cols-4 gap-4 mt-5">
        <NuxtSelectMenu
          v-model="categorySelectValue"
          :items="categories?.data"
          :ui="{ leading: 'pr-3' }"
          class="w-full"
          size="xl"
          create-item
          placeholder="Select Category"
          :trailing="false"
        >
          <template #trailing="{ modelValue }">
            <NuxtButton
              v-if="modelValue?.value !== ''"
              variant="ghost"
              class="rounded-full -translate-x-1"
              icon="i-ix-clear"
              size="md"
              color="error"
              @click="categorySelectValue = { label: '', value: '' }"
            />
          </template>
        </NuxtSelectMenu>
      </div>
    </div>
    <div
      id="bills-list"
      class="mt-5"
    >
      <NuxtTable
        :data="bills?.data?.data"
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
          Menampilkan {{ bills?.data?.from }} - {{ bills?.data?.to }} dari {{ bills?.data?.total }} tagihan
        </p>
        <NuxtPagination
          v-model:page="page"
          :items-per-page="10"
          :total="bills?.data?.total"
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

// global state
const { $useCases } = useNuxtApp()
const toast = useToast()

// queries
const search = ref('')
const page = ref(1)

// category filter
const { data: categories } = await useAsyncData('categories',
  () => $useCases.bill.getAllBillCategories.execute({}),
  {
    transform: (data) => {
      return {
        data: data.data?.map((category: { id: string, name: string }) => ({
          label: category.name,
          value: category.id
        }))
      }
    }
  })
const categorySelectValue = ref({ label: '', value: '' })

// table data
const { data: bills, status, execute } = useAsyncData('bills',
  () => $useCases.bill.getAllBills.execute({
    options: {
      query: {
        search: search.value,
        page: page.value,
        bill_category_id: categorySelectValue.value?.value
      }
    }
  }), {
    watch: [page, categorySelectValue]
  })

// table column
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
    cell: ({ row }) => `${currencyFormat(row.getValue('amount'), row.original.currency)}`
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

// functions
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
        icon: 'i-lucide-edit',
        onSelect() {
          navigateTo(`/dashboard/bills/${bill.id}`)
        }
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
