import type { FetchOptions } from "ofetch";
import { $fetch } from "ofetch";
import { AuthRepositoryImpl } from "~~/lib/data/repository/authRepositoryImpl";
import { AuthRemoteDataSourceImpl } from "~~/lib/data/datasource/remote";
// plugins/api.ts
export default defineNuxtPlugin((nuxtApp) => {
  const fetchOptions: FetchOptions = {
    baseURL: process.env.NUXT_PUBLIC_API_URL, // Replace with your base URL
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
    onResponseError({ response }) {
      const toast = useToast();
      toast.add({
        title: "Error Occurred",
        description: `${
          response._data.message || "API request failed"
        } (Status: ${response.status})`,
        color: "error",
      });
    },
  };
  const api = $fetch.create(fetchOptions);

  const authRemoteDataSource = new AuthRemoteDataSourceImpl(api);

  const repositories = {
    auth: new AuthRepositoryImpl(authRemoteDataSource),
  };

  return {
    provide: {
      repositories,
    },
  };
});
