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
    <article class="p-4">
      <div class="flex items-center justify-between gap-5 flex-wrap">
        <div>
          <h1 class="text-2xl font-bold">
            Bills
          </h1>
          <p>
            Manage your bills and expenses in once place.
          </p>
        </div>
        <NuxtModal
          close-icon="i-material-symbols-close"
        >
          <NuxtButton
            variant="soft"
            icon="i-material-symbols-add-rounded"
          >
            Create New Bill
          </NuxtButton>
          <template #content>
            <div class="p-5">
              <h5 class="text-heading-5 font-semibold text-center">
                Create a New Bill
              </h5>
              <p class="text-center text-body-sm mb-5">
                Choose the type of bill you want to create.
              </p>
              <div class="grid md:grid-cols-2 gap-3">
                <NuxtCard
                  class="p-2 hover:shadow-lg hover:outline hover:outline-primary cursor-pointer"
                  @click="$router.push('/dashboard/bills/create/fixed')"
                >
                  <div class="flex flex-col items-center text-center gap-3">
                    <NuxtIcon
                      name="i-lucide-file-text"
                      size="40"
                      class="text-current"
                    />
                    <h6 class="text-heading-6 font-semibold text-current">
                      Fixed Bill
                    </h6>
                    <p class="text-sm text-muted-foreground">
                      For one-time payments <br> like purchases or repairs.
                    </p>
                  </div>
                </NuxtCard>
                <NuxtCard
                  class="p-2 hover:shadow-lg hover:outline hover:outline-primary cursor-pointer bg-inverted"
                  @click="$router.push('/dashboard/bills/create/recurring')"
                >
                  <div class="flex flex-col items-center text-center gap-3">
                    <NuxtIcon
                      name="i-material-symbols-calendar-clock-outline"
                      size="40"
                      class="text-inverted"
                    />
                    <h6 class="text-heading-6 font-semibold text-inverted">
                      Recurring Bill
                    </h6>
                    <p class="w-full text-sm text-muted-foreground text-inverted">
                      Create a bill that recurs on a regular basis.
                    </p>
                  </div>
                </NuxtCard>
              </div>
            </div>
          </template>
        </NuxtModal>
      </div>
      <div class="grid md:grid-cols-6 items-start gap-5">
        <NuxtCard
          id="bills-search"
          class="rounded-lg mt-5 col-span-2 bg-elevated"
        >
          <NuxtInput
            v-model="search"
            name="search"
            icon="i-lucide-search"
            placeholder="Cari tagihan"
            class="w-full"
            size="xl"
            :ui="{
              base: 'placeholder:text-sm'
            }"
            @keyup.enter="() => {
              if (activeTab === 'upcoming') { executeBills() }
              else if (activeTab === 'recurring') { executeBillSeries() }
            }"
          />
          <div class="mt-5">
            <NuxtSelectMenu
              v-model="categorySelectValue"
              :items="categories?.data"
              :ui="{ leading: 'pr-3', input: 'placeholder:text-sm' }"
              class="w-full"
              size="xl"
              create-item
              placeholder="Pilih kategori"
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
        </NuxtCard>
        <NuxtCard
          id="bills-list"
          class="mt-5 col-span-4 bg-elevated"
        >
          <NuxtTabs
            v-model="activeTab"
            :items="tabItems"
          >
            <template #upcoming>
              <h6 class="text-heading-6 my-3">
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
                    class="rounded-lg p-3 bg-accented"
                  >
                    <div class="flex justify-between items-center">
                      <div class="flex items-center gap-3">
                        <NuxtIcon
                          name="i-logos-github-octocat"
                          class="text-primary"
                          size="32"
                        />
                        <div>
                          <p>{{ bill.name }}</p>
                          <p class="text-sm text-muted-foreground">
                            Due {{ dateTimeFormat({ date: bill.due_date }) }}
                          </p>
                        </div>
                      </div>
                      <div class="flex items-center gap-3">
                        <div>
                          <p class="text-sm text-muted-foreground">
                            Amount
                          </p>
                          <p class="font-medium">
                            {{ currencyFormat(bill.amount, bill.currency ?? 'IDR') }}
                          </p>
                        </div>
                        <NuxtDropdownMenu :items="getBillDropdownActions(bill)">
                          <NuxtButton
                            variant="soft"
                            size="sm"
                            color="primary"
                            icon="i-lucide-chevron-right"
                            @click="() => {}"
                          />
                        </NuxtDropdownMenu>
                      </div>
                    </div>
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
              <div class="flex items-center flex-wrap gap-5 justify-between mt-5">
                <p class="text-sm">
                  Menampilkan {{ bills?.data?.from }} - {{ bills?.data?.to }} dari {{ bills?.data?.total }} tagihan
                </p>
                <NuxtPagination
                  v-model:page="pageUpcoming"
                  :items-per-page="10"
                  :total="bills?.data?.total"
                  class="float-end"
                  show-edges
                />
              </div>
            </template>
            <template #recurring>
              <h6 class="text-heading-6 my-3">
                Recurring Bills
              </h6>
              <div v-if="billSeriesStatus === 'success'">
                <ul
                  v-if="billSeries?.data?.data && billSeries?.data?.data.length > 0"
                  class="space-y-3 mt-5"
                >
                  <li
                    v-for="recurringBill in billSeries?.data?.data"
                    :key="recurringBill.id"
                    class="rounded-lg p-3 bg-accented"
                  >
                    <div class="flex justify-between items-center">
                      <div class="flex items-center gap-3">
                        <NuxtIcon
                          name="i-logos-github-octocat"
                          class="text-primary"
                          size="32"
                        />
                        <div>
                          <p>{{ recurringBill.name }}</p>
                          <p class="text-sm text-muted-foreground">
                            Recurs {{ recurringBill.frequency }} starting {{ dateTimeFormat({ date: recurringBill.start_date }) }}
                          </p>
                        </div>
                      </div>
                      <div class="flex items-center gap-3">
                        <div>
                          <NuxtBadge :color="recurringBill.is_active ? 'success' : 'error'">
                            {{ recurringBill.is_active ? 'Active' : 'Inactive' }}
                          </NuxtBadge>
                        </div>
                        <NuxtDropdownMenu :items="getBillSeriesDropdownMenu(recurringBill)">
                          <NuxtButton
                            variant="soft"
                            size="sm"
                            color="primary"
                            icon="i-lucide-chevron-right"
                            @click="() => {}"
                          />
                        </NuxtDropdownMenu>
                      </div>
                    </div>
                  </li>
                </ul>
                <ul v-else>
                  <li class="text-center text-sm text-muted-foreground py-10">
                    No recurring bills found.
                  </li>
                </ul>
              </div>
              <div v-else-if="billSeriesStatus === 'pending'">
                <div class="text-center py-10">
                  <NuxtProgress
                    size="xs"
                    animation="swing"
                  />
                </div>
              </div>
              <div v-else-if="billSeriesStatus === 'error'">
                <NuxtAlert
                  color="error"
                  title="Failed to load recurring bills."
                  message="Please try again later."
                />
              </div>
              <div class="flex items-center flex-wrap gap-5 justify-between mt-5">
                <p class="text-sm">
                  Menampilkan {{ billSeries?.data?.from }} - {{ billSeries?.data?.to }} dari {{ billSeries?.data?.total }} tagihan
                </p>
                <NuxtPagination
                  v-model:page="pageRecurring"
                  :items-per-page="10"
                  :total="billSeries?.data?.total"
                  class="float-end"
                  show-edges
                />
              </div>
            </template>
          </NuxtTabs>
        </NuxtCard>
      </div>
    </article>
  </div>
