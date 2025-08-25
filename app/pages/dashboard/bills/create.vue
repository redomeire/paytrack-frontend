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
          <div class="form group grid md:grid-cols-3 gap-3 mt-5">
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
            <NuxtFormField
              label="Billing Type"
              name="billing_type"
              required
            >
              <NuxtSelect
                v-model="state.billing_type"
                :items="['fixed', 'recurring']"
                :ui="{ leading: 'pr-3' }"
                class="w-full"
                size="xl"
              />
            </NuxtFormField>
          </div>
          <div class="form-group grid md:grid-cols-2 gap-5 mt-5">
            <NuxtFormField
              v-if="state.billing_type === 'recurring'"
              label="Billing Frequency"
              name="frequency"
            >
              <NuxtSelect
                v-model="state.frequency"
                :items="['monthly', 'annual', 'custom']"
                :ui="{ leading: 'pr-3' }"
                class="w-full"
                size="xl"
              />
            </NuxtFormField>
            <NuxtFormField
              v-if="state.frequency === 'custom' && state.billing_type === 'recurring'"
              label="Custom Frequency (Days)"
              name="custom_frequency_days"
            >
              <NuxtInputNumber
                v-model="state.custom_frequency_days"
                orientation="vertical"
                size="xl"
                class="w-full"
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
const state = reactive({
  name: '',
  bill_category_id: { label: '', value: '' },
  description: '',
  amount: 0,
  currency: 'IDR',
  billing_type: 'fixed' as const,
  frequency: undefined as string | null | undefined,
  custom_frequency_days: undefined,
  notes: '',
  attachment_url: '',
  due_date: ''
} as Partial<InferedBillsSchema>)

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

const { status, execute } = await useAsyncData(() => $useCases.bill.createBill.execute({
  payload: {
    ...state,
    bill_category_id: state.bill_category_id?.value
  }
}), {
  immediate: false
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
