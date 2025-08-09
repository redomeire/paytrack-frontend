import type { UseFetchOptions } from "#app";

interface IUseApiFetchOptions extends UseFetchOptions<unknown> {
  url: string;
  method?: UseFetchOptions<unknown>["method"];
  headers?: Record<string, string>;
  body?: Record<string, string | number | boolean>;
}

export default function useApiFetch(options: IUseApiFetchOptions) {
  const config = useRuntimeConfig();
  const toast = useToast();

  return useFetch(config.public.apiBase + options.url, {
    onRequest({ options }) {
      options.headers.set("Content-Type", "application/json");
      options.headers.set("Accept", "application/json");
      options.headers.set(
        "Authorization",
        `Bearer ${useCookie("token").value}`
      );
    },
    onResponse({ response }) {
      if (!response.ok) {
        toast.add({
          title: "Error Occured",
          description: `API request failed with status ${response.status}`,
          color: "error",
        });
        throw new Error(`API request failed with status ${response.status}`);
      }
      toast.add({
        title: response._data.message || "Success",
        color: "success",
      });
    },
    ...options,
  });
}
