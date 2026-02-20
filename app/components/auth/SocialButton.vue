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

const absoluteApiURL = useRuntimeConfig().public.absoluteAPIURL

async function handleRedirect() {
  const url = `${absoluteApiURL}/api/v1/auth/${props.provider}/redirect`
  await navigateTo(url, {
    external: true
  })
}
</script>
