<template>
  <NuxtButton
    color="neutral"
    variant="subtle"
    class="flex justify-center"
    size="xl"
    :icon="`i-logos-${provider}-icon`"
    @click="handleRedirect"
  >
    Continue with {{ capitalizeFirstLetter(provider) }}
  </NuxtButton>
</template>

<script lang="ts" setup>
const props = defineProps<{
  provider: 'google' | 'github'
}>()

const config = useRuntimeConfig()
const apiUrl = config.public.apiBase

async function handleRedirect() {
  const url = `${apiUrl}/auth/${props.provider}/redirect`
  await navigateTo(url, {
    external: true
  })
}
</script>
