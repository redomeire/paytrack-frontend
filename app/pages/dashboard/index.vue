<script setup lang="ts">
const { clear } = useUserSession()
const router = useRouter()
const handleLogout = async () => {
  await clear()
  setTimeout(() => {
    router.replace('/auth/login')
  }, 1000)
}
</script>

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
