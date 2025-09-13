<template>
  <article class="p-4">
    <div class="flex justify-between gap-5 flex-wrap">
      <div>
        <h1 class="text-2xl font-bold">
          Tambah Channel Penerima
        </h1>
        <p class="text-gray-600">
          Kelola daftar Channel bank atau e-wallet penerima dana
        </p>
      </div>
    </div>
    <div class="mt-6">
      <NuxtForm
        :schema="recipientAccountsSchema"
        :state="state"
        class="space-y-6"
        @submit="handleCreateRecipientAccount"
      >
        <NuxtFormField
          label="Nama Panggilan"
          name="nickname"
          required
        >
          <NuxtInput
            v-model="state.name"
            color="primary"
            size="xl"
            class="w-full"
            placeholder="Contoh: John Doe"
          />
        </NuxtFormField>
        <NuxtFormField
          label="Tipe Channel"
          name="type"
          required
        >
          <NuxtSelect
            v-model="state.type"
            :items="accountTypeOptions"
            class="flex gap-4 min-w-[200px]"
            size="xl"
          />
        </NuxtFormField>
        <div
          v-if="state.type"
          class="space-y-4"
        >
          <h3 class="text-lg font-semibold text-gray-800">
            Detail Akun
          </h3>
          <NuxtFormField
            label="Pilih Akun"
            name="bank_id"
            required
          >
            <NuxtSelectMenu
              v-model="bankOption"
              :items="bankOptions.channel"
              placeholder="Pilih Akun"
              size="xl"
              class="w-1/2"
            />
          </NuxtFormField>
          <NuxtFormField
            label="Nomor Channel"
            name="account_number"
            description="Untuk rekening bank, masukkan nomor rekening tanpa spasi atau karakter khusus. Untuk e-wallet, masukkan nomor ponsel yang terdaftar."
            required
          >
            <NuxtInput
              v-model="state.account_number"
              color="primary"
              size="xl"
              class="w-1/3"
              placeholder="Masukkan nomor rekening"
            />
          </NuxtFormField>
          <NuxtFormField name="verify_account_name">
            <NuxtCheckbox
              v-model="state.verify_account_name"
              label="Sesuai nama di akun tujuan"
            />
          </NuxtFormField>
        </div>
        <NuxtFormField
          name="default"
        >
          <NuxtCheckbox
            v-model="state.default"
            label="Jadikan Rekening Utama"
          >
            Jadikan Rekening Utama
          </NuxtCheckbox>
        </NuxtFormField>
        <div class="flex gap-3 pt-4">
          <NuxtButton
            type="submit"
            color="primary"
            size="xl"
            class="w-fit"
            :loading="status === 'pending'"
            :disabled="status === 'pending'"
          >
            Simpan Channel
          </NuxtButton>
        </div>
      </NuxtForm>
    </div>
  </article>
</template>

<script lang="ts" setup>
import type { FormSubmitEvent } from '@nuxt/ui'
import type { InferedRecipientAccountsSchema } from '~~/shared/types/recipient-account/recipientAccountSchema'
import { recipientAccountsSchema } from '~~/shared/types/recipient-account/recipientAccountSchema'

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth']
})

const route = useRoute()
const router = useRouter()
const { $useCases } = useNuxtApp()

const bankOptions = usePaymentChannelCode()
const bankOption = ref({ label: '', value: '' })

const state = reactive({
  name: route.query.name as string || '',
  type: 'BANK_ACCOUNT' as const,
  account_number: '',
  verify_account_name: false,
  bank_id: bankOption.value.value,
  default: false
})

const accountTypeOptions = [
  {
    value: 'BANK_ACCOUNT',
    label: 'Bank Account',
    icon: 'i-heroicons-building-library'
  },
  {
    value: 'EWALLET',
    label: 'E-wallet',
    icon: 'i-heroicons-wallet'
  }
]

const { status, execute } = await useAsyncData(
  () => $useCases.bill.createRecipientAccount
    .execute({
      payload: {
        ...state,
        details: JSON.stringify({
          account_id: bankOption.value.value,
          account_name: bankOption.value.label,
          account_number: state.account_number
        })
      }
    }), {
    immediate: false
  })

const handleCreateRecipientAccount
  = async (event: FormSubmitEvent<InferedRecipientAccountsSchema>) => {
    event.preventDefault()
    await execute()

    if (status.value === 'success') {
      router.back()
    }
  }
</script>
