import type { FetchOptions } from 'ofetch'

export default defineNuxtPlugin({
  name: 'api',
  async setup() {
    const config = useRuntimeConfig()
    const fetchOptions: FetchOptions = {
      baseURL: config.public.apiBase,
      async onRequest({ options }) {
        options.headers.set('Accept', 'application/json')

        // get session if available
        const session = useUserSession()

        if (session.session.value?.token) {
          options.headers.set('Authorization', `Bearer ${session.session.value.token}`)
        }
      },
      async onRequestError({ error }) {
        if (import.meta.server) return
        const toast = useToast()
        toast.add({
          title: 'Request Error',
          description: error.message || 'An error occurred during the request',
          color: 'error'
        })
      },
      onResponseError({ response }) {
        if (import.meta.server) return
        const toast = useToast()
        const errorMessage = response._data?.message
        toast.add({
          title: 'Error Occurred',
          description: typeof errorMessage === 'object'
            ? Object.keys(errorMessage)
                .map((key) => `${key}: ${errorMessage[key]}`).join(', ')
            : errorMessage || 'An error occurred',
          color: 'error'
        })
      }
    }
    const api = $fetch.create(fetchOptions)
    return {
      provide: {
        api
      }
    }
  }
})
