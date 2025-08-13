<template>
  <div class="dashboard">
    <ul class="grid grid-cols-4 gap-3">
      <li
        v-for="boxItem in boxItems"
        :key="boxItem.title"
        :class="containerClasses(boxItem.color)"
      >
        <h2 class="text-heading-6">
          {{ boxItem.title }}
        </h2>
        <p class="text-heading-4 font-semibold">
          {{ boxItem.value }}
        </p>
      </li>
    </ul>
    <div class="grid grid-cols-5 gap-5 mt-5">
      <div class="rounded-lg shadow-xl col-span-2 min-h-48" />
      <div class="rounded-lg shadow-xl col-span-3 min-h-48" />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})
const boxItems = [
  {
    title: 'Total belum dibayar',
    value: 'Rp. 1.000.000',
    icon: 'i-material-symbols-receipt-long-outline',
    color: 'bg-error-200'
  },
  {
    title: 'Tagihan mendatang',
    value: '3',
    icon: 'i-material-symbols-receipt-long-outline',
    color: 'bg-primary-200'
  },
  {
    title: 'Total tagihan',
    value: '6',
    icon: 'i-material-symbols-person-outline',
    color: 'bg-success-200'
  },
  {
    title: 'Terlambat bayar',
    value: '1',
    icon: 'i-material-symbols-payment-outline',
    color: 'bg-warning-200'
  }
]

const containerClasses = (color: string) => {
  return cn(
    'flex flex-col items-center justify-center',
    `rounded-lg p-4`,
    color
  )
}
</script>
