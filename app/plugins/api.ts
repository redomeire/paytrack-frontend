import type { FetchOptions } from "ofetch";

export default defineNuxtPlugin({
  name: "api",
  async setup(nuxtApp) {
    const config = useRuntimeConfig();
    const fetchOptions: FetchOptions = {
      baseURL: config.public.apiBase,
      async onRequest({ options }) {
        options.headers.set("Content-Type", "application/json");
        options.headers.set("Accept", "application/json");

        const appEvent = nuxtApp.ssrContext?.event;
        if (appEvent) {
          const session = await getUserSession(appEvent);
          if (session.token) {
            options.headers.set("Authorization", `Bearer ${session.token}`);
          }
        }
      },
      async onRequestError({ error }) {
        const toast = useToast();
        toast.add({
          title: "Request Error",
          description: error.message || "An error occurred during the request",
          color: "error",
        });
      },
      onResponseError({ response }) {
        const toast = useToast();
        toast.add({
          title: "Error Occurred",
          description: `${response._data.message || "API request failed"}`,
          color: "error",
        });
      },
    };
    const api = $fetch.create(fetchOptions);
    return {
      provide: {
        api,
      },
    };
  },
});
