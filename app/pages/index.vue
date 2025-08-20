<template>
  <article>
    <section
      id="hero"
      class="pt-44 grid place-items-center"
    >
      <div class="space-y-5">
        <div class="flex items-center gap-2 w-fit mx-auto">
          <NuxtAvatarGroup size="xl">
            <NuxtAvatar
              src="https://github.com/benjamincanac.png"
              alt="Benjamin Canac"
            />
            <NuxtAvatar
              src="https://github.com/romhml.png"
              alt="Romain Hamel"
            />
            <NuxtAvatar
              src="https://github.com/noook.png"
              alt="Neil Richter"
            />
          </NuxtAvatarGroup>
          <NuxtAvatar
            size="xl"
            :ui="{ root: 'bg-primary', fallback: 'text-white' }"
          >
            <template #default>
              <span class="block text-white text-sm">
                2k+
              </span>
            </template>
          </NuxtAvatar>
          <span>
            Businesses Rely on <strong>Paytrack</strong>
          </span>
        </div>
        <h1 class="text-6xl leading-16 font-semibold text-center">
          Unified  Platform for Late <br> Stage Payments | Paytrack
        </h1>
        <p class="text-center">
          Paytrack is a comprehensive platform designed to streamline late-stage payments, <br> ensuring efficiency and reliability for businesses of all sizes.
        </p>
        <div class="flex gap-3 w-fit mx-auto">
          <NuxtButton
            size="xl"
            variant="outline"
            class="min-w-[150px] grid place-items-center"
          >
            <NuxtLink to="/auth/login">
              <span class="text-body-lg">
                Demo <span class="text-primary">→</span>
              </span>
            </NuxtLink>
          </NuxtButton>
          <NuxtButton
            size="xl"
            class="min-w-[150px] grid place-items-center"
          >
            <NuxtLink to="/auth/login">
              <span class="text-body-lg">
                Sign In
              </span>
            </NuxtLink>
          </NuxtButton>
        </div>
        <NuxtSeparator class="mt-10">
          <template #default>
            <span class="text-muted text-sm">
              Join <strong>4000+</strong> Companies Using Paytrack
            </span>
          </template>
        </NuxtSeparator>
        <div class="w-fit mx-auto space-x-3 space-y-3">
          <NuxtButton
            v-for="partner in partners"
            :key="partner"
            variant="outline"
            color="neutral"
            icon="i-heroicons-globe-alt-solid"
          >
            <NuxtLink to="https://www.google.com">
              <span class="text-body-lg">
                {{ partner }}
              </span>
            </NuxtLink>
          </NuxtButton>
        </div>
      </div>
    </section>
    <section id="feature">
      <div class="container mx-auto py-20">
        <h6 class="section__label text-center">
          Features
        </h6>
        <h2 class="text-4xl font-semibold text-center mb-10">
          Powerful Features to Enhance Your <br> Payment Experience
        </h2>
      </div>
      <NuxtTabs
        variant="link"
        :items="features"
      >
        <template #accelerate>
          <NuxtContainer>
            <Placeholder />
          </NuxtContainer>
        </template>
        <template #streamline>
          <div class="space-y-5">
            <h3 class="text-2xl font-semibold">
              Streamline Payment Processes
            </h3>
            <p class="text-body-lg">
              Simplify your payment workflows with Paytrack's intuitive interface and powerful tools.
            </p>
          </div>
        </template>
      </NuxtTabs>
    </section>
  </article>
</template>

<script lang="ts" setup>
import { NuxtContainer } from '#components'
import type { TabsItem } from '@nuxt/ui'

useSeoMeta({
  title: 'Paytrack'
})
const partners = ['Google', 'Microsoft', 'Amazon', 'Apple', 'Facebook']

const features = ref<TabsItem[]>([
  {
    label: 'Accelerate Business Growth',
    slot: 'accelerate' as const
  },
  {
    label: 'Streamline Payment Processes',
    slot: 'streamline' as const
  }
])
</script>

<style scoped>
@reference '~/assets/css/main.css';

.section__label {
  @apply text-primary text-base font-semibold;
}
</style>
