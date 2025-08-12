<template>
  <div>
    <NuxtForm
      :schema="forgotPasswordSchema"
      :state="state"
      class="flex flex-col gap-2"
      @submit="handleForgotPassword"
    >
      <NuxtFormField
        label="Email Address*"
        name="email"
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
      <span
        v-if="timerCountSeconds > 0 && timerCountSeconds !== 30"
      >
        {{ timerDisplayer }}
      </span>
      <NuxtButton
        type="submit"
        class="flex justify-center mt-3"
        size="xl"
        :variant="startCountdownTimer ? 'outline' : 'solid'"
        :loading="status === 'pending'"
        :disabled="status === 'pending' || startCountdownTimer"
      >
        Submit
      </NuxtButton>
    </NuxtForm>
  </div>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import type { InferedForgotPasswordSchema } from '~~/shared/types/auth/forgotPasswordSchema'
import { forgotPasswordSchema } from '~~/shared/types/auth/forgotPasswordSchema'

const { $useCases } = useNuxtApp()

// local state
const state = reactive({
  email: ''
})
const startCountdownTimer = ref(false)
const timerCountSeconds = ref(30)
const timerDisplayer = computed(() => {
  const minutes = Math.floor(timerCountSeconds.value / 60)
  const seconds = timerCountSeconds.value % 60
  const formattedMinutes = minutes.toString().padStart(2, '0')
  const formattedSeconds = seconds.toString().padStart(2, '0')
  return `${formattedMinutes}:${formattedSeconds}`
})

watch([startCountdownTimer, timerCountSeconds], ([newX, newY]) => {
  if (!newX) {
    timerCountSeconds.value = 30
  }
  else if (newX && newY <= 0) {
    startCountdownTimer.value = false
    timerCountSeconds.value = 30
  }
  else if (newX && newY > 0) {
    setTimeout(() => {
      timerCountSeconds.value--
    }, 1000)
  }
})

// data fetching and functions
const { status, execute } = useAsyncData('forgotPassword',
  async () => await $useCases.auth.forgotPassword.execute({
    payload: {
      email: state.email
    }
  }), {
    immediate: false
  })

async function handleForgotPassword(
  event: FormSubmitEvent<InferedForgotPasswordSchema>
) {
  event.preventDefault()
  await execute()
  if (status.value === 'success') {
    startCountdownTimer.value = true
  }
}
</script>
