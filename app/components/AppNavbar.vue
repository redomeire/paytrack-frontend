<template>
  <header class="bg-white border-b border-b-accented items-center p-5 fixed top-0 right-0 lg:left-64 left-0 z-30">
    <div class="lg:grid lg:grid-cols-5 flex justify-between lg:gap-10 gap-2 relative">
      <div class="flex items-center lg:col-span-2">
        <AppDrawer />
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
                  variant="subtle"
                  class="text-xs"
                >
                  Mark as read
                </NuxtButton>
              </div>
              <NuxtSeparator />
              <ul>
                <li
                  v-for="notification of notifications"
                  :key="notification.time"
                  :class="`${!notification.is_read ? 'bg-neutral-100 hover:brightness-95' : 'hover:bg-neutral-100'} transition p-3`"
                >
                  <p class="text-body-sm">
                    {{ notification.text }}
                  </p>
                  <span class="text-xs text-neutral-500">
                    {{ notification.time }}
                  </span>
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
        <NuxtChip
          size="lg"
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
                    variant="subtle"
                    class="text-xs"
                  >
                    Mark as read
                  </NuxtButton>
                </div>
                <NuxtSeparator />
                <ul>
                  <li
                    v-for="notification of notifications"
                    :key="notification.time"
                    :class="`${!notification.is_read ? 'bg-neutral-100 hover:brightness-95' : 'hover:bg-neutral-100'} transition p-3`"
                  >
                    <p class="text-body-sm">
                      {{ notification.text }}
                    </p>
                    <span class="text-xs text-neutral-500">
                      {{ notification.time }}
                    </span>
                  </li>
                </ul>
              </div>
            </template>
          </NuxtPopover>
        </NuxtChip>
        <div class="flex items-center gap-3">
          <NuxtAvatar
            src="https://github.com/benjamincanac.png"
            size="xl"
          />
          <div class="text-right">
            <p class="text-body-sm font-semibold">
              Benjamin Canac
            </p>
            <p class="text-xs text-neutral-500">
              assistant manager
            </p>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { NuxtButton, NuxtSeparator } from '#components'

const notifications = [
  {
    text: 'Tagihan listrik jatuh tempo besok',
    time: '2 jam yang lalu',
    is_read: false
  },
  {
    text: 'Pembayaran tagihan air berhasil',
    time: '1 hari yang lalu',
    is_read: true
  },
  {
    text: 'Pembayaran tagihan internet berhasil',
    time: '3 hari yang lalu',
    is_read: true
  },
  {
    text: 'Tagihan listrik jatuh tempo besok',
    time: '2 jam yang lalu',
    is_read: false
  }
]
</script>
