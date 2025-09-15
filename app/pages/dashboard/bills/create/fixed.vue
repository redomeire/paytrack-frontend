<template>
  <article class="p-4">
    <div class="flex justify-between gap-5 flex-wrap">
      <div>
        <h1 class="text-2xl font-bold">
          Create New Bill
        </h1>
        <p>
          Fill in the details of your new bill.
        </p>
      </div>
    </div>
    <div class="mt-10">
      <NuxtForm
        :schema="billsSchema"
        :state="state"
        @submit="handleCreateBill"
      >
        <div class="form-group grid md:grid-cols-2 gap-5">
          <NuxtFormField
            label="Bill Name"
            name="name"
            required
          >
            <NuxtInput
              v-model="state.name"
              color="primary"
              size="xl"
              class="w-full"
              placeholder="Enter bill name"
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
              :ui="{ leading: 'pr-3' }"
              class="w-full"
              size="xl"
              create-item
              @create="onCreateCategory"
            />
          </NuxtFormField>
        </div>
        <NuxtFormField
          label="Description"
          name="desription"
          class="mt-5"
        >
          <NuxtTextarea
            v-model="state.description"
            color="primary"
            size="xl"
            class="w-full"
            placeholder="ex: Monthly electricity bill for January 2024"
          />
          <div class="form group grid md:grid-cols-2 gap-3 mt-5">
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
          <div class="form-group grid md:grid-cols-2 gap-5 mt-5">
            <NuxtFormField
              label="Due Date"
              name="due_date"
              required
            >
              <NuxtInput
                v-model="state.due_date"
                :ui="{ leading: 'pr-3' }"
                class="w-full"
                size="xl"
                type="date"
              />
            </NuxtFormField>
            <NuxtFormField
              label="Attachment URL"
              name="attachment_url"
            >
              <NuxtInput
                v-model="state.attachment_url"
                :ui="{ leading: 'pr-3' }"
                class="w-full"
                size="xl"
              />
            </NuxtFormField>
          </div>
          <h1 class="text-xl font-bold mt-5">
            Billing Information
          </h1>
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
          <NuxtFormField
            label="Notes"
            name="notes"
            class="mt-5"
          >
            <NuxtTextarea
              v-model="state.notes"
              :ui="{ leading: 'pr-3' }"
              class="w-full"
              size="xl"
            />
          </NuxtFormField>
        </NuxtFormField>
        <NuxtButton
          type="submit"
          color="primary"
          size="xl"
          class="mt-5 w-full flex items-center justify-center"
          icon="mdi-plus"
          :loading="status === 'pending'"
          :disabled="status === 'pending'"
        >
          Create Bill
        </NuxtButton>
      </NuxtForm>
    </div>
  </article>
</template>

<script lang="ts" setup>
import type { FormSubmitEvent } from '@nuxt/ui'
import type { InferedBillsSchema } from '~~/shared/types/bills/billsSchema'
import { billsSchema } from '~~/shared/types/bills/billsSchema'
import { NuxtFormField, NuxtTextarea } from '#components'
import countries from '~/assets/country/countries_with_all_data.json'
import type { IGetAllBillCategoriesResponse } from '~~/lib/common/types/http/bill/getAllBillCategories'

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
  amount: 0,
  currency: 'IDR',
  notes: '',
  attachment_url: '',
  due_date: '',
  period: null,
  account_number: '',
  account_name: '',
  bank_code: '',
  billing_information_id: undefined
} as Partial<InferedBillsSchema>)
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

const { status, execute } = await useAsyncData(
  () => $useCases.bill.createBill.execute({
    payload: {
      ...state,
      bill_category_id: state.bill_category_id?.value
    }
  }), {
    immediate: false
  })
const { data: recipientAccounts } = await useAsyncData(
  () => $useCases.bill.getAllBillingInformations.execute({}),
  {
    transform: (data) => ({
      data: data?.data?.data.map((channel) => {
        return {
          label: `${channel.name} - ${channel.details.account_number}`,
          value: channel.id,
          account_id: channel.details.account_id,
          account_name: channel.details.account_name
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

const handleCreateBill = async (event: FormSubmitEvent<InferedBillsSchema>) => {
  event.preventDefault()
  await execute()

  if (status.value !== 'error') {
    navigateTo('/dashboard/bills')
  }
}
const onCreateCategory = (name: string) => {
  navigateTo(`/dashboard/bills/category/create?name=${encodeURIComponent(name)}`)
}
</script>
