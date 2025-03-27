import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "./queryClient";
import { Provider as ChakraProvider } from "@/components/ui/provider.tsx";

import { Toaster } from "./components/ui/toaster";

import { UserContextProvider } from "./components/providers/UserProvider";
import { RootRouter } from "./navigation/RootRouter";

function App() {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <RootRouter />
          <ReactQueryDevtools />
          <Toaster />
        </UserContextProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
