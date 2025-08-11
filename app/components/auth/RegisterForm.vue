<template>
  <div>
    <NuxtForm
      ref="form"
      :schema="registerSchema"
      :state="state"
      class="flex flex-col gap-2"
      @submit="handleLogin"
      @error="onError"
    >
      <NuxtStepper
        ref="stepper"
        disabled
        :items="items"
      >
        <template #credentials>
          <NuxtFormField
            label="Email Address*"
            name="email"
            class="mb-3"
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
            label="Password*"
            name="password"
            class="mb-3"
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
            label="Password Confirm*"
            name="password"
            class="mb-3"
            rules
          >
            <NuxtInput
              v-model="state.password_confirm"
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
            <span
              v-if="state.password !== state.password_confirm"
              class="text-error text-sm mt-2 block"
            >
              Password confirmation do not match.
            </span>
          </NuxtFormField>
          <div class="flex flex-col items-stretch">
            <NuxtButton
              type="submit"
              class="flex justify-center mt-3"
              size="xl"
              :loading="status === 'pending'"
            >
              Submit
            </NuxtButton>
          </div>
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
                color="primary"
                size="xl"
                class="w-full"
                placeholder="Doe"
              />
            </NuxtFormField>
          </div>
          <NuxtFormField
            name="phone"
            required
            class="mt-3"
          >
            <NuxtButtonGroup
              class="w-full"
              size="xl"
            >
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
                :items="countryDatasMapped"
                :ui="{ leading: 'pr-3' }"
              >
                <template #leading="{ modelValue, ui }">
                  <NuxtAvatar
                    v-if="modelValue"
                    :src="modelValue.flags.svg"
                    size="sm"
                  />
                  <NuxtIcon
                    v-else
                    name="i-lucide-earth"
                    :class="ui.leadingIcon()"
                  />
                </template>
              </NuxtSelectMenu>
            </NuxtButtonGroup>
          </NuxtFormField>
        </template>
      </NuxtStepper>
    </NuxtForm>
    <div class="w-full mt-3">
      <NuxtButton
        v-if="stepper?.hasPrev"
        size="xl"
        icon="i-tabler-arrow-back-up"
        color="secondary"
        variant="outline"
        class="order-first w-full flex justify-center"
        @click="stepper?.prev()"
      >
        Prev
      </NuxtButton>
      <NuxtButton
        v-if="stepper?.hasNext"
        size="xl"
        trailing-icon="i-tabler-arrow-forward-up"
        color="secondary"
        variant="outline"
        class="order-last w-full flex justify-center mt-5"
        @click="stepper?.next()"
      >
        Next
      </NuxtButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RegisterSchema } from '~~/shared/types/auth/registerSchema'
import type { Country } from '~~/shared/types/country/country'
import type { FormSubmitEvent, StepperItem } from '@nuxt/ui'
import { registerSchema } from '~~/shared/types/auth/registerSchema'
import countries_with_all_datas from '~/assets/country/countries_with_all_data.json'

const { $useCases } = useNuxtApp()
const toast = useToast()
const form = useTemplateRef('form')
const stepper = useTemplateRef('stepper')

// lifecycle
onMounted(() => {
  state.currency = country.value?.currencies as string
  state.timezone = country.value?.timezone as string
})

// local state
const state = reactive({
  email: '',
  password: '',
  password_confirm: '',
  first_name: '',
  last_name: '',
  phone: '',
  timezone: '',
  currency: '',
  is_password_visible: false,
  remember_me: false
})

// stepper
const items = [
  {
    slot: 'info' as const,
    title: 'Personal Info',
    description: 'Provide your information',
    icon: 'i-material-symbols-info-outline'
  },
  {
    slot: 'credentials' as const,
    title: 'Credentials',
    description: 'Configure your credentials',
    icon: 'i-material-symbols-key-outline'
  }
] satisfies StepperItem[]

// country
const countryDatas = countries_with_all_datas as Country[]
const countryDatasMapped = countryDatas.map((country) => ({
  value: country.code,
  label: country.name,
  flags: country.flags,
  dial_code: country.dial_code,
  currencies: country.currencies,
  timezone: country.timezone
}))
const country = ref(countryDatasMapped[176])
watch(country, (newState, oldState) => {
  if (newState !== oldState && newState) {
    state.currency = newState.currencies
    state.timezone = newState.timezone
  }
})
watch(
  () => state.phone,
  (newState) => {
    if (newState && newState.length > 0) {
      state.phone = newState.replace(country.value?.dial_code || '', '')
    }
  }
)

// data fetching and functions
const { data: registeredData, execute, status } = await useAsyncData('register',
  async () => await $useCases.auth.register.execute({
    payload: {
      email: state.email,
      password: state.password,
      first_name: state.first_name,
      last_name: state.last_name,
      phone: `${country.value?.dial_code}${state.phone}`,
      password_confirmation: state.password_confirm
    }
  }), {
    immediate: false
  })

async function handleLogin(event: FormSubmitEvent<RegisterSchema>) {
  event.preventDefault()
  await execute()

  if (registeredData.value?.success) {
    form.value?.clear()

    setTimeout(() => {
      navigateTo('/auth/login')
    }, 1000)
  }
}

async function onError() {
  if (form.value?.errors.length && form.value.errors.length > 0) {
    toast.add({
      title: 'Cannot submit form',
      description: form.value.errors.map((error) => error.message)
        .join(', ')
        .replaceAll('_', ' '),
      color: 'error'
    })
    return
  }
}
</script>
