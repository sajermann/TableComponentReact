import { useLoaderData } from "@tanstack/react-router";
import { usePagesConfig } from "../usePagesConfig";

type TUseLoaderAndConfigProps = {
  from: string;
};

export function useLoaderAndConfig({ from }: TUseLoaderAndConfigProps) {
  const loaderData = useLoaderData({
    from,
  });
  usePagesConfig({
    breadcrumbs: loaderData?.breadcrumbs || [],
    pageTitle: loaderData?.pageTitle,
  });
}
