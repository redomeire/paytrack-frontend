<template>
  <article class="p-4">
    <div class="flex justify-between gap-5 flex-wrap">
      <div>
        <h1 class="text-2xl font-bold">
          Create New Recurring Bill
        </h1>
        <p class="text-gray-500 dark:text-gray-400">
          Fill in the details to create a new recurring bill series.
        </p>
      </div>
    </div>

    <div class="mt-10 max-w-3xl">
      <NuxtForm
        :schema="billSeries"
        :state="state"
        class="space-y-6"
        @submit="handleCreateRecurringBill"
      >
        <div class="p-6 border border-gray-200 dark:border-gray-700 rounded-lg space-y-6">
          <h2 class="text-lg font-semibold border-b dark:border-gray-700 pb-4">
            Bill Details
          </h2>

          <NuxtFormField
            label="Bill Name"
            name="name"
            required
          >
            <NuxtInput
              v-model="state.name"
              size="xl"
              placeholder="e.g., Netflix Subscription"
              class="w-full"
            />
          </NuxtFormField>

          <NuxtFormField
            label="Bill Category"
            name="bill_category_id"
            required
          >
            <NuxtSelectMenu
              v-model="state.bill_category_id"
              :items="billCategories"
              value-attribute="value"
              option-attribute="label"
              size="xl"
              class="w-full"
              placeholder="Select a category"
              create-item
              @create="onCreateCategory"
            />
          </NuxtFormField>

          <div class="grid md:grid-cols-2 gap-3">
            <NuxtFormField
              label="Amount"
              name="amount"
              required
            >
              <NuxtInputNumber
                v-model="state.amount"
                :format-options="{
                  style: 'currency',
                  currency: state.currency,
                  currencyDisplay: 'symbol',
                  currencySign: 'standard'
                }"
                :min="0"
                :locale="'id-ID'"
                orientation="vertical"
                size="xl"
                class="w-full"
              >
                <template #decrement>
                  <div />
                </template>
                <template #increment>
                  <div />
                </template>
              </NuxtInputNumber>
            </NuxtFormField>
            <NuxtFormField
              label="Currency"
              name="currency"
              required
            >
              <NuxtSelectMenu
                v-model="state.currency"
                :items="currencies"
                :ui="{ leading: 'pr-3' }"
                class="w-full"
                size="xl"
              />
            </NuxtFormField>
          </div>

          <NuxtFormField
            label="Description"
            name="description"
          >
            <NuxtTextarea
              v-model="state.description"
              size="xl"
              class="w-full"
              placeholder="A brief description of the bill series"
            />
          </NuxtFormField>
        </div>
        <div class="p-6 border border-gray-200 dark:border-gray-700 rounded-lg space-y-6">
          <h2 class="text-lg font-semibold border-b dark:border-gray-700 pb-4">
            Billing Information
          </h2>
          <p>
            Fill in the billing information for this bill.
          </p>
          <NuxtFormField
            v-if="recipientAccounts?.data"
            label="Billing Information Details"
            name="billing_information_id"
            class="mt-5"
          >
            <NuxtSelectMenu
              v-model="billingInformationOption"
              :items="recipientAccounts?.data"
              :ui="{ leading: 'pr-3' }"
              class="w-full"
              size="xl"
              placeholder="Select Billing Information"
            />
          </NuxtFormField>
          <div class="form-group grid md:grid-cols-3 gap-5 mt-5">
            <NuxtFormField
              label="Account Number"
              name="account_number"
              required
            >
              <NuxtInput
                v-model="state.account_number"
                :ui="{ leading: 'pr-3' }"
                class="w-full"
                size="xl"
                placeholder="ex: 1234567890"
              />
            </NuxtFormField>
            <NuxtFormField
              label="Account Name"
              name="account_name"
              required
            >
              <NuxtInput
                v-model="state.account_name"
                :ui="{ leading: 'pr-3' }"
                class="w-full"
                size="xl"
                placeholder="ex: John Doe"
              />
            </NuxtFormField>
            <NuxtFormField
              label="Channel Code"
              name="bank_code"
              required
            >
              <NuxtSelectMenu
                v-model="paymentChannelOption"
                :items="paymentChannel.channel"
                placeholder="Pilih Akun"
                size="xl"
                class="w-full"
              />
            </NuxtFormField>
          </div>
        </div>

        <div class="p-6 border border-gray-200 dark:border-gray-700 rounded-lg space-y-6">
          <h2 class="text-lg font-semibold border-b dark:border-gray-700 pb-4">
            Billing Cycle
          </h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <NuxtFormField
              label="Frequency"
              name="frequency"
              required
            >
              <NuxtSelectMenu
                v-model="state.frequency"
                :items="['monthly', 'annual', 'custom']"
                size="xl"
              />
            </NuxtFormField>

            <NuxtFormField
              label="Interval"
              name="frequency_interval"
              required
            >
              <NuxtInput
                v-model.number="state.frequency_interval"
                type="number"
                size="xl"
                :min="1"
              />
            </NuxtFormField>

            <NuxtFormField
              label="Due Day"
              name="due_day"
              required
            >
              <NuxtInput
                v-model.number="state.due_day"
                type="number"
                size="xl"
                placeholder="e.g., 15"
                :min="1"
                :max="31"
              />
              <template #help>
                The day of the month bill is due (1-31).
              </template>
            </NuxtFormField>

            <NuxtFormField
              label="Start Date"
              name="start_date"
              required
            >
              <NuxtInput
                v-model="state.start_date"
                type="date"
                size="xl"
              />
              <template #help>
                The date the first invoice should generate.
              </template>
            </NuxtFormField>
          </div>

          <NuxtFormField
            name="is_active"
            class="flex items-center justify-between"
          >
            <template #label>
              <div>
                <p class="font-medium">
                  Activate Series
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  If disabled, no new invoices will be generated.
                </p>
              </div>
            </template>
            <NuxtSwitch
              v-model="state.is_active"
            />
          </NuxtFormField>
        </div>

        <div class="flex justify-end">
          <NuxtButton
            type="submit"
            size="xl"
            icon="i-heroicons-paper-airplane"
            :loading="status === 'pending'"
          >
            Create Bill Series
          </NuxtButton>
        </div>
      </NuxtForm>
    </div>
  </article>
