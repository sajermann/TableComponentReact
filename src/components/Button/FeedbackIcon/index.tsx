import { CheckIcon, XIcon } from "lucide-react";
import { TFeedbackProps } from "../types";

interface IFeedbackIcon {
  withFeedback?: TFeedbackProps;
}

export function FeedbackIcon({ withFeedback }: IFeedbackIcon) {
  if (withFeedback?.loadingOptions.isLoading) {
    return null;
  }
  if (
    withFeedback?.successOptions?.success &&
    !withFeedback?.successOptions?.customIcon
  ) {
    return <CheckIcon />;
  }
  if (
    withFeedback?.successOptions?.success &&
    withFeedback?.successOptions?.customIcon
  ) {
    return withFeedback?.successOptions?.customIcon;
  }
  if (
    withFeedback?.failedOptions?.failed &&
    !withFeedback?.failedOptions?.customIcon
  ) {
    return <XIcon />;
  }
  if (
    withFeedback?.failedOptions?.failed &&
    withFeedback?.failedOptions?.customIcon
  ) {
    return withFeedback?.failedOptions?.customIcon;
  }

  return null;
}
