import { RouterProvider } from "@tanstack/react-router";
import React from "react";
import ReactDOM from "react-dom/client";
import { ErrorComponent } from "./components/ErrorComponent";
import { LoadingComponent } from "./components/LoadingComponent";
import { router } from "./config/routes";
import "./index.css";

// ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
//   <React.StrictMode>
//     <RouterProvider
//       router={router}
//       defaultPendingMs={0}
//       defaultPendingMinMs={0}
//       defaultErrorComponent={ErrorComponent}
//       defaultPendingComponent={LoadingComponent}
//     />
//   </React.StrictMode>
// );

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider
    router={router}
    defaultPendingMs={0}
    defaultPendingMinMs={0}
    defaultErrorComponent={ErrorComponent}
    defaultPendingComponent={LoadingComponent}
  />
);
