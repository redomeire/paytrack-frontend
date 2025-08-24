<template>
  <header class="main__header">
    <div>
      <NuxtLink
        to="/"
        class="flex items-center gap-2 w-fit"
      >
        <NuxtAvatar
          alt="Paytrack"
          size="xl"
          :ui="{
            root: 'bg-primary',
            fallback: 'text-white'
          }"
        />
        <h2 class="text-primary text-heading-5 font-semibold">
          PayTrack
        </h2>
      </NuxtLink>
    </div>
    <nav>
      <ul class="flex items-center gap-10">
        <li
          v-for="data in navbarDatas"
          :key="data.title"
        >
          <NuxtLink :to="data.link">
            <span class="text-body-lg font-semibold">
              {{ data.title }}
            </span>
          </NuxtLink>
        </li>
      </ul>
    </nav>
    <div class="button-group flex items-center gap-2">
      <NuxtLink to="/auth/login">
        <NuxtButton
          size="xl"
          class="min-w-[100px] grid place-items-center rounded-2xl"
        >
          <span class="text-body-lg">
            Get Started
          </span>
        </NuxtButton>
      </NuxtLink>
    </div>
  </header>
</template>

<script lang="ts" setup>
const navbarDatas = [
  {
    title: 'Features',
    link: '#features'
  },
  {
    title: 'Pricing',
    link: '#pricing'
  },
  {
    title: 'Contact',
    link: '#contact'
  },
  {
    title: 'FAQ',
    link: '#faq'
  }
]
</script>

<style lang="css" scoped>
@reference '~/assets/css/main.css';

.main__header {
  @apply p-3 px-10 mx-28 mt-10 rounded-full bg-accented;
  @apply border border-transparent hover:border-primary hover:shadow-xl dark:shadow-neutral-600 shadow-primary-100 transition;
  @apply flex items-center justify-between;
}
</style>
