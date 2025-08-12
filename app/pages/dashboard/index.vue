<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <p>Welcome to your dashboard!</p>
    <p>This is a placeholder for your dashboard content.</p>
    <button @click="handleLogout">
      Logout
    </button>
  </div>
</template>

<script setup lang="ts">
// context data
const { $useCases } = useNuxtApp()
const { clear } = useUserSession()
const router = useRouter()

// api fetch and function
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
