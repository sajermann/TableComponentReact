/**
 * @vitest-environment jsdom
 */
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { DetailedHTMLProps, HTMLAttributes, useState } from "react";
import { describe, expect, it } from "vitest";
import { Modal } from ".";

type Props = {
  closeByBackdrop?: boolean;
  closeByEsc?: boolean;
  title?: string;
  closeButton?: boolean;
  expand?: { resetOnClose: boolean };
  contentClassName?: string;
};

function Mock({
  closeByBackdrop,
  closeByEsc,
  title,
  closeButton,
  expand,
  contentClassName,
}: Props) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpenModal((prev) => !prev)}
        data-testid="openModalButton"
      >
        Open
      </button>
      <Modal
        title={title}
        overlayProps={{
          "data-testid": "overlay",
        }}
        contentProps={
          {
            "data-testid": "modal",
            className: contentClassName,
          } as DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
        }
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        closeByBackdrop={closeByBackdrop}
        closeByEsc={closeByEsc}
        closeButton={closeButton}
        expand={expand}
      >
        <div>Is Open</div>
      </Modal>
    </>
  );
}

describe("Components/Modal", () => {
  it(`should open modal`, async () => {
    const { queryByTestId, getByTestId } = render(<Mock />);
    expect(queryByTestId("modal")).toBeNull();
    await fireEvent.click(getByTestId("openModalButton"));
    await waitFor(() => {
      expect(getByTestId("modal")).toBeInTheDocument();
    });
  });

  it(`should close modal on click in backdrop`, async () => {
    const { queryByTestId, getByTestId } = render(<Mock closeByBackdrop />);
    expect(queryByTestId("modal")).toBeNull();
    await fireEvent.click(getByTestId("openModalButton"));
    await waitFor(() => {
      expect(getByTestId("modal")).toBeInTheDocument();
    });

    await fireEvent.click(getByTestId("overlay"));
    await waitFor(() => {
      expect(queryByTestId("modal")).toBeNull();
    });
  });

  it(`should not close modal on click in backdrop`, async () => {
    const { queryByTestId, getByTestId } = render(<Mock />);
    expect(queryByTestId("modal")).toBeNull();
    await fireEvent.click(getByTestId("openModalButton"));
    await waitFor(() => {
      expect(getByTestId("modal")).toBeInTheDocument();
    });

    await fireEvent.click(getByTestId("overlay"));
    await waitFor(() => {
      expect(queryByTestId("modal")).not.toBeNull();
    });
  });

  it(`should close modal on esc key down`, async () => {
    const { queryByTestId, getByTestId } = render(<Mock closeByEsc />);
    expect(queryByTestId("modal")).toBeNull();
    await fireEvent.click(getByTestId("openModalButton"));
    await waitFor(() => {
      expect(getByTestId("modal")).toBeInTheDocument();
    });

    await fireEvent.keyDown(getByTestId("modal"), {
      key: "Escape",
      code: "Escape",
      keyCode: 27,
      charCode: 27,
    });
    await waitFor(() => {
      expect(queryByTestId("modal")).toBeNull();
    });
  });

  it(`should not close modal on esc key down`, async () => {
    const { queryByTestId, getByTestId } = render(<Mock title="Test" />);
    expect(queryByTestId("modal")).toBeNull();
    await fireEvent.click(getByTestId("openModalButton"));
    await waitFor(() => {
      expect(getByTestId("modal")).toBeInTheDocument();
    });

    await fireEvent.keyDown(getByTestId("modal"), {
      key: "Escape",
      code: "Escape",
      keyCode: 27,
      charCode: 27,
    });
    await waitFor(() => {
      expect(queryByTestId("modal")).not.toBeNull();
    });
  });

  it("should close modal when clicking closeButton", async () => {
    render(<Mock title="Close Button Test" closeButton />);
    fireEvent.click(screen.getByTestId("openModalButton"));

    await waitFor(() => {
      expect(screen.getByTestId("closeButtonModal")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId("closeButtonModal"));

    await waitFor(() => {
      expect(screen.queryByTestId("modal")).toBeNull();
    });
  });

  it("should toggle expand and reset expand on close", async () => {
    render(
      <Mock
        title="Expand Test"
        expand={{ resetOnClose: true }}
        closeButton
        contentClassName="custom-modal-class"
      />
    );

    fireEvent.click(screen.getByTestId("openModalButton"));

    await waitFor(() => {
      expect(screen.getByTestId("modal")).toBeInTheDocument();
    });

    const modal = screen.getByTestId("modal");
    const closeBtn = screen.getByTestId("closeButtonModal");
    const titleContainer = closeBtn.closest("h2") || modal.querySelector("h2") || modal;
    const dialogButtons = within(titleContainer as HTMLElement).getAllByRole("button");
    const expandButton = dialogButtons[0];

    fireEvent.click(expandButton);
    expect(modal.className).toContain("!w-full !h-full");

    fireEvent.click(expandButton);
    expect(modal.className).not.toContain("!w-full !h-full");

    fireEvent.click(closeBtn);

    await waitFor(() => {
      expect(screen.queryByTestId("modal")).toBeNull();
    });
  });
});
