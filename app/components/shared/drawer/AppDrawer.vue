<template>
  <NuxtDrawer
    v-model:open="drawerOpen"
    direction="left"
  >
    <NuxtButton
      icon="i-icon-park-outline-hamburger-button"
      variant="subtle"
      class="lg:hidden w-10 grid place-items-center"
      @click="drawerOpen = true"
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
                v-if="!item.isCollapsible"
                :to="item.route"
                class="flex items-center gap-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <NuxtButton
                  :icon="item.icon"
                  class="w-full px-4 py-3 rounded-2xl hover:text-primary transition-colors"
                  :variant="item.route === $route.path ? 'solid' : 'ghost'"
                  :color="item.route === $route.path ? 'primary' : 'neutral'"
                  @click="drawerOpen = false"
                >
                  {{ item.title }}
                </NuxtButton>
              </NuxtLink>
              <NuxtCollapsible v-else>
                <NuxtButton
                  :icon="item.icon"
                  class="w-full px-4 py-3 rounded-2xl hover:text-primary transition-colors"
                  :variant="item.route.includes($route.path) ? 'solid' : 'ghost'"
                  :color="item.route.includes($route.path) ? 'primary' : 'neutral'"
                >
                  {{ item.title }}
                  <template #trailing>
                    <NuxtIcon
                      name="i-lucide-chevron-down"
                      class="absolute right-10"
                    />
                  </template>
                </NuxtButton>
                <template #content>
                  <ul>
                    <li
                      v-for="child in item.child"
                      :key="child.route"
                      class="pl-2"
                    >
                      <NuxtLink
                        :to="child.route"
                        class="flex items-center gap-2 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <NuxtButton
                          :icon="child.icon"
                          class="w-full px-4 py-3 rounded-2xl hover:text-primary transition-colors"
                          :variant="child.route === $route.path ? 'solid' : 'ghost'"
                          :color="child.route === $route.path ? 'primary' : 'neutral'"
                          @click="drawerOpen = false"
                        >
                          {{ child.title }}
                        </NuxtButton>
                      </NuxtLink>
                    </li>
                  </ul>
                </template>
              </NuxtCollapsible>
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
const { $useCases } = useNuxtApp()
const { clear } = useUserSession()
const router = useRouter()
const drawerOpen = ref(false)

const navItems = [
  {
    title: 'Home',
    icon: 'i-material-symbols-dashboard',
    route: '/dashboard',
    isCollapsible: false
  },
  {
    title: 'Tagihan',
    icon: 'i-material-symbols-receipt-long-outline',
    route: '/dashboard/bills',
    isCollapsible: false
  },
  {
    title: 'Riwayat',
    icon: 'i-material-symbols-history',
    route: '/dashboard/bills/history',
    isCollapsible: false
  },
  {
    title: 'Pengaturan',
    icon: 'i-material-symbols-settings-outline',
    route: '/settings',
    isCollapsible: true,
    child: [
      {
        title: 'Change Password',
        icon: 'i-material-symbols-lock-outline',
        route: '/dashboard/change-password',
        isCollapsible: false
      }
    ]
  },
  {
    title: 'Bantuan',
    icon: 'i-material-symbols-info-outline',
    route: '/settings',
    isCollapsible: false
  }
]

const handleLogout = async () => {
  Promise.all([
    $useCases.auth.logout.execute()
  ]).catch((error) => {
    console.error('Error during logout:', error)
  }).finally(() => {
    clear()
    setTimeout(() => {
      router.replace('/auth/login')
    }, 1000)
  })
}
</script>
