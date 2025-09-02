/**
 * @vitest-environment jsdom
 */
import { render } from "@testing-library/react";
import { describe, it, vi } from "vitest";

import { InjectorProviders } from "~/components";
import { makeData } from "~/utils";
import { UpdateRowExpanded } from ".";

describe("Components/Table/UpdateRowExpanded", () => {
  it(`must change Select components`, async () => {
    const { getByText } = render(
      <InjectorProviders>
        <UpdateRowExpanded
          onSave={() => vi.fn()}
          onCancel={() => vi.fn()}
          dataToEdit={makeData.person(1)[0]}
        />
      </InjectorProviders>
    );
  });
});
