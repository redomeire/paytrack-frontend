<template>
  <div class="dashboard">
    <ul class="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-3">
      <li
        v-for="boxItem in boxItems"
        :key="boxItem.title"
        :class="containerClasses(boxItem.color)"
      >
        <div>
          <NuxtButton
            :icon="boxItem.icon"
            :class="cn(
              boxItem.color,
              'rounded-full p-2'
            )"
            variant="soft"
            active
            active-variant="soft"
            active-color="primary"
            size="xl"
          />
        </div>
        <div class="text-center">
          <h2 class="text-body-sm font-[500]">
            {{ boxItem.title }}
          </h2>
          <p class="text-heading-4 font-semibold">
            {{ boxItem.value }}
          </p>
        </div>
      </li>
    </ul>
    <div class="grid md:grid-cols-5 items-stretch gap-5 mt-5">
      <div
        id="popular-billd"
        class="rounded-2xl shadow-lg hover:shadow-xl transition-shadow md:col-span-2 h-fit p-7"
      >
        <h6 class="text-heading-6 font-[500] my-3">
          Upcoming Bills
        </h6>
        <div v-if="billsStatus === 'success'">
          <ul
            v-if="bills?.data?.data.length && bills?.data?.data.length > 0"
            class="space-y-3 mt-5"
          >
            <li
              v-for="bill in bills?.data?.data"
              :key="bill.id"
              class="rounded-lg p-3 bg-accented/40 hover:outline hover:outline-primary"
            >
              <NuxtLink
                :to="`/dashboard/bills/${bill.id}`"
                class="flex justify-between items-center"
              >
                <div class="flex items-center gap-3">
                  <div>
                    <p class="text-ellipsis line-clamp-1">{{ bill.name }}</p>
                    <p class="text-xs text-muted-foreground">
                      Due {{ dateTimeFormat({ date: bill.due_date }) }}
                    </p>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <div>
                    <p class="text-sm text-muted-foreground">
                      Amount
                    </p>
                    <p class="font-semibold">
                      {{ currencyFormat(bill.amount, bill.currency ?? 'IDR') }}
                    </p>
                  </div>
                </div>
              </NuxtLink>
            </li>
          </ul>
          <ul v-else>
            <li class="text-center text-sm text-muted-foreground py-10">
              No upcoming bills found.
            </li>
          </ul>
        </div>
        <div v-else-if="billsStatus === 'pending'">
          <div class="text-center py-10">
            <NuxtProgress
              size="xs"
              animation="swing"
            />
          </div>
        </div>
        <div v-else-if="billsStatus === 'error'">
          <NuxtAlert
            color="error"
            title="Failed to load upcoming bills."
            message="Please try again later."
          />
        </div>
      </div>
      <div
        id="recent-activities"
        class="rounded-2xl shadow-lg hover:shadow-xl transition-shadow md:col-span-3 min-h-48 p-7 max-w-full overflow-auto"
      >
        <h4 class="text-heading-6 font-[500] mb-5">
          Recent Activities
        </h4>
        <NuxtTable
          :data="tableDatas"
          class="flex-1 max-h"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NuxtButton } from '#components'
import dateTimeFormat from '~~/shared/utils/dateTimeFormat'

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth']
})
const { $useCases } = useNuxtApp()
const boxItems = [
  {
    title: 'Total belum dibayar',
    value: 'Rp 2.525.000',
    icon: 'i-mynaui-dollar-waves',
    color: 'bg-error-100 text-error-800'
  },
  {
    title: 'Tagihan mendatang',
    value: '3',
    icon: 'i-icon-park-outline-notes',
    color: 'bg-success-100 text-success-800'
  },
  {
    title: 'Total tagihan',
    value: '6',
    icon: 'i-hugeicons-user-group',
    color: 'bg-primary-100 text-primary-800'
  },
  {
    title: 'Terlambat bayar',
    value: '1',
    icon: 'i-material-symbols-info-outline',
    color: 'bg-purple-100 text-purple-800'
  }
]

const limit = ref(5)
const { data: bills, status: billsStatus } = useAsyncData('bills',
  () => $useCases.bill.getUpcomingBills.execute({
    options: {
      query: {
        limit: limit.value
      }
    }
  }))
const tableDatas = ref([
  {
    number: 'bill-4599',
    generated_date: dateTimeFormat({ date: '2024-03-12T10:30:00', timezone: 'Asia/Jakarta' }),
    status: 'failed',
    email: 'mia.white@example.com',
    amount: 276
  },
  {
    number: 'bill-4598',
    generated_date: dateTimeFormat({ date: '2024-03-12T10:30:00', timezone: 'Asia/Jakarta' }),
    status: 'refunded',
    email: 'william.brown@example.com',
    amount: 315
  },
  {
    number: 'bill-4597',
    generated_date: dateTimeFormat({ date: '2024-03-12T10:30:00', timezone: 'Asia/Jakarta' }),
    status: 'paid',
    email: 'emma.davis@example.com',
    amount: 529
  },
  {
    number: 'bill-4596',
    generated_date: dateTimeFormat({ date: '2024-03-12T10:30:00', timezone: 'Asia/Jakarta' }),
    status: 'paid',
    email: 'ethan.harris@example.com',
    amount: 639
  }
])

const containerClasses = (color: string) => {
  return cn(
    'flex flex-col items-center justify-center gap-3',
    `rounded-2xl p-4 shadow hover:shadow-lg transition`,
    color
  )
}
</script>
