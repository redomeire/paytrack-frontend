export default defineNuxtRouteMiddleware((to) => {
  const invoiceId = to.query.external_id

  if (!invoiceId) {
    return navigateTo('/')
  }
})
