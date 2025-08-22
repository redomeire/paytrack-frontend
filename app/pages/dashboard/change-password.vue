<template>
  <div class="dashboard p-4">
    <div>
      <h1 class="text-2xl font-bold">
        Change Password
      </h1>
      <p>
        Update your password to keep your account secure.
      </p>
    </div>
    <NuxtForm
      class="mt-10 space-y-5"
      :state="state"
      :schema="changePasswordSchema"
      @submit="handleSubmit"
    >
      <NuxtFormField
        name="password"
        label="Password"
        required
      >
        <NuxtInput
          v-model="state.password"
          type="password"
          placeholder="Enter your new password"
          class="md:w-1/2 w-full"
          size="xl"
          icon="i-lucide-lock"
        />
      </NuxtFormField>
      <NuxtFormField
        name="password_confirm"
        label="Confirm Password"
        required
      >
        <NuxtInput
          v-model="state.password_confirm"
          type="password"
          placeholder="Enter your password again"
          class="md:w-1/2 w-full"
          size="xl"
          icon="i-lucide-lock"
        />
      </NuxtFormField>
      <div>
        <NuxtButton
          type="submit"
          variant="solid"
          color="primary"
          class="w-fit"
          size="xl"
          :loading="status === 'pending'"
        >
          Update Password
        </NuxtButton>
        <NuxtButton
          type="button"
          variant="outline"
          color="error"
          class="w-fit ml-2"
          size="xl"
          @click="$router.back()"
        >
          Cancel
        </NuxtButton>
      </div>
    </NuxtForm>
  </div>
</template>

<script lang="ts" setup>
import type { FormSubmitEvent } from '@nuxt/ui'
import { changePasswordSchema } from '~~/shared/types/auth/changePasswordSchema'
import type { InferedChangePasswordSchema } from '~~/shared/types/auth/changePasswordSchema'

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth']
})

const { $useCases } = useNuxtApp()
const router = useRouter()
const state = reactive({
  password: '',
  password_confirm: ''
})

const { data, execute, status } = await useAsyncData(() => $useCases.auth.changePassword.execute({
  payload: {
    password: state.password,
    password_confirmation: state.password_confirm
  }
}), {
  immediate: false,
  server: false
})

const handleSubmit = async (event: FormSubmitEvent<InferedChangePasswordSchema>) => {
  event.preventDefault()
  await execute()

  if (data.value?.success) {
    router.back()
  }
}
</script>
