<template>
  <NuxtForm
    :schema="resetPasswordSchema"
    :state="state"
    class="flex flex-col gap-2"
    @submit="handleResetPassword"
  >
    <NuxtFormField
      label="New Password"
      name="password"
      required
    >
      <NuxtInput
        v-model="state.password"
        color="primary"
        size="xl"
        :type="state.is_password_visible ? 'text' : 'password'"
        class="w-full"
        placeholder="Password"
        icon="i-material-symbols-lock-outline"
      >
        <template #trailing>
          <NuxtButton
            color="neutral"
            variant="link"
            size="sm"
            :icon="state.is_password_visible ?'i-material-symbols-visibility-off-outline' : 'i-material-symbols-visibility-outline'"
            aria-label="Clear input"
            @click="state.is_password_visible = !state.is_password_visible"
          />
        </template>
      </NuxtInput>
    </NuxtFormField>
    <NuxtFormField
      label="Confirm Password"
      name="password_confirm"
      required
    >
      <NuxtInput
        v-model="state.password_confirm"
        color="primary"
        size="xl"
        :type="state.is_password_visible ? 'text' : 'password'"
        class="w-full"
        placeholder="Confirm password"
        icon="i-material-symbols-lock-outline"
      >
        <template #trailing>
          <NuxtButton
            color="neutral"
            variant="link"
            size="sm"
            :icon="state.is_password_visible ?'i-material-symbols-visibility-off-outline' : 'i-material-symbols-visibility-outline'"
            aria-label="Clear input"
            @click="state.is_password_visible = !state.is_password_visible"
          />
        </template>
      </NuxtInput>
      <span
        v-if="state.password !== state.password_confirm"
        class="text-error text-sm mt-2 block"
      >
        Password confirmation do not match.
      </span>
    </NuxtFormField>
    <NuxtButton
      type="submit"
      class="flex justify-center"
      size="xl"
      :loading="status === 'pending'"
      :disabled="status === 'pending'"
    >
      Submit
    </NuxtButton>
  </NuxtForm>
</template>

<script lang="ts" setup>
import type { FormSubmitEvent } from '@nuxt/ui'
import type { _RouteLocationBase } from 'vue-router'
import type { InferedResetPasswordSchema } from '~~/shared/types/auth/resetPasswordSchema'
import { resetPasswordSchema } from '~~/shared/types/auth/resetPasswordSchema'

const { $useCases } = useNuxtApp()

// state from query params
const route = useRoute()
const token = route.query.token as string | undefined
const email = route.query.email as string | undefined
if (!token || !email) {
  throw new Error('Error accessing page')
}

// local state
const state = reactive({
  password: '',
  password_confirm: '',
  is_password_visible: false
})

const { status, execute } = useAsyncData('resetPassword', async () =>
  await $useCases.auth.resetPassword.execute({
    payload: {
      email,
      token,
      password: state.password,
      password_confirmation: state.password_confirm
    }
  }), {
  immediate: false
})

async function handleResetPassword(
  event: FormSubmitEvent<InferedResetPasswordSchema>
) {
  event.preventDefault()

  await execute()

  if (status.value === 'success') {
    setTimeout(() => {
      navigateTo('/auth/login')
    }, 1000)
  }
}
</script>
