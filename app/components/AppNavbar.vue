<template>
  <header class="bg-white border-b border-b-accented items-center p-5 grid grid-cols-2 gap-10">
    <NuxtInput
      icon="i-lucide-search"
      size="xl"
      variant="ghost"
      placeholder="Search..."
    />
    <div class="flex items-center justify-end gap-5">
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
        :text="1"
        size="3xl"
      >
        <NuxtButton
          icon="i-lucide-bell"
          variant="outline"
          color="neutral"
        />
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
  </header>
</template>

<script lang="ts" setup>

</script>