</template>

<script lang="ts" setup>
import type { FormSubmitEvent } from '#ui/types'
import type { IGetAllBillCategoriesResponse } from '~~/lib/common/types/http/bill/getAllBillCategories'
import type { InferedBillSeries } from '~~/shared/types/recurring-bill/billSeriesSchema'
import { billSeries } from '~~/shared/types/recurring-bill/billSeriesSchema'
import countries from '~/assets/country/countries_with_all_data.json'

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth']
})

const { $useCases } = useNuxtApp()

const currencies: string[] = countries.map((country) => country.currencies!)
const { value: paymentChannel } = usePaymentChannelCode()
const paymentChannelOption = ref({ label: '', value: '' })

const state = reactive({
  name: '',
  bill_category_id: { label: '', value: '' },
  description: '',
  currency: 'IDR',
  amount: 0,
  frequency: 'monthly' as const,
  frequency_interval: 1,
  custom_frequency_days: undefined,
  due_day: 15,
  start_date: new Date().toISOString().split('T')[0],
  is_active: true,
  account_number: '',
  account_name: '',
  bank_code: '',
  billing_information_id: undefined
} as Partial<InferedBillSeries>)
watch(paymentChannelOption, (newVal) => {
  state.bank_code = newVal.value
})

const { data: billCategories } = useAsyncData('bill-categories', () =>
  $useCases.bill.getAllBillCategories.execute({}), {
  immediate: true,
  transform: (data: IGetAllBillCategoriesResponse) => {
    return data?.data?.map((billCategory) => ({
      label: billCategory.name,
      value: billCategory.id
    }))
  }
})
watch(billCategories, (newCategories) => {
  if (newCategories && newCategories.length > 0) {
    state.bill_category_id = newCategories[0]!
  }
})

const {
  data,
  status,
  execute
} = await useAsyncData(() =>
  $useCases.bill.createBillSeries.execute({
    payload: {
      ...state,
      bill_category_id: state.bill_category_id?.value
    }
  }), {
  immediate: false
})

const { data: recipientAccounts } = await useAsyncData(
  () => $useCases.bill.getAllRecipientAccounts.execute({}),
  {
    transform: (data) => ({
      data: data?.data?.data.map((channel) => {
        const details = JSON.parse(channel.details)
        return {
          label: `${channel.name} - ${details.account_number}`,
          value: channel.id,
          account_id: details.account_id,
          account_name: details.account_name
        }
      })
    })
  }
)
const billingInformationOption = ref({ label: '', value: '', account_name: '', account_id: '' })
watch(billingInformationOption, (newVal) => {
  state.account_name = newVal.label.split(' - ')[0] || ''
  state.account_number = newVal.label.split(' - ')[1] || ''
  paymentChannelOption.value = { label: newVal.account_name, value: newVal.account_id }
  state.bank_code = newVal.account_id
  state.billing_information_id = newVal.value
})

const handleCreateRecurringBill = async (event: FormSubmitEvent<InferedBillSeries>) => {
  event.preventDefault()
  await execute()

  if (data.value?.success) {
    navigateTo('/dashboard/bills')
  }
}

const onCreateCategory = (name: string) => {
  navigateTo(`/dashboard/bills/category/create?name=${encodeURIComponent(name)}`)
}
</script>
