import { Slot } from "expo-router";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1
    },
  },
});

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient} >
      <Slot />
    </QueryClientProvider>
  );
}
