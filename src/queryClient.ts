import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 30,
      gcTime: 1000 * 60 * 15,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});
