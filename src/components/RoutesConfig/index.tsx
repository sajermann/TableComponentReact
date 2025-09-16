import { Suspense } from "react";
// import { useLocation } from "react-router";

import { Outlet } from "@tanstack/react-router";
import { usePagesConfig } from "~/hooks";
import { Breadcrumbs } from "./Breadcumbs";
import { Sidebar } from "./Sidebar";

export function RoutesConfig() {
  usePagesConfig();

  return (
    <div className="w-full 2xl:max-w-[1330px] p-2 py-5 gap-5 flex my-0 mx-auto">
      <div className="w-full flex flex-col h-full gap-2 flex-1">
        {/* <Suspense
          //key={location.key}
          fallback={<IsLoading />}
        > */}
        <Breadcrumbs />
        <Outlet />
        {/* </Suspense> */}
      </div>
      <Sidebar />
    </div>
  );
}
