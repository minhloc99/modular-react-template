
import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { Provider } from "jotai";
import App from "./App"
import { appStoreManager } from "./shared/sharedStates";

ReactDOM
  .createRoot(document.getElementById("root")!)
  .render(
    <React.StrictMode>
      <Provider
        store={appStoreManager}
      >
        <ChakraProvider value={defaultSystem}>
          <App />
        </ChakraProvider>
      </Provider>
    </React.StrictMode>
  );