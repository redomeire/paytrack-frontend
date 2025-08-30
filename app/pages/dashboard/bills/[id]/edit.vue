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
    <article
      v-if="data?.billDetail.data"
      class="p-4"
    >
      <div class="flex justify-between gap-5 flex-wrap">
        <div>
          <h1 class="text-2xl font-bold">
            Update Bill
          </h1>
          <p>
            Modify the details of your bill below.
          </p>
        </div>
        <div>
          <NuxtButton
            :to="`/dashboard/bills/${billId}/payments`"
            color="primary"
            size="xl"
            class="flex items-center justify-center"
            variant="outline"
          >
            <NuxtIcon name="i-material-symbols-visibility" />
            <span class="ml-2">View payment history</span>
          </NuxtButton>
        </div>
      </div>
      <div class="mt-10">
        <NuxtForm
          :schema="billsSchema"
          :state="state"
          @submit="handleUpdateBill"
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
                :items="data?.billCategories"
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
            name="description"
            class="mt-5"
          >
            <NuxtTextarea
              v-model="state.description"
              color="primary"
              size="xl"
              class="w-full"
              placeholder="ex: Monthly electricity bill for January 2024"
            />
          </NuxtFormField>
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
                  currency: state.currency ?? 'IDR',
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
          <NuxtButton
            type="submit"
            color="primary"
            size="xl"
            class="mt-5 w-full flex items-center justify-center"
            :loading="updateStatus === 'pending'"
            :disabled="updateStatus === 'pending'"
          >
            Update Bill
          </NuxtButton>
        </NuxtForm>
        <div class="mt-10">
          <NuxtContainer class="border-error border-2 rounded-xl p-3">
            <h3 class="text-heading-6 font-semibold">
              Danger Zone
            </h3>
            <div class="flex items-center justify-between mt-5">
              <div>
                <h6
                  class="text-body-lg font-semibold"
                >
                  Delete Bill
                </h6>
                <p class="text-sm text-gray-500">
                  Deleting a bill is permanent and cannot be undone. Please proceed with caution.
                </p>
              </div>
              <div>
                <NuxtModal>
                  <NuxtButton
                    variant="solid"
                    color="error"
                  >
                    Delete Bill
                  </NuxtButton>
                  <template #content>
                    <div class="p-5">
                      <p class="text-lg font-semibold">
                        Confirm deletion
                      </p>
                      <p class="text-sm">
                        Are you sure you want to delete this bill? This action cannot be undone.
                      </p>
                      <NuxtButton
                        class="w-fit float-end"
                        color="error"
                        variant="solid"
                        :loading="deleteStatus === 'pending'"
                        :disabled="deleteStatus === 'pending'"
                        @click="handleDeleteBill"
                      >
                        Delete permanently
                      </NuxtButton>
                    </div>
                  </template>
                </NuxtModal>
              </div>
            </div>
          </NuxtContainer>
        </div>
      </div>
    </article>
  </div>
</template>

<script lang="ts" setup>
import type { FormSubmitEvent } from '@nuxt/ui'
import type { InferedBillsSchema } from '~~/shared/types/bills/billsSchema'
import { billsSchema } from '~~/shared/types/bills/billsSchema'
import { NuxtFormField, NuxtTextarea } from '#components'
import countries from '~/assets/country/countries_with_all_data.json'

useSeoMeta({
  title: 'Edit Bill - PayTrack',
  description: 'Edit the details of your bill, including name, category, amount, and due date.'
})

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth']
})

const { $useCases } = useNuxtApp()
const route = useRoute()
const billId = route.params.id as string

if (!billId) {
  throw new Error('Bill ID is required')
}

const currencies: string[] = countries.map((country) => country.currencies!)

const { data, error } = await useAsyncData(async () => {
  const [billDetail, billCategories] = await Promise.all([
    $useCases.bill.getBillDetail.execute({ payload: { id: billId } }),
    $useCases.bill.getAllBillCategories.execute({})
  ])
  return {
    billDetail,
    billCategories
  }
}, {
  transform: (data) => {
    return {
      billDetail: data.billDetail,
      billCategories: data.billCategories.data?.map((billCategory) => ({
        label: billCategory.name,
        value: billCategory.id
      }))
    }
  }
})

const state = reactive({
  ...data.value?.billDetail.data,
  due_date: data.value?.billDetail?.data?.due_date ? new Date(data.value?.billDetail?.data?.due_date).toISOString().split('T')[0] : '',
  description: data.value?.billDetail.data?.description ?? '',
  notes: data.value?.billDetail.data?.notes ?? '',
  attachment_url: data.value?.billDetail.data?.attachment_url ?? '',
  bill_category_id: data.value?.billCategories?.find((category) => category.value === data.value?.billDetail.data?.bill_category_id) ?? null
} as Partial<InferedBillsSchema>)

const { status: updateStatus, execute: executeUpdate } = await useAsyncData(() => $useCases.bill.updateBill.execute({
  payload: {
    bill: {
      ...state,
      bill_category_id: state.bill_category_id?.value
    }
  }
}), {
  immediate: false
})

const { status: deleteStatus, execute: executeDelete } = await useAsyncData(() => $useCases.bill.deleteBill.execute({
  payload: {
    id: billId
  }
}), {
  immediate: false
})
const handleUpdateBill = async (event: FormSubmitEvent<InferedBillsSchema>) => {
  event.preventDefault()

  await executeUpdate()
  if (updateStatus.value === 'success') {
    navigateTo('/dashboard/bills')
  }
}
const handleDeleteBill = async () => {
  await executeDelete()
  if (deleteStatus.value === 'success') {
    navigateTo('/dashboard/bills')
  }
}
const onCreateCategory = (name: string) => {
  navigateTo(`/dashboard/bills/category/create?name=${encodeURIComponent(name)}`)
}
</script>
