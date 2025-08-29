<template>
  <article class="dashboard p-4">
    <div class="flex justify-between gap-5 flex-wrap">
      <div>
        <h1 class="text-2xl font-bold">
          History Payments
        </h1>
        <p>
          Here you can manage your payments and expenses in one place.
        </p>
      </div>
    </div>
    <div class="grid md:grid-cols-3 gap-3">
      <NuxtFormField
        id="search"
        class="rounded-lg mt-5"
        label="Search"
      >
        <NuxtInput
          v-model="search"
          name="search"
          icon="i-lucide-search"
          placeholder="search by name"
          class="w-full"
          size="xl"
          :ui="{
            base: 'placeholder:text-sm'
          }"
          @keyup.enter="execute"
        />
      </NuxtFormField>
      <NuxtFormField
        id="payments-date-range"
        class="rounded-lg mt-5"
        label="Due Date Range"
      >
        <NuxtPopover>
          <NuxtInput
            icon="i-material-symbols-calendar-month"
            size="xl"
            class="w-full"
            :value="`${dateRange.start?.toString() ?? ''} ~ ${dateRange.end?.toString() ?? ''}`"
            placeholder="Select Date Range"
          >
            <template #trailing>
              <NuxtButton
                v-if="dateRange?.start !== undefined && dateRange?.end !== undefined"
                variant="ghost"
                class="rounded-full -translate-x-1"
                icon="i-ix-clear"
                size="md"
                color="error"
                @click="dateRange = { start: undefined, end: undefined }"
              />
              <NuxtButton
                v-else
                variant="ghost"
                class="rounded-full -translate-x-1"
                size="md"
                color="neutral"
                aria-label="Select Date Range"
              />
            </template>
          </NuxtInput>
          <template #content>
            <NuxtCalendar
              v-model="dateRange"
              range
            />
          </template>
        </NuxtPopover>
      </NuxtFormField>
    </div>
    <div
      id="bills-list"
      class="mt-5"
    >
      <NuxtTable
        :data="payments?.data?.data"
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
          Menampilkan {{ payments?.data?.from }} - {{ payments?.data?.to }} dari {{ payments?.data?.total }} pembayaran
        </p>
        <NuxtPagination
          v-model:page="page"
          :items-per-page="10"
          :total="payments?.data?.total"
          class="float-end"
          show-edges
        />
      </div>
    </div>
  </article>
</template>

<script lang="ts" setup>
import { NuxtFormField } from '#components'
import type { CalendarDate } from '@internationalized/date'
import type { DropdownMenuItem, TableColumn } from '@nuxt/ui'
import type { IBill } from '~~/lib/domain/entity/bill'
import type { IPayment } from '~~/lib/domain/entity/payment'

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth']
})

// global state
const { $useCases } = useNuxtApp()
const toast = useToast()

// queries
const dateRange = shallowRef<{ start: CalendarDate | undefined, end: CalendarDate | undefined }>({
  start: undefined,
  end: undefined
})
const page = ref(1)
const search = ref('')

// table column
const NuxtBadge = resolveComponent('NuxtBadge')
const columns: TableColumn<IPayment & IBill>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => `${row.getValue('name')}`
  },
  {
    accessorKey: 'payment_method',
    header: 'Payment Method',
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
      const paidDate = row.original.paid_date
      const color = paidDate ? 'success' : 'error'

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
function getDropdownActions(payment: IPayment & IBill): DropdownMenuItem[][] {
  return [
    [
      {
        label: 'Copy user Id',
        icon: 'i-lucide-copy',
        onSelect: () => {
          toast.add({
            title: `Payment ${payment.id} copied to clipboard!`,
            color: 'success',
            icon: 'i-lucide-circle-check'
          })
        }
      }
    ],
    [
      {
        label: 'View Details',
        icon: 'i-lucide-eye',
        onSelect() {
          navigateTo(`/dashboard/bills/history/${payment.bill_id}`)
        }
      }
    ]
  ]
}

// fetch payments
const { data: payments, status, execute } = await useAsyncData('payments',
  () => $useCases.payment.getAllPayments.execute({
    options: {
      query: {
        start_date: dateRange.value.start?.toString(),
        end_date: dateRange.value.end?.toString(),
        search: search.value
      }
    }
  }), {
    watch: [dateRange]
  })
</script>
