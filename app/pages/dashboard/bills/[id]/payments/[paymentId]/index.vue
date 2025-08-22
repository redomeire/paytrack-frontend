<template>
  <article class="p-4">
    <div class="flex justify-between gap-5 flex-wrap">
      <div>
        <h1 class="text-2xl font-bold">
          Update Payment
        </h1>
        <p>
          Manage your payments and expenses in one place.
        </p>
      </div>
    </div>
    <div class="mt-10">
      <NuxtForm
        :schema="paymentSchema"
        :state="state"
        @submit="handleUpdatePayment"
      >
        <div class="form-group grid md:grid-cols-3 gap-5">
          <NuxtFormField
            label="Bill id"
            name="bill_id"
            required
          >
            <NuxtInput
              :value="state.bill_id"
              class="w-full"
              size="xl"
              disabled
            />
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
        </div>
        <div class="form group grid md:grid-cols-2 gap-3 mt-5">
          <NuxtFormField
            class="rounded-lg mt-5"
            label="Due date"
            name="due_date"
            required
          >
            <NuxtPopover>
              <NuxtInput
                icon="i-material-symbols-calendar-month"
                size="xl"
                :value="due_date.toString()"
                class="w-full"
              />
              <template #content>
                <NuxtCalendar
                  v-model="due_date"
                />
              </template>
            </NuxtPopover>
          </NuxtFormField>
          <NuxtFormField
            class="rounded-lg mt-5"
            label="Paid date"
            name="paid_date"
          >
            <NuxtPopover>
              <NuxtInput
                icon="i-material-symbols-calendar-month"
                size="xl"
                :value="paid_date ? paid_date.toString() : ''"
                class="w-full"
              />
              <template #content>
                <NuxtCalendar
                  v-model="paid_date"
                />
              </template>
            </NuxtPopover>
          </NuxtFormField>
        </div>
        <div class="form group grid md:grid-cols-2 gap-3 mt-5">
          <NuxtFormField
            class="rounded-lg mt-5"
            label="Payment Method"
            name="payment_method"
          >
            <NuxtInput
              v-model="state.payment_method"
              size="xl"
              class="w-full"
            />
          </NuxtFormField>
          <NuxtFormField
            class="rounded-lg mt-5"
            label="Payment Reference"
            name="payment_reference"
          >
            <NuxtInput
              v-model="state.payment_reference"
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
        <NuxtButton
          type="submit"
          color="primary"
          size="xl"
          class="mt-5 w-full flex items-center justify-center"
          :loading="status === 'pending'"
          :disabled="status === 'pending'"
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
                Delete Payment
              </h6>
              <p class="text-sm text-gray-500">
                Deleting a payment is permanent and cannot be undone. Please proceed with caution.
              </p>
            </div>
            <div>
              <NuxtModal>
                <NuxtButton
                  variant="solid"
                  color="error"
                >
                  Delete Payment
                </NuxtButton>
                <template #content>
                  <div class="p-5">
                    <p class="text-lg font-semibold">
                      Confirm deletion
                    </p>
                    <p class="text-sm">
                      Are you sure you want to delete this payment? This action cannot be undone.
                    </p>
                    <NuxtButton
                      class="w-fit float-end"
                      color="error"
                      variant="solid"
                      :loading="deleteStatus === 'pending'"
                      :disabled="deleteStatus === 'pending'"
                      @click="handleDeletePayment"
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
</template>

<script lang="ts" setup>
import type { InferedPaymentSchema } from '~~/shared/types/payment/paymentSchema'
import type { FormSubmitEvent } from '@nuxt/ui'
import { CalendarDate, type DateValue } from '@internationalized/date'
import { paymentSchema } from '~~/shared/types/payment/paymentSchema'
import countries from '~/assets/country/countries_with_all_data.json'

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth']
})

onMounted(() => {
  const dueDate = new Date(payment.value?.data?.due_date as string)
  due_date.value = new CalendarDate(
    dueDate.getFullYear(),
    dueDate.getMonth() + 1,
    dueDate.getDate()
  )

  const paidDate = new Date(payment.value?.data?.paid_date as string)
  if (payment.value?.data?.paid_date) {
    paid_date.value = new CalendarDate(
      paidDate.getFullYear(),
      paidDate.getMonth() + 1,
      paidDate.getDate()
    )
  }
})

// global state
const { $useCases } = useNuxtApp()
const route = useRoute()

// get payment detail
const { data: payment } = await useAsyncData(() =>
  $useCases.payment.getPaymentDetail.execute({
    payload: {
      id: route.params.paymentId as string
    }
  }))

// local state
const currencies: string[] = countries.map((country) => country.currencies!)
const due_date = shallowRef(new CalendarDate(2025, 1, 1))
const paid_date = shallowRef<DateValue | undefined>(undefined)
const state = reactive({
  ...payment.value?.data,
  due_date: due_date.value.toString(),
  paid_date: paid_date.value?.toString() || undefined,
  notes: ''
})

const { data: createdPayment, status, execute } = await useAsyncData(
  () => $useCases.payment.updatePayment.execute({
    payload: {
      ...state,
      due_date: due_date.value.toString(),
      paid_date: paid_date.value?.toString()
    }
  }), {
    immediate: false
  })

const { data: deleteData, status: deleteStatus, execute: executeDelete } = await useAsyncData(() =>
  $useCases.payment.deletePayment.execute({
    payload: {
      id: route.params.paymentId as string
    }
  }), {
  immediate: false
})

const handleUpdatePayment = async (event: FormSubmitEvent<InferedPaymentSchema>) => {
  event.preventDefault()

  await execute()
  if (createdPayment.value) {
    navigateTo(`/dashboard/bills/${state.bill_id}/payments`)
  }
}

const handleDeletePayment = async () => {
  await executeDelete()
  if (deleteData.value?.success) {
    navigateTo(`/dashboard/bills/${state.bill_id}/payments`)
  }
}
</script>
