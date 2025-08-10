<template>
  <section class="grid md:grid-cols-2 items-center">
    <div class="flex flex-col items-stretch justify-between font-sans p-10">
      <h1 class="text-h5 mb-2">
        Login to your account
      </h1>
      <p class="text-body-sm mb-5">
        Welcome back, please enter your detail
      </p>
      <NuxtForm
        :schema="schema"
        :state="state"
        class="flex flex-col gap-2"
        @submit="handleLogin"
      >
        <NuxtFormField
          label="Email Address*"
          name="email"
        >
          <NuxtInput
            v-model="state.email"
            variant="subtle"
            color="primary"
            size="xl"
            class="w-full"
            placeholder="Email"
            icon="i-material-symbols-mail-outline"
          />
        </NuxtFormField>
        <NuxtFormField
          label="Password*"
          name="password"
        >
          <NuxtInput
            v-model="state.password"
            variant="subtle"
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
      <NuxtSeparator class="my-5" />
      <div class="grid md:grid-cols-2 gap-3">
        <NuxtButton
          color="neutral"
          variant="subtle"
          class="flex justify-center"
          size="xl"
          icon="i-logos-google-icon"
        >
          Continue with Google
        </NuxtButton>
        <NuxtButton
          color="neutral"
          variant="subtle"
          class="flex justify-center"
          size="xl"
          icon="i-logos-github-icon"
        >
          Continue with Github
        </NuxtButton>
      </div>

      <p class="text-sm text-center flex items-center justify-center gap-2 mt-8">
        Not registered yet? <NuxtLink
          to="/auth/register"
          class="block w-fit"
        ><span class="font-semibold underline">Create an accounts</span></NuxtLink>
      </p>
    </div>
    <div class="h-screen relative">
      <div class="absolute inset-5 bg-[url('https://images.unsplash.com/photo-1630659509436-7397fbda30e2')] bg-cover bg-center rounded-2xl" />
    </div>
  </section>
</template>

<script setup lang="ts">
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'
import { NuxtCheckbox, NuxtSeparator } from '#components'

definePageMeta({
  layout: 'auth'
})

const schema = v.object({
  email: v.pipe(v.string(), v.email('Invalid email')),
  password: v.pipe(v.string(), v.minLength(8, 'Must be at least 8 characters'))
})

type Schema = v.InferOutput<typeof schema>

const state = reactive({
  email: '',
  password: '',
  is_password_visible: false,
  remember_me: false
})

const { $useCases } = useNuxtApp()

const { execute, status } = await useAsyncData('login',
  async () => await $useCases.auth.login.execute({
    payload: {
      email: state.email,
      password: state.password
    }
  }), {
    immediate: false
  })

async function handleLogin(event: FormSubmitEvent<Schema>) {
  event.preventDefault()
  console.log('user state: ', state)

  await execute()
}
</script>
