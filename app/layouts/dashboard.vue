<template>
  <div>
    <AppSidebar />
    <div class="lg:ml-64">
      <AppNavbar />
      <main class="px-5 py-7 pt-28">
        <slot />
      </main>
    </div>
  </div>
</template>
