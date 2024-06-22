import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import "bootstrap/dist/css/bootstrap.min.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { Auth0Provider } from "@auth0/auth0-react";
import { FilterProvider } from "./context/FilterContext";
import { environmentVar } from "./config/environmentVar";
import { Helmet, HelmetProvider } from "react-helmet-async";
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
    domain={environmentVar?.domain}
    clientId={environmentVar?.cliendid}
    authorizationParams={{
      redirect_uri: environmentVar?.redirecturl,
    }}
  >
    <QueryClientProvider client={queryClient}>
      <FilterProvider>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </FilterProvider>
    </QueryClientProvider>
  </Auth0Provider>
);

serviceWorkerRegistration.register();
