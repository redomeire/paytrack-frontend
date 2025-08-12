<template>
  <NuxtForm
    :schema="loginSchema"
    :state="state"
    class="flex flex-col gap-2"
    @submit="handleLogin"
  >
    <NuxtFormField
      label="Email Address"
      name="email"
      required
    >
      <NuxtInput
        v-model="state.email"
        color="primary"
        size="xl"
        class="w-full"
        placeholder="Email"
        icon="i-material-symbols-mail-outline"
      />
    </NuxtFormField>
    <NuxtFormField
      label="Password"
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
    <div class="my-5 flex items-center justify-between">
      <div>
        <NuxtCheckbox
          v-model="state.remember_me"
          name="remember_me"
          label="Keep   me logged in"
          class="text-secondary"
        />
      </div>
      <NuxtLink
        to="/auth/forgot-password"
        class="block w-fit text-sm hover:underline text-secondary underline"
      >Forgot
        Password?
      </NuxtLink>
    </div>
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

<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import type { InferedLoginSchema } from '~~/shared/types/auth/loginSchema'
import { loginSchema } from '~~/shared/types/auth/loginSchema'

const { $useCases } = useNuxtApp()

// local state
const state = reactive({
  email: '',
  password: '',
  is_password_visible: false,
  remember_me: false
})

// data fetching and functions
const { execute, status } = await useAsyncData('login',
  async () => await $useCases.auth.login.execute({
    payload: {
      email: state.email,
      password: state.password
    }
  }), {
    immediate: false
  })

async function handleLogin(event: FormSubmitEvent<InferedLoginSchema>) {
  event.preventDefault()
  console.log('user state: ', state)

  await execute()
}
</script>
