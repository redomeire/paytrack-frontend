<template>
  <article class="p-4">
    <div class="flex justify-between gap-5 flex-wrap">
      <div>
        <h1 class="text-2xl font-bold">
          Payments
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
        @submit="handleCreatePayment"
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
import type { InferedPaymentSchema } from '~~/shared/types/payment/paymentSchema'
import { paymentSchema } from '~~/shared/types/payment/paymentSchema'
import { CalendarDate, type DateValue } from '@internationalized/date'
import type { FormSubmitEvent } from '@nuxt/ui'
import countries from '~/assets/country/countries_with_all_data.json'

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth']
})

// global state
const { $useCases } = useNuxtApp()
const route = useRoute()

// local state
const currencies: string[] = countries.map((country) => country.currencies!)
const due_date = shallowRef(new CalendarDate(2025, 1, 1))
const paid_date = shallowRef<DateValue | undefined>(undefined)
const state = reactive({
  bill_id: route.params.id as string,
  amount: 0,
  currency: 'IDR',
  due_date: due_date.value.toString(),
  paid_date: paid_date.value?.toString() || undefined,
  payment_method: undefined,
  payment_reference: undefined,
  notes: ''
})

const { data: payment, status, execute } = await useAsyncData(
  () => $useCases.payment.createPayment.execute({
    payload: {
      ...state,
      due_date: due_date.value.toString()
    }
  }), {
    immediate: false
  })

const handleCreatePayment = async (event: FormSubmitEvent<InferedPaymentSchema>) => {
  event.preventDefault()

  await execute()

  if (payment.value?.success) {
    navigateTo(`/dashboard/bills/${state.bill_id}/payments`)
  }
}
</script>
