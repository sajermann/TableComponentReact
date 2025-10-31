import { render } from "@testing-library/react";
import { describe, it } from "vitest";

import { Children } from ".";

describe("components/Button/Children", () => {
  it("should render component", () => {
    render(
      <Children
        withFeedback={{ loadingOptions: { fullIcon: true, isLoading: true } }}
      >
        <div>Test</div>
      </Children>
    );
    render(
      <Children
        withFeedback={{
          loadingOptions: { fullIcon: true, isLoading: false },
          successOptions: { fullIcon: true, success: true },
        }}
      >
        <div>Test</div>
      </Children>
    );
    render(
      <Children
        withFeedback={{
          loadingOptions: { fullIcon: true, isLoading: false },
          failedOptions: { fullIcon: true, failed: true },
        }}
      >
        <div>Test</div>
      </Children>
    );
  });
});
