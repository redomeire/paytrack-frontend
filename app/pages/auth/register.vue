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
        <NuxtStepper :items="items">
          <template #credentials>
            <NuxtFormField
              label="Email Address*"
              name="email"
              class="mb-3"
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
          </template>
          <template #info>
            <div class="grid md:grid-cols-2 gap-5">
              <NuxtFormField
                label="First name*"
                name="first_name"
                class="mb-3"
              >
                <NuxtInput
                v-model="state.first_name"
                variant="subtle"
                color="primary"
                size="xl"
                class="w-full"
                placeholder="John"
                />
              </NuxtFormField>
              <NuxtFormField
                label="Last name*"
                name="last_name"
                class="mb-3"
              >
                <NuxtInput
                v-model="state.last_name"
                variant="subtle"
                color="primary"
                size="xl"
                class="w-full"
                placeholder="Doe"
                />
              </NuxtFormField>
          </div>
          <NuxtFormField>
                <NuxtButtonGroup class="w-full" size="xl">
                  <NuxtInput
                    v-model="state.phone"
                    :ui="{
                      base: 'pl-16',
                      leading: 'pointer-events-none'
                    }"
                    class="w-full"
                  >
                    <template #leading>
                      <p class="text-sm text-muted">
                        ({{ country?.dial_code }})
                      </p>
                    </template>
                  </NuxtInput>
                  <NuxtSelectMenu
                    v-model="country"
                    :items="countriesMapped"
                    :ui="{ leading: 'pr-3' }"
                    variant="subtle"
                  >
                     <template #leading="{ modelValue, ui }">
                        <NuxtAvatar v-if="modelValue" :src="modelValue.image" size="sm" />
                        <UIcon v-else name="i-lucide-earth" :class="ui.leadingIcon()" />
                      </template>
                  </NuxtSelectMenu>
                </NuxtButtonGroup>
              </NuxtFormField>
          </template>
          <template #location>
            <div class="flex flex-col items-stretch">
              <NuxtButton
                type="submit"
                class="flex justify-center mt-3"
                size="xl"
                :loading="status === 'pending'"
                :disabled="status === 'pending'"
              >
                Submit
              </NuxtButton>
            </div>
          </template>
        </NuxtStepper>
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
        Already have an accound? <NuxtLink
          to="/auth/login"
          class="block w-fit"
        ><span class="font-semibold underline">Sign in</span></NuxtLink>
      </p>
    </div>
    <div class="h-screen relative">
      <div class="absolute inset-5 bg-[url('https://images.unsplash.com/photo-1630659509436-7397fbda30e2')] bg-cover bg-center rounded-2xl" />
    </div>
  </section>
</template>

<script setup lang="ts">
import * as v from 'valibot'
import type { FormSubmitEvent, StepperItem } from '@nuxt/ui'
import { NuxtSeparator } from '#components'
import countries from '~/assets/country/countries.json';

definePageMeta({
  layout: 'auth'
})

const items = [
  {
    slot: 'credentials' as const,
    title: 'Credentials',
    description: 'Configure your account credentials',
    icon: 'i-material-symbols-key-outline'
  }, {
    slot: 'info' as const,
    title: 'Personal Info',
    description: 'Provide your personal information',
    icon: 'i-material-symbols-info-outline'
  }, {
    slot: 'location' as const,
    title: 'Location',
    description: 'Adjust notification time accurately',
  }
] satisfies StepperItem[]

const schema = v.object({
  email: v.pipe(v.string(), v.email('Invalid email')),
  password: v.pipe(v.string(), v.minLength(8, 'Must be at least 8 characters')),
  first_name: v.pipe(v.string(), v.minLength(1, 'First name is required')),
  last_name: v.pipe(v.string(), v.minLength(1, 'Last name is required')),
  phone: v.pipe(v.string(), v.minLength(1, 'Phone number is required')),
  timezone: v.string(),
  currency: v.string(),
})

type Schema = v.InferOutput<typeof schema>

const state = reactive({
  email: '',
  password: '',
  first_name: '',
  last_name: '',
  phone: '',
  timezone: '',
  currency: '',
  is_password_visible: false,
  remember_me: false
})

const { $useCases } = useNuxtApp()

type Country = {
  name: string
  dial_code: string
  code: string
  region: string
  timezones: Record<string, string>
  iso: {
    'alpha-2': string
    'alpha-3': string
    numeric: string
  }
  phone: string[]
  emoji: string
  image: string
}

type Countries = Record<string, Country>

const countryDatas = countries as unknown as Countries

const countriesMapped = Object.values(countryDatas || {}).map(country => ({
  label: `${country.name ?? ''}`,
  code: country.code ?? '',
  emoji: country.emoji ?? '',
  dial_code: country.dial_code ?? '',
  region: country.region ?? '',
  timezone: country?.timezones ? Object.keys(country.timezones)[0] ?? '' : '',
  image: country?.image
}))

const country = ref(countriesMapped[0])

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
