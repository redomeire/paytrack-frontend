<template>
  <article class="dashboard p-4">
    <div class="flex justify-between gap-5 flex-wrap">
      <div>
        <h1 class="text-2xl font-bold">
          Payments
        </h1>
        <p>
          Manage your payments and expenses in one place.
        </p>
      </div>
      <NuxtLink
        :to="'/dashboard/bills/' + $route.params.id + '/payments/create'"
      >
        <NuxtButton
          variant="soft"
          icon="i-material-symbols-add-rounded"
        >
          Pay
        </NuxtButton>
      </NuxtLink>
    </div>
    <div class="grid md:grid-cols-3">
      <NuxtFormField
        id="payments-date-range"
        class="rounded-lg mt-5"
        label="Date Range"
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
import type { IPayment } from '~~/lib/domain/entity/payment'

definePageMeta({
  layout: 'dashboard'
})

// global state
const { $useCases } = useNuxtApp()
const route = useRoute()
const toast = useToast()

// queries
const dateRange = shallowRef<{ start: CalendarDate | undefined, end: CalendarDate | undefined }>({
  start: undefined,
  end: undefined
})
const page = ref(1)

// table column
const NuxtBadge = resolveComponent('NuxtBadge')
const columns: TableColumn<IPayment>[] = [
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
function getDropdownActions(payment: IPayment): DropdownMenuItem[][] {
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
        label: 'Edit',
        icon: 'i-lucide-edit',
        onSelect() {
          navigateTo(`/dashboard/bills/${route.params.id}/payments/${payment.id}`)
        }
      },
      {
        label: 'Delete',
        icon: 'i-lucide-trash',
        color: 'error',
        onSelect: async () => {
          await $useCases.payment.deletePayment.execute({ payload: { id: payment.id } })
          await refreshNuxtData('payments')
        }
      }
    ]
  ]
}

// fetch payments
const { data: payments, status } = await useAsyncData('payments',
  () => $useCases.payment.getAllPayments.execute({
    options: {
      query: {
        start_date: dateRange.value.start?.toString(),
        end_date: dateRange.value.end?.toString()
      }
    }
  }), {
    watch: [dateRange]
  })
</script>
