<template>
  <div>
    <SharedSidebarDashboardSidebar />
    <div class="lg:ml-64">
      <SharedNavbarDashboardNavbar />
      <main class="px-5 py-7 pt-28">
        <div v-if="!data?.user?.is_verified">
          <div
            class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong class="font-bold">Warning!</strong>
            <span class="block sm:inline">Your account is not verified. Please check your email to verify your account.</span>
          </div>
        </div>
        <slot v-else />
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { IUser } from '~~/lib/domain/entity/user'

const { data } = await useFetch<{ user: IUser }>('/api/auth/get-session', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})
</script>
