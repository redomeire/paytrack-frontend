<template>
  <NuxtDrawer
    v-if="!isDesktop"
    direction="left"
  >
    <NuxtButton
      icon="i-icon-park-outline-hamburger-button"
      variant="subtle"
      class="lg:hidden w-10 grid place-items-center"
    />

    <template #content>
      <div class="grid grid-rows-12 w-96 p-5">
        <div class="flex items-center gap-2">
          <NuxtButton
            icon="i-material-symbols-mail-outline"
            class="rounded-lg p-2"
          />
          <div>
            <h1 class="text-h5">
              Paytrack
            </h1>
            <p class="text-sm text-gray-500">
              Billing Solutions
            </p>
          </div>
        </div>
        <nav class="mt-10 row-span-9">
          <ul class="flex flex-col gap-3">
            <li
              v-for="item in navItems"
              :key="item.route"
            >
              <NuxtLink
                :to="item.route"
                class="flex items-center gap-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <NuxtButton
                  :icon="item.icon"
                  class="w-full px-4 py-3 rounded-2xl hover:text-primary transition-colors"
                  :variant="item.route === $route.path ? 'solid' : 'ghost'"
                  :color="item.route === $route.path ? 'primary' : 'neutral'"
                >
                  {{ item.title }}
                </NuxtButton>
              </NuxtLink>
            </li>
          </ul>
        </nav>
        <div class="">
          <NuxtButton
            icon="i-material-symbols-logout"
            variant="ghost"
            class="p-4 w-full"
            @click="handleLogout"
          >
            Logout
          </NuxtButton>
        </div>
      </div>
    </template>
  </NuxtDrawer>
</template>

<script lang="ts" setup>
import { useMediaQuery } from '@vueuse/core'

const { $useCases } = useNuxtApp()
const { clear } = useUserSession()
const router = useRouter()
const isDesktop = useMediaQuery('(min-width: 1024px)')

const navItems = [
  {
    title: 'Home',
    icon: 'i-material-symbols-dashboard',
    route: '/dashboard'
  },
  {
    title: 'Tagihan',
    icon: 'i-material-symbols-receipt-long-outline',
    route: '/invoices'
  },
  {
    title: 'Klien',
    icon: 'i-material-symbols-settings-outline',
    route: '/payments'
  },
  {
    title: 'Pengaturan',
    icon: 'i-material-symbols-settings-outline',
    route: '/settings'
  },
  {
    title: 'Bantuan',
    icon: 'i-material-symbols-info-outline',
    route: '/settings'
  }
]

const handleLogout = async () => {
  Promise.all([
    $useCases.auth.logout.execute(),
    clear()
  ]).catch((error) => {
    console.error('Error during logout:', error)
  }).finally(() => {
    setTimeout(() => {
      router.replace('/auth/login')
    }, 1000)
  })
}
</script>