</template>

<script lang="ts" setup>
import { NuxtDropdownMenu, NuxtIcon } from '#components'
import type { DropdownMenuItem, TabsItem } from '@nuxt/ui'
import type { IBill } from '~~/lib/domain/entity/bill'
import type { IBillSeries } from '~~/lib/domain/entity/bill-series'

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth']
})

// global state
const { $useCases, $router } = useNuxtApp()
const route = useRoute()
const toast = useToast()

const search = ref('')

// queries for upcoming
const pageUpcoming = ref(1)
// queries for recurring
const pageRecurring = ref(1)

// tabs item
const tabItems = [
  {
    label: 'Upcoming Bills',
    icon: 'i-lucide-calendar',
    value: 'upcoming',
    slot: 'upcoming' as const
  },
  {
    label: 'Recurring Bills',
    icon: 'i-lucide-repeat',
    value: 'recurring',
    slot: 'recurring' as const
  }
] satisfies TabsItem[]

const activeTab = computed({
  get() {
    return (route.query.tab as string) ?? 'upcoming'
  },
  set(tab) {
    $router.push({
      path: route.path,
      query: { tab }
    })
  }
})

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
const { data: bills, status: billsStatus, execute: executeBills, error } = useAsyncData('bills',
  () => $useCases.bill.getUpcomingBills.execute({
    options: {
      query: {
        search: search.value,
        page: pageUpcoming.value,
        bill_category_id: categorySelectValue.value?.value
      }
    }
  }), {
    immediate: false,
    watch: [pageUpcoming]
  })

