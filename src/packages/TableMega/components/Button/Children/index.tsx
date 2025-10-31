import {
  DetailedHTMLProps,
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import { showInDevelopment } from "~/packages/Table/utils";
import { useWindowSize } from "../hooks";
import { TFeedbackProps } from "../types";
import { useChildren } from "./hooks";

interface IChildren
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  withFeedback?: TFeedbackProps;
}

export function Children({ withFeedback, ...rest }: IChildren) {
  const { ref, title } = useChildren({
    title: rest.title,
    children: rest.children,
  });

  if (!rest.children) {
    return null;
  }
  if (
    withFeedback?.loadingOptions.fullIcon &&
    withFeedback?.loadingOptions.isLoading
  ) {
    return null;
  }
  if (
    withFeedback?.successOptions?.fullIcon &&
    withFeedback?.successOptions.success
  ) {
    return null;
  }
  if (
    withFeedback?.failedOptions?.fullIcon &&
    withFeedback?.failedOptions.failed
  ) {
    return null;
  }
  return <div ref={ref} title={title} {...rest} />;
}
