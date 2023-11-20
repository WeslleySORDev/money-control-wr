import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { ChakraProvider } from "@chakra-ui/react";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import { TransactionsProvider } from "./hooks/useTransactions.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider resetCSS>
      <AuthContextProvider>
        <TransactionsProvider>
          <App />
        </TransactionsProvider>
      </AuthContextProvider>
    </ChakraProvider>
  </React.StrictMode>
);
