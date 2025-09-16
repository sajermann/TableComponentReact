import React from "react";
import ReactDOM from "react-dom/client";
import { InjectorProviders } from "~/components/InjectorProviders";
import { RoutesConfig } from "~/components/RoutesConfig";

import "./index.css";
import { RouterProvider } from "@tanstack/react-router";
import { Layout } from "./components/Layout";
import { router } from "./hooks";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider
      router={router}
      defaultPendingMs={0}
      defaultPendingMinMs={0}
    />
  </React.StrictMode>
);

// ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
//   <RouterProvider
//     router={router}
//     defaultPendingMs={0}
//     defaultPendingMinMs={0}
//   />
// );
