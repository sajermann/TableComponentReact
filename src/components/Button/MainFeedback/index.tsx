import { DetailedHTMLProps, HTMLAttributes } from "react";
import { showInDevelopment } from "~/packages/Table/utils";
import { TFeedbackProps } from "../types";

interface IMainFeedback
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  withFeedback?: TFeedbackProps;
}

export function MainFeedback({ withFeedback, ...rest }: IMainFeedback) {
  if (
    withFeedback?.loadingOptions.isLoading ||
    withFeedback?.successOptions?.success ||
    withFeedback?.failedOptions?.failed
  ) {
    return (
      <div
        {...showInDevelopment({ "data-content": "mainFeedback" })}
        {...rest}
      />
    );
  }
  return null;
}
