<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
    // eslint-disable-next-line vue/require-default-prop
    error: Object as () => NuxtError
})
</script>


<template>
    <div>
        <h1>{{ props.error?.message }}</h1>
        <NuxtLink to="/">Go back home</NuxtLink>
    </div>
</template>