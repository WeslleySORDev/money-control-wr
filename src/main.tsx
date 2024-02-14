import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { AuthContextProvider } from "./context/AuthContext.tsx";
import { TransactionsProvider } from "./hooks/useTransactions.tsx";

import { ThemeProvider } from "@/components/theme-provider";
import "./styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthContextProvider>
        <TransactionsProvider>
          <App />
        </TransactionsProvider>
      </AuthContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);