const {
  data: billSeries,
  status: billSeriesStatus,
  execute: executeBillSeries
} = await useAsyncData('bills-series',
  () => $useCases.bill.getRecurringBills.execute({
    options: {
      query: {
        search: search.value,
        page: pageRecurring.value,
        bill_category_id: categorySelectValue.value?.value
      }
    }
  }), {
    immediate: false,
    watch: [pageRecurring]
  })
watch([activeTab, categorySelectValue], (newValue) => {
  if (newValue[0] === 'upcoming') {
    executeBills()
  }
  else if (newValue[0] === 'recurring') {
    executeBillSeries()
  }
})
onMounted(() => {
  if (activeTab.value === 'upcoming') {
    executeBills()
  }
  else if (activeTab.value === 'recurring') {
    executeBillSeries()
  }
})
// functions
function getBillDropdownActions(bill: IBill): DropdownMenuItem[][] {
  return [
    [
      {
        label: 'Copy Bill URL',
        icon: 'i-lucide-copy',
        onSelect: async () => {
          await navigator
            .clipboard
            .writeText(
              `${window.location.origin}${window.location.pathname}/${bill.id}`
            )
          toast.add({
            title: `Bill ${bill.name} copied to clipboard!`,
            color: 'success',
            icon: 'i-lucide-circle-check'
          })
        }
      }
    ],
    [
      {
        label: 'View',
        icon: 'i-lucide-eye',
        onSelect() {
          navigateTo(`/dashboard/bills/${bill.id}`)
        }
      },
      {
        label: 'Pay',
        icon: 'i-lucide-credit-card',
        onSelect() {
          navigateTo(`/dashboard/bills/${bill.id}/payments/create`)
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

function getBillSeriesDropdownMenu(billSeries: IBillSeries): DropdownMenuItem[][] {
  return [
    [
      {
        label: 'Copy Series URL',
        icon: 'i-lucide-copy',
        onSelect: async () => {
          await navigator
            .clipboard
            .writeText(
              `${window.location.origin}${window.location.pathname}/series/${billSeries.id}`
            )
          toast.add({
            title: `Series ${billSeries.name} copied to clipboard!`,
            color: 'success',
            icon: 'i-lucide-circle-check'
          })
        }
      }
    ],
    [
      {
        label: 'View',
        icon: 'i-lucide-eye',
        onSelect() {
          navigateTo(`/dashboard/bills/series/${billSeries.id}`)
        }
      },
      {
        label: 'Delete',
        icon: 'i-lucide-trash',
        color: 'error',
        onSelect: async () => {
          await $useCases.bill.deleteBillSeries.execute({ payload: { id: billSeries.id } })
          await refreshNuxtData('bills-series')
        }
      }
    ]
  ]
}
</script>
