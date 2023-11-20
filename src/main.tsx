import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { ChakraProvider } from "@chakra-ui/react";
import { AuthContextProvider } from "./context/AuthContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider resetCSS>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </ChakraProvider>
  </React.StrictMode>
);
