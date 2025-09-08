<template>
  <header class="bg-default border-b border-b-accented items-center p-5 fixed top-0 right-0 lg:left-64 left-0 z-30">
    <div class="lg:grid lg:grid-cols-5 flex justify-between lg:gap-10 gap-2 relative">
      <div class="flex items-center lg:col-span-2">
        <SharedDrawerAppDrawer />
        <NuxtInput
          icon="i-lucide-search"
          size="xl"
          variant="ghost"
          placeholder="Search..."
          class="lg:mr-0 mr-20 w-full"
        />
      </div>
      <NuxtChip
        class="lg:hidden"
        size="lg"
        :show="notificationReadStatuses.unread > 0"
      >
        <NuxtPopover
          :content="{
            align: 'end',
            side: 'bottom',
            sideOffset: 16
          }"
        >
          <NuxtButton
            icon="i-lucide-bell"
            variant="outline"
            color="neutral"
          />
          <template #content>
            <div class="min-w-96">
              <div class="flex items-center justify-between p-3">
                <h4 class="text-body-lg font-semibold">
                  Notifikasi
                </h4>
                <NuxtButton
                  v-if="notificationReadStatuses.unread > 0"
                  variant="subtle"
                  class="text-xs"
                  :loading="readAllStatus === 'pending'"
                  :disabled="readAllStatus === 'pending'"
                  @click="handleReadAllNotifications"
                >
                  Mark as read
                </NuxtButton>
              </div>
              <NuxtSeparator />
              <ul
                v-if="status === 'pending'"
                class="grid gap-2 p-3"
              >
                <NuxtSkeleton class="h-4 w-full" />
                <NuxtSkeleton class="h-4 w-[100px] mt-2" />
              </ul>
              <div v-else-if="status === 'success'">
                <ul
                  v-if="notifications?.data && notifications.data.length > 0"
                  class="max-h-[500px] overflow-y-auto"
                >
                  <li
                    v-for="notification of notifications.data"
                    :key="notification.id"
                    :class="`${!notification.is_read ? 'hover:bg-elevated' : 'bg-elevated hover:bg-accented'} transition p-3`"
                    @click="() => handleClickNotification(notification.read_id, notification.is_read)"
                  >
                    <p class="text-body-sm">
                      {{ notification.message }}
                    </p>
                    <span class="text-xs text-neutral-500">
                      {{ dateTimeFormat({ date: notification.created_at }) }}
                    </span>
                  </li>
                </ul>
                <div
                  v-else
                  class="flex flex-col items-center justify-center p-5"
                >
                  <p class="text-body-sm text-center">
                    No new notifications
                  </p>
                </div>
              </div>
              <ul v-else-if="status === 'error'">
                <li class="p-3">
                  <NuxtAlert
                    color="error"
                    variant="soft"
                    title="Failed to load notifications."
                  />
                </li>
              </ul>
            </div>
          </template>
        </NuxtPopover>
      </NuxtChip>
      <div class="items-center justify-end gap-5 lg:flex hidden lg:col-span-3">
        <NuxtButton
          icon="i-material-symbols-light-sticky-note-2-outline"
          variant="outline"
          color="neutral"
        >
          <p class="text-body-sm">
            Instant Report
          </p>
        </NuxtButton>
        <NuxtButton
          :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
          color="neutral"
          variant="outline"
          @click="isDark = !isDark"
        />
        <NuxtChip
          size="lg"
          :show="notificationReadStatuses.unread > 0"
        >
          <NuxtPopover
            :content="{
              align: 'end',
              side: 'bottom',
              sideOffset: 16
            }"
          >
            <NuxtButton
              icon="i-lucide-bell"
              variant="outline"
              color="neutral"
            />
            <template #content>
              <div class="min-w-96">
                <div class="flex items-center justify-between p-3">
                  <h4 class="text-body-lg font-semibold">
                    Notifikasi
                  </h4>
                  <NuxtButton
                    v-if="notificationReadStatuses.unread > 0"
                    variant="subtle"
                    class="text-xs"
                    :loading="readAllStatus === 'pending'"
                    :disabled="readAllStatus === 'pending'"
                    @click="handleReadAllNotifications"
                  >
                    Mark as read
                  </NuxtButton>
                </div>
                <NuxtSeparator />
                <ul
                  v-if="status === 'pending'"
                  class="grid gap-2 p-3"
                >
                  <NuxtSkeleton class="h-4 w-full" />
                  <NuxtSkeleton class="h-4 w-[100px] mt-2" />
                </ul>
                <div v-else-if="status === 'success'">
                  <ul
                    v-if="notifications?.data && notifications.data.length > 0"
                    class="max-h-[500px] overflow-y-auto"
                  >
                    <li
                      v-for="notification of notifications?.data"
                      :key="notification.id"
                      :class="`${!notification.is_read ? 'hover:bg-elevated' : 'bg-elevated hover:bg-accented'} transition p-3`"
                      @click="() => handleClickNotification(notification.read_id, notification.is_read)"
                    >
                      <p class="text-body-sm">
                        {{ notification.message }}
                      </p>
                      <span class="text-xs text-neutral-500">
                        {{ dateTimeFormat({ date: notification.created_at }) }}
                      </span>
                    </li>
                  </ul>
                  <div
                    v-else
                    class="flex flex-col items-center justify-center p-5"
                  >
                    <p class="text-body-sm text-center">
                      No new notifications
                    </p>
                  </div>
                </div>
                <ul v-else-if="status === 'error'">
                  <li class="p-3">
                    <NuxtAlert
                      color="error"
                      variant="soft"
                      title="Failed to load notifications."
                    />
                  </li>
                </ul>
              </div>
            </template>
          </NuxtPopover>
        </NuxtChip>
        <div class="flex items-center gap-3">
          <img
            :src="user?.avatar_url ?? ''"
            :alt="`${user?.first_name} ${user?.last_name}`"
            class="w-10 h-10 rounded-full object-cover"
          >
          <div>
            <p class="text-body-sm font-semibold">
              {{ user?.first_name }} {{ user?.last_name }}
            </p>
            <p class="text-xs text-neutral-500">
              {{ user?.email }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
const { $useCases } = useNuxtApp()
const { user } = useUserSession()

onMounted(() => {
  execute()
})

// dark mode
const colorMode = useColorMode()
const isDark = computed({
  get: () => colorMode.value === 'dark',
  set: (value) => {
    colorMode.preference = value ? 'dark' : 'light'
  }
})

const {
  data: notifications,
  status,
  execute
} = await useAsyncData('notifications',
  () =>
    $useCases.notification.getNotifications.execute({}),
  {
    immediate: false
  }
)

const notificationReadStatuses = computed(() => {
  if (!notifications.value?.data) return { unread: 0, total: 0 }
  const unread = notifications.value.data.filter((n) => !n.is_read).length
  const total = notifications.value.data.length
  return { unread, total }
})

const {
  status: readAllStatus,
  execute: executeReadAll
} = await useAsyncData(
  () =>
    $useCases.notification.readAllNotifications.execute({}),
  {
    immediate: false
  }
)

const handleClickNotification = async (id: string, is_read: boolean) => {
  if (!id || is_read) return
  await $useCases.notification.readNotification.execute({
    payload: { id }
  })
  if (status.value === 'success')
    await refreshNuxtData('notifications')
}

const handleReadAllNotifications = async () => {
  await executeReadAll()
  if (readAllStatus.value === 'success')
    await refreshNuxtData('notifications')
}
</script>
