import type { FetchOptions } from 'ofetch'

export default defineNuxtPlugin({
  name: 'api',
  async setup() {
    const config = useRuntimeConfig()
    const fetchOptions: FetchOptions = {
      baseURL: config.public.apiBase,
      async onRequest({ options }) {
        options.headers.set('Content-Type', 'application/json')
        options.headers.set('Accept', 'application/json')

        // get session if available
        const session = await $fetch('/api/auth/get-session', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        })

        if (session.token) {
          options.headers.set('Authorization', `Bearer ${session.token}`)
        }
      },
      async onRequestError({ error }) {
        const toast = useToast()
        toast.add({
          title: 'Request Error',
          description: error.message || 'An error occurred during the request',
          color: 'error'
        })
      },
      onResponse({ response }) {
        if (response.ok) {
          const toast = useToast()
          toast.add({
            title: 'Success',
            description: response._data.message || 'Request completed successfully',
            color: 'success'
          })
        }
      },
      onResponseError({ response }) {
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
